import { test, expect } from "@playwright/test";
import { guide } from "../src/lib/content";
import {
  guidedEpisodes,
  checkpoints,
  readings,
  milestones,
  comparisons,
  quizTopics,
} from "../src/lib/discovery-content";
import { parseActivity } from "../src/lib/storage";
import { highlightMatches, composeArgument } from "../src/lib/annotation";
import { relationships, getConnections } from "../src/lib/relationships";

test("guided evidence belongs to the selected point in the investigation", () => {
  expect(guidedEpisodes).toHaveLength(8);
  for (let index = 0; index < guidedEpisodes.length; index++) {
    const episode = guidedEpisodes[index];
    expect(episode.id).toBe(guide.episodes[index].id);
    expect(episode.guidedSummary.split(/\s+/).length).toBeGreaterThan(75);
    expect(episode.beliefs.length).toBeGreaterThan(20);
    expect(episode.audience.length).toBeGreaterThan(20);
    for (const id of episode.passageIds) {
      const passage = guide.passages.find((item) => item.id === id);
      expect(passage).toBeDefined();
      expect(
        guide.episodes.findIndex((item) => item.id === passage?.episodeId),
      ).toBeLessThanOrEqual(index);
    }
  }
  expect(checkpoints).toHaveLength(3);
  for (const checkpoint of checkpoints) {
    expect(checkpoint.explanations).toHaveLength(checkpoint.choices.length);
    expect(checkpoint.correctIndex).toBeLessThan(checkpoint.choices.length);
  }
  for (const reading of readings)
    expect(
      guide.passages.some((item) => item.id === reading.closeReading.passageId),
    ).toBe(true);
  for (const pair of comparisons) {
    expect(pair.passageIds).toHaveLength(2);
    for (const id of pair.passageIds)
      expect(guide.passages.some((item) => item.id === id)).toBe(true);
  }
  for (const milestone of milestones)
    expect(guide.sources.some((item) => item.id === milestone.sourceId)).toBe(
      true,
    );
  for (const question of guide.questions)
    expect(quizTopics.some((topic) => topic.questionId === question.id)).toBe(
      true,
    );
});

test("legacy saved writing survives additive migration and literal highlights are safe", () => {
  const migrated = parseActivity(
    JSON.stringify({
      bookmarks: ["shared-burden"],
      lastEpisode: "memories",
      reflections: {
        truth: {
          text: "My original response.",
          savedAt: "2026-11-11T00:00:00Z",
        },
      },
    }),
  );
  expect(migrated.ok).toBe(true);
  if (!migrated.ok) throw new Error(migrated.message);
  expect(migrated.value.reflections.truth.text).toBe("My original response.");
  expect(migrated.value.bookmarks).toEqual(["shared-burden"]);
  expect(migrated.value.annotations).toEqual({});
  expect(migrated.value.completedEpisodes).toEqual([]);
  expect(
    highlightMatches("a [claim] and <script>", "[claim]")
      .filter((part) => part.matched)
      .map((part) => part.text),
  ).toEqual(["[claim]"]);
  expect(
    highlightMatches("truth\nand knowledge", "truth and").filter(
      (part) => part.matched,
    )[0].text,
  ).toBe("truth\nand");
  expect(
    composeArgument("A claim.", ["Some evidence."], "An explanation."),
  ).toBe("A claim.\n\nSome evidence.\n\nAn explanation.");
  for (const relationship of relationships) {
    expect(
      guide.characters.some((character) => character.id === relationship.from),
    ).toBe(true);
    expect(
      guide.characters.some((character) => character.id === relationship.to),
    ).toBe(true);
  }
  expect(
    getConnections("oedipus", "family").some(
      (item) => item.kind === "biological",
    ),
  ).toBe(true);
});

