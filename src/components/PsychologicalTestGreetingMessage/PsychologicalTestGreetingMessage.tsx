import styles from "./PsychologicalTestGreetingMessage.module.scss";

interface IPsychologicalTestGreetingMessageProps {
  setIsTestStarted: (isTestStarted: boolean) => void;
}

export const PsychologicalTestGreetingMessage = (
  props: IPsychologicalTestGreetingMessageProps
) => {
  const { setIsTestStarted } = props;

  const handleStartTest = () => setIsTestStarted(true);

  return (
    <div className={styles.PsychologicalTestGreetingMessageWrapper}>
      <p className={styles.PsychologicalTestGreetingMessageHeader}>
        👋 Привет!
      </p>

      <p className={styles.PsychologicalTestGreetingMessageText}>
        Ты собираешься пройти <b>Тест-опросник Айзенка</b>{" "}
        на&nbsp;тип&nbsp;личности. Этот тест поможет определить твою
        предрасположенность к экстраверсии или интроверсии, а&nbsp;также оценить
        уровень нейротизма и эмоциональной стабильности.
      </p>

      <p className={styles.PsychologicalTestGreetingMessageText}>
        Тест состоит из <b>57</b> вопросов, и на каждый из них можно ответить
        <b>"Да"</b> или <b>"Нет"</b>. Пожалуйста, отвечай честно,
        не&nbsp;раздумывая долго — первое, что приходит в голову, обычно самое
        точное.
      </p>

      <p className={styles.PsychologicalTestGreetingMessageTextHeader}>
        <b>Как это работает?</b>
        <br />
        Просто выбирай ответ <b>"Да"</b> или <b>"Нет"</b> на каждый вопрос. Все
        ответы анонимны и никуда не сохраняются без твоего согласия.
      </p>

      <p className={styles.PsychologicalTestGreetingMessageTextHeader}>
        <b>Что делать после завершения?</b>
        <br />
        После того как ты ответишь на все вопросы, ты сможешь узнать результаты
        в нашем Telegram-боте. Он поможет интерпретировать твои ответы и даст
        краткую характеристику личности.
      </p>

      <p className={styles.PsychologicalTestGreetingMessageText}>
        Когда будешь готов, просто нажми "Начать", и мы сразу перейдем к первому
        вопросу.
      </p>

      <div className={styles.PsychologicalTestGreetingMessageButtonContainer}>
        <button
          className={styles.PsychologicalTestGreetingMessageButton}
          onClick={handleStartTest}
        >
          Начать
        </button>
      </div>
    </div>
  );
};
