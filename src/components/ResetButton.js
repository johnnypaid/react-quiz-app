export default function ResetButton({ dispatch }) {
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        {" "}
        Restart Quiz
      </button>
    </div>
  );
}