test("guided steps, checkpoints, evidence boundary, and resume work", async ({
  page,
}) => {
  await page.goto("/story/");
  await expect(
    page.getByRole("heading", { name: "A City in Crisis", exact: true }),
  ).toBeVisible();
  await expect(page.locator("#study")).toHaveCount(0);
  await page.getByRole("button", { name: "Next episode", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "The Investigation Begins",
      exact: true,
    }),
  ).toBeVisible();
  const checkpoint = page.getByRole("region", { name: "Evidence checkpoint" });
  await checkpoint
    .getByRole("button", { name: "Consider this answer" })
    .click();
  await expect(checkpoint.getByRole("alert")).toContainText("Choose an option");
  await checkpoint.getByRole("radio").nth(1).check();
  await checkpoint
    .getByRole("button", { name: "Consider this answer" })
    .click();
  await expect(checkpoint.getByRole("status")).toContainText(
    "does not establish",
  );
  await page.getByRole("button", { name: "Next episode", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A Difficult Accusation", exact: true }),
  ).toBeVisible();
  await page
    .locator("summary")
    .filter({ hasText: "Read the evidence" })
    .first()
    .click();
  const preview = page
    .locator("details[open]")
    .filter({ hasText: "At this point in the investigation" });
  await expect(
    preview.getByText("At this point in the investigation", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("One reading", { exact: true })).toHaveCount(0);
  await preview
    .getByRole("button", { name: "Close evidence", exact: true })
    .click();
  await expect(
    page.locator("summary").filter({ hasText: "Read the evidence" }).first(),
  ).toBeFocused();
  await page
    .getByRole("button", { name: "Mark this episode as read", exact: true })
    .click();
  await page.goto("/");
  await page
    .getByRole("link", { name: "A Difficult Accusation", exact: true })
    .click();
  await expect(page).toHaveURL(/#investigation-accusation$/);
  await expect(
    page.getByRole("button", { name: "Marked as read", exact: true }),
  ).toBeVisible();
});

test("relationship selection and typed filters retain an equivalent text list", async ({
  page,
}) => {
  await page.goto("/characters/");
  const network = page.getByRole("group", {
    name: "Choose a character in the relationship network",
  });
  await network
    .getByRole("button", { name: "Select Jocasta", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Connected to Jocasta", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Family", exact: true }).click();
  await expect(
    page
      .getByRole("heading", { name: "Connected to Jocasta", exact: true })
      .locator(".."),
  ).toContainText("Biological");
  await page.setViewportSize({ width: 320, height: 844 });
  await expect(
    network.getByRole("button", { name: "Select Jocasta", exact: true }),
  ).toBeVisible();
});

test("passages compare two entries, highlight safely, and retain saved notes", async ({
  page,
}) => {
  await page.goto("/passages/");
  await page.getByLabel("Suggested comparison").selectOption({ index: 1 });
  await expect(page.locator("#compare-passages article")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: /^Compare / }).first(),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Clear comparison" }).click();
  await page.getByLabel("Search the text").fill("burden");
  await expect(page.locator("#shared-burden mark").first()).toContainText(
    /burden/i,
  );
  await page
    .getByRole("button", { name: "Bookmark The burden of a city", exact: true })
    .click();
  await page.getByLabel("Saved only").check();
  await page
    .getByLabel("Your evidence note")
    .fill("Public duty starts the inquiry.");
  await page
    .getByRole("button", { name: "Save evidence note", exact: true })
    .click();
  await page.reload();
  await page.getByLabel("Saved only").check();
  await expect(page.getByLabel("Your evidence note")).toHaveValue(
    "Public duty starts the inquiry.",
  );
});

test("argument scaffolding assembles attributed evidence without overwriting saved reflections", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "oedipus-guide:activity:v1",
      JSON.stringify({
        bookmarks: [],
        lastEpisode: null,
        reflections: {
          truth: {
            text: "An existing response.",
            savedAt: "2026-11-11T00:00:00Z",
          },
        },
      }),
    ),
  );
  await page.goto("/activities/#argument-builder");
  await page
    .getByLabel("Your claim", { exact: true })
    .fill("Oedipus begins with a duty to the city.");
  await page.locator("#argument-builder input[type=checkbox]").first().check();
  await page
    .getByLabel("Explain the connection", { exact: true })
    .fill("The word burden gives public suffering a personal weight.");
  await page
    .getByRole("button", { name: "Preview assembled response" })
    .click();
  const assembled = page
    .getByRole("heading", { name: "Your assembled response" })
    .locator("..");
  await expect(assembled).toContainText("F. Storr translation");
  await expect(assembled).toContainText("The word burden");
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("oedipus-guide:activity:v1") || "{}")
          .reflections.truth.text,
    ),
  ).toBe("An existing response.");
});

for (const questionId of ["q-oracle", "q-reversal", "q-irony"]) {
  test(`quiz recommendations reach the ${questionId} explanation`, async ({
    page,
  }) => {
    await page.goto("/activities/#quiz");
    for (const [index, question] of guide.questions.entries()) {
      const answer =
        question.id === questionId
          ? (question.correctIndex + 1) % question.choices.length
          : question.correctIndex;
      await page.locator("#quiz input[type=radio]").nth(answer).check();
      await page
        .getByRole("button", { name: "Check answer", exact: true })
        .click();
      await page
        .getByRole("button", {
          name:
            index === guide.questions.length - 1
              ? "See results"
              : "Next question",
          exact: true,
        })
        .click();
    }
    await expect(
      page.getByRole("heading", { name: "You scored 9 out of 10." }),
    ).toBeVisible();
    const recommendations = page
      .getByRole("heading", { name: "Return to these ideas." })
      .locator("..");
    const topic = quizTopics.find((item) => item.questionId === questionId);
    if (!topic) throw new Error(`Missing recommendation for ${questionId}`);
    await expect(recommendations.getByRole("link")).toHaveCount(1);
    await expect(
      recommendations.getByRole("link", { name: topic.label }),
    ).toHaveAttribute("href", topic.href);
    await recommendations.getByRole("link", { name: topic.label }).click();
    const target = page.locator(`#${topic.href.split("#")[1]}`);
    await expect(target).toHaveCount(1);
    await expect(target).toBeInViewport();
    if (questionId === "q-reversal")
      await expect(target.getByRole("heading")).toHaveText(/Reversal/);
    if (questionId === "q-irony")
      await expect(target.getByRole("heading")).toHaveText("Dramatic irony");
  });
}

test("guided knowledge precedes reflection and continuation on stacked layouts", async ({
  page,
}) => {
  await page.goto("/story/#investigation-accusation");
  await expect(
    page.getByRole("heading", { name: "A Difficult Accusation", exact: true }),
  ).toBeVisible();
  const knowledge = page.getByRole("complementary", {
    name: "Knowledge at this episode",
  });
  const conclusion = page.getByRole("region", {
    name: "Consider and continue",
  });
  for (const width of [1024, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const gap = await page.evaluate(() => {
      const knowledgeElement = document.querySelector(
        '[aria-label="Knowledge at this episode"]',
      );
      const conclusionElement = document.querySelector(
        '[aria-label="Consider and continue"]',
      );
      if (!knowledgeElement || !conclusionElement)
        throw new Error("The episode reading regions must be rendered");
      return (
        conclusionElement.getBoundingClientRect().top -
        knowledgeElement.getBoundingClientRect().bottom
      );
    });
    expect(gap).toBeGreaterThanOrEqual(0);
    await expect(
      conclusion.getByRole("region", { name: "Evidence checkpoint" }),
    ).toBeVisible();
    await knowledge.locator("summary").focus();
    await page.keyboard.press("Tab");
    await expect(conclusion.getByRole("radio").first()).toBeFocused();
  }
});
