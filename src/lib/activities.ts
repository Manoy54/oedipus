export function scoreQuiz(
  answers: number[],
  questions: { correctIndex: number }[],
): number {
  return questions.reduce(
    (total, question, index) =>
      total + Number(answers[index] === question.correctIndex),
    0,
  );
}
export function moveItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (
    index < 0 ||
    index >= items.length ||
    target < 0 ||
    target >= items.length
  )
    return items;
  const result = [...items];
  [result[index], result[target]] = [result[target], result[index]];
  return result;
}
