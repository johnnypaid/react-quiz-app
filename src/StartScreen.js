export default function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h1>welcome to The React Quiz</h1>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
}
