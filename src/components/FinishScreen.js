import ResetButton from "./ResetButton";

export default function FinishScreen({ score, maxScore, dispatch }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="result">
      <p>
        You scored <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percentage)} %)
      </p>
      <ResetButton dispatch={dispatch} />
    </div>
  );
}
