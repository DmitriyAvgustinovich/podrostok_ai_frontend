import React from "react";
import axios from "axios";
import { psychologicalTestQuestions } from "constants/psychological-test-questions";
import { getPsychologicalTestResultsString } from "utils";
import styles from "./PsychologicalTest.module.scss";
import { PsychologicalTestGreetingMessage } from "components/PsychologicalTestGreetingMessage/PsychologicalTestGreetingMessage";
import { tg } from "constants/tg-api";

export const PsychologicalTest = () => {
  const [isTestCompleted, setIsTestCompleted] = React.useState(false);
  const [isTestStarted, setIsTestStarted] = React.useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  const totalQuestions = psychologicalTestQuestions.length;
  const currentQuestion = psychologicalTestQuestions[currentQuestionIndex];

  const handleAnswer = (answer: boolean) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers, [currentQuestion.id]: answer };

      if (currentQuestionIndex === totalQuestions - 1) {
        setIsTestCompleted(true);
        sendResultsToBackend(updatedAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      return updatedAnswers;
    });
  };

  const sendResultsToBackend = async (
    updatedAnswers: Record<number, boolean>
  ) => {
    const resultsString = getPsychologicalTestResultsString({
      updatedAnswers,
      psychologicalTestQuestions,
    });

    try {
      await axios.post(
        "http://localhost:3000/api/controllers/get-psychological-test-result",
        {
          str: resultsString,
        }
      );
      alert("Результаты успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке результатов:", error);
      alert("Не удалось отправить результаты. Пожалуйста, попробуйте позже.");
    }
  };

  const handleCloseApp = () => {
    tg.WebApp.close();
  };

  return (
    <div className={styles.PsychologicalTestWrapper}>
      {!isTestStarted ? (
        <PsychologicalTestGreetingMessage setIsTestStarted={setIsTestStarted} />
      ) : isTestCompleted ? (
        <>
          <p className={styles.PsychologicalTestQuestionComplete}>
            Тест завершен. Перейдите в наш Telegram-бот, чтобы посмотреть
            результаты.
          </p>

          <div className={styles.PsychologicalTestCompleteButtonContainer}>
            <button
              className={styles.PsychologicalTestCompleteButton}
              onClick={handleCloseApp}
            >
              Перейти
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className={styles.PsychologicalTestQuestionCounter}>
            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
          </p>

          <p className={styles.PsychologicalTestQuestion}>
            {currentQuestion.text}
          </p>

          <div className={styles.PsychologicalTestAnswerButtonsWrapper}>
            <label
              className={`${styles.PsychologicalTestAnswerButton} ${styles.PsychologicalTestAnswerYes}`}
              onClick={() => handleAnswer(true)}
            >
              Да
            </label>

            <input
              type="checkbox"
              checked={answers[currentQuestion.id] === true}
              onChange={() => handleAnswer(true)}
              style={{ display: "none" }}
            />

            <label
              className={`${styles.PsychologicalTestAnswerButton} ${styles.PsychologicalTestAnswerNo}`}
              onClick={() => handleAnswer(false)}
            >
              Нет
            </label>

            <input
              type="checkbox"
              checked={answers[currentQuestion.id] === false}
              onChange={() => handleAnswer(false)}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};