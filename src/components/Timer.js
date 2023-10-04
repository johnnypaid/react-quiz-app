import { useEffect } from "react";
import { useQuestion } from "../context/QuestionContext";

export default function Timer() {
  const { dispatch, secondsRemaining } = useQuestion();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
      console.log("tick");
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins}:{seconds}
    </div>
  );
}
