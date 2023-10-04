import { useQuestion } from "../context/QuestionContext";
import Options from "./Options";

export default function Question() {
  const { questions, index } = useQuestion();
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
