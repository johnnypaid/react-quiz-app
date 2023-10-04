import { useQuestion } from "../context/QuestionContext";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuestion();

  return (
    <div className="start">
      <h1>welcome to The React Quiz</h1>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "active", payload: null })}
      >
        Let's start
      </button>
    </div>
  );
}
