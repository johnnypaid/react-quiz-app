export default function FinishScreen({ score, maxScore }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="result">
      <p>
        You scored <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percentage)} %)
      </p>
    </div>
  );
}
