import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useWorker from "useWorker";

const selectionSort = arr => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      const tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
    }
  }
  return arr;
};

const bubleSort = array => {
  let swapp;
  let n = array.length - 1;
  const sortedArray = [...array];
  do {
    swapp = false;
    for (let index = 0; index < n; index++) {
      if (sortedArray[index] > sortedArray[index + 1]) {
        const tmp = sortedArray[index];
        sortedArray[index] = sortedArray[index + 1];
        sortedArray[index + 1] = tmp;
        swapp = true;
      }
    }
    n--;
  } while (swapp);

  return sortedArray;
};

const numbers = [...Array(50000)].map(e => ~~(Math.random() * 1000000));

const initialStates = {
  bubleSort: false,
  bubleSortWorker: false,
  selectionSortWorker: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BUBLE_SORT_LOADING":
      return {
        ...state,
        bubleSort: action.loading
      };
    case "SET_BUBLE_SORT_WORKER_LOADING":
      return {
        ...state,
        bubleSortWorker: action.loading
      };
    case "SET_SELECTION_SORT_WORKER_LOADING":
      return {
        ...state,
        selectionSortWorker: action.loading
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialStates);

  React.useEffect(() => {
    let turn = 0;
    const infiniteLoop = setInterval(function () {
      const lgoo = document.querySelector(".App-logo");
      turn += 8;
      lgoo.style.transform = `rotate(${turn % 360}deg)`;
    }, 100);

    return infiniteLoop;
  }, []);

  const [bubleSortWorker, bSortStatus, bSortKill] = useWorker(bubleSort);
  const [selectionSortWorker, sSortStatus, sSortKill] = useWorker(
    selectionSort
  );

  const onSortClick = () => {
    dispatch({ type: "SET_BUBLE_SORT_LOADING", loading: true });
    const result = bubleSort(numbers);
    dispatch({ type: "SET_BUBLE_SORT_LOADING", loading: false });
    console.log("Buble Sort", result);
  };

  const onBubleSortWorkerClick = () => {
    dispatch({ type: "SET_BUBLE_SORT_WORKER_LOADING", loading: true });
    bubleSortWorker(numbers).then(result => {
      dispatch({ type: "SET_BUBLE_SORT_WORKER_LOADING", loading: false });
      console.log("Buble Sort useWorker()", result);
    });
  };

  const onSectionSortWorkerOldClick = () => {
    dispatch({ type: "SET_SELECTION_SORT_WORKER_LOADING", loading: true });
    selectionSortWorker(numbers).then(result => {
      dispatch({ type: "SET_SELECTION_SORT_WORKER_LOADING", loading: false });
      console.log("Selection Sort useWorker()", result);
    });
  };

  const killAllWorkers = () => {
    sSortKill();
    dispatch({ type: "SET_SELECTION_SORT_WORKER_LOADING", loading: false });
    bSortKill();
    dispatch({ type: "SET_BUBLE_SORT_WORKER_LOADING", loading: false });
  }
  return (
    <>
      <div className="App">
        <h1 className="App-Title">useWorker</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button
            type="button"
            disabled={state.bubleSort}
            className="App-button"
            onClick={onSortClick}
          >
            {state.bubleSort ? `Loading...` : `Buble Sort`}
          </button>
          <button
            type="button"
            disabled={state.bubleSortWorker}
            className="App-button"
            onClick={onBubleSortWorkerClick}
          >
            {state.bubleSortWorker ? `Loading...` : `Buble Sort useWorker()`}
          </button>
          <button
            type="button"
            disabled={state.selectionSortWorker}
            className="App-button"
            onClick={onSectionSortWorkerOldClick}
          >
            {state.selectionSortWorker
              ? `Loading...`
              : `Selection Sort useWorker()`}
          </button>
          <button
            type="button"
            disabled={!(state.selectionSortWorker || state.bubleSortWorker)}
            className="App-button"
            onClick={killAllWorkers}
          >
            Kill All Workers
          </button>
        </header>
        <span style={{ color: "white" }}>
          Open DevTools console to see the results.
        </span>
      </div>
    </>
  );
}

export default App;
