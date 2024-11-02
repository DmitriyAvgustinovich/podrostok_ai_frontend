export const getPsychologicalTestResultsString = ({
  updatedAnswers,
  psychologicalTestQuestions,
}) => {
  return psychologicalTestQuestions
    .map((question: Record<string, string>) => {
      const userAnswer = updatedAnswers[question.id] ? "Да" : "Нет";
      return `Вопрос ${question.id}: ${question.text} - Ответ: ${userAnswer}`;
    })
    .join("\n");
};
