// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],

  // it can be: 'loading', 'error','ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
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
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.scrore,
      };
    case "finished":
      return "finished";
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ questions, status, index, answer, score }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
