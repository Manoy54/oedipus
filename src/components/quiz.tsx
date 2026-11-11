"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowCounterClockwise,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react";
import { questions } from "@/lib/content";
import { scoreQuiz } from "@/lib/activities";
import s from "./activities.module.css";
import { quizTopics } from "@/lib/discovery-content";
export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const question = questions[current];
  const submitted = answers.length > current;
  const missedTopics = quizTopics.filter((topic) => {
    const index = questions.findIndex((item) => item.id === topic.questionId);
    return index >= 0 && answers[index] !== questions[index].correctIndex;
  });
  function focusQuestion() {
    requestAnimationFrame(() => heading.current?.focus());
  }
  function retry() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setError("");
    setFinished(false);
    focusQuestion();
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitted) return;
    if (selected === null) {
      setError("Choose an answer before checking it.");
      return;
    }
    setAnswers([...answers, selected]);
    setError("");
  }
  return (
    <section id="quiz" className={s.quiz} aria-labelledby="quiz-heading">
      <h2 id="quiz-heading">Check your understanding.</h2>
      <p className="small muted">
        Practice only. Answers stay in this tab; reloading starts a new attempt.
      </p>
      {finished ? (
        <div>
          <h3 ref={heading} tabIndex={-1}>
            You scored {scoreQuiz(answers, questions)} out of {questions.length}
            .
          </h3>
          <p>
            Review the reasoning below. A score is a starting point for
            returning to the text.
          </p>
          <button className="button" onClick={retry}>
            <ArrowCounterClockwise size={20} />
            Retry quiz
          </button>
          <section className={s.recommendations}>
            <h3>
              {missedTopics.length
                ? "Return to these ideas."
                : "Take your reading further."}
            </h3>
            {missedTopics.length ? (
              <ul>
                {missedTopics.map((topic) => (
                  <li key={topic.questionId}>
                    <strong>{topic.topic}</strong>
                    <Link href={topic.href}>{topic.label}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                Compare two passages and explain how their speakers’ knowledge
                differs.{" "}
                <Link href="/passages/#compare-passages">
                  Open evidence comparison
                </Link>
                .
              </p>
            )}
            <p className="small muted">
              Suggestions follow the questions in this attempt. They are reading
              prompts, not a submitted grade.
            </p>
          </section>
          <div className={s.review}>
            {questions.map((item, index) => (
              <details key={item.id}>
                <summary>
                  {index + 1}. {item.prompt}
                  <span>
                    {answers[index] === item.correctIndex
                      ? "Correct"
                      : "Review"}
                  </span>
                </summary>
                <p>Your answer: {item.choices[answers[index]]}</p>
                <p>
                  <strong>Supported answer:</strong>{" "}
                  {item.choices[item.correctIndex]}
                </p>
                <p>{item.explanation}</p>
                <Link href={`/passages/#${item.passageId}`}>
                  Read the evidence
                </Link>
              </details>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className={s.progressLabel}>
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>{question.category}</span>
          </div>
          <progress
            value={current + (submitted ? 1 : 0)}
            max={questions.length}
            aria-label="Quiz progress"
          />
          <form onSubmit={submit}>
            <fieldset disabled={submitted}>
              <legend>
                <h3 ref={heading} tabIndex={-1}>
                  {question.prompt}
                </h3>
              </legend>
              <div className={s.choices}>
                {question.choices.map((choice, index) => (
                  <label key={choice} className={s.choice}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={selected === index}
                      onChange={() => {
                        setSelected(index);
                        setError("");
                      }}
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {error && (
              <p className="status" role="alert">
                {error}
              </p>
            )}
            {!submitted && (
              <button className="button" type="submit">
                Check answer <ArrowRight size={19} />
              </button>
            )}
          </form>
          {submitted && (
            <div className={s.feedback} role="status">
              <h4>
                {selected === question.correctIndex ? (
                  <>
                    <CheckCircle size={24} />
                    Correct — here is why.
                  </>
                ) : (
                  <>
                    <XCircle size={24} />
                    Look at the evidence.
                  </>
                )}
              </h4>
              <p>
                <strong>{question.choices[question.correctIndex]}</strong>
              </p>
              <p>{question.explanation}</p>
              <Link href={`/passages/#${question.passageId}`}>
                Read the supporting passage
              </Link>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    if (current === questions.length - 1) setFinished(true);
                    else setCurrent(current + 1);
                    setSelected(null);
                    focusQuestion();
                  }}
                >
                  {current === questions.length - 1
                    ? "See results"
                    : "Next question"}
                  <ArrowRight size={19} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
