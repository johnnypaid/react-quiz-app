// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  // it can be: 'loading', 'error','ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "loading":
      return "loading";
    case "dataFailed":
      return { ...state, status: "error" };
    case "ready":
      return "ready";
    case "active":
      return "active";
    case "finished":
      return "finished";
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    async function getQuestions() {
      try {
        // throw new Error("error ka boy dk");
        const questions = await fetch("http://localhost:8000/questions");
        const result = await questions.json();

        result
          ? dispatch({ type: "dataReceived", payload: await result })
          : dispatch({ type: "dataFailed" });
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataFailed", payload: error.message });
      }
    }

    getQuestions();
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Main>
    </div>
  );
}

export default App;
