import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sorting from "./pages/Sorting";
import logo from "./react.png";
import "./style.css";

let turn = 0;
function infiniteLoop() {
  const lgoo = document.querySelector(".App-logo");
  turn += 8;
  lgoo.style.transform = `rotate(${turn % 360}deg)`;
}

export default function App() {
  React.useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100);
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <Router>
      <div className="App">
        <h1 className="App-Title">useWorker</h1>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link style={{ color: "white" }} to="/sorting">
                Sorting Demo
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/csv">
                Csv Demo
              </Link>
            </li>
          </ul>
        </header>
        <hr />
      </div>
      <div>
        <Switch>
          <Route path="/sorting">
            <Sorting />
          </Route>
          <Route path="/csv">
            <Sorting />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
