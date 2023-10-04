import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  secondsRemaining: null,
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
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return { ...state, status: "finished" };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, score, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxScore = questions.reduce(
    (prev, current) => prev + current.points,
    0
  );

  useEffect(() => {
    async function getQuestions() {
      try {
        const questions = await fetch("http://localhost:8000/questions");
        const result = await questions.json();

        console.log(result);
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
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        score,
        secondsRemaining,
        numQuestions,
        maxScore,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);

  if (context === undefined)
    throw new Error("questionContext was used outside the Question provider");

  return context;
}

export { QuestionProvider, useQuestion };
