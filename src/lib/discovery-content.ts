import data from "@/content/discovery.json";

export const discovery = data;
export const guidedEpisodes = discovery.episodes;
export const {
  checkpoints,
  readings,
  additionalPassages,
  comparisons,
  milestones,
  quizTopics,
} = discovery;

export type GuidedEpisode = (typeof guidedEpisodes)[number];
export type EvidenceCheckpoint = (typeof checkpoints)[number];
export type ThemeReading = (typeof readings)[number];
export type EvidenceComparison = (typeof comparisons)[number];
export type ContextMilestone = (typeof milestones)[number];
export type QuizTopic = (typeof quizTopics)[number];

export function getGuidedEpisode(id: string) {
  return guidedEpisodes.find((episode) => episode.id === id);
}
