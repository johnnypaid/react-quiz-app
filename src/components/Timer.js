import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
      console.log("tick");
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">{secondsRemaining}</div>;
}
