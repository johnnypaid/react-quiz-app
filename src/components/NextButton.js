import { useQuestion } from "../context/QuestionContext";

export default function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuestion();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );

  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finished
        </button>
      </div>
    );
}
