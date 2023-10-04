import { useQuestion } from "../context/QuestionContext";

export default function Progress() {
  const { index, numQuestions, score, maxScore, answer } = useQuestion();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        <strong>
          {score} / {maxScore}
        </strong>
      </p>
    </div>
  );
}
