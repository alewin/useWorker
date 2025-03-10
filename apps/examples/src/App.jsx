import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import CsvPage from './pages/Csv/index.jsx'
import ExternalScriptsPage from './pages/ExternalScripts/index.jsx'
import SortingPage from './pages/Sorting/index.jsx'
import TransferablePage from './pages/Transferable'
import logo from './react.png'
import './style.css'

let turn = 0
function infiniteLoop() {
  const lgoo = document.querySelector('.App-logo')
  turn += 8
  lgoo.style.transform = `rotate(${turn % 360}deg)`
}

export default function App() {
  React.useEffect(() => {
    const loopInterval = setInterval(infiniteLoop, 100)
    return () => clearInterval(loopInterval)
  }, [])

  return (
    <>
      <Router>
        <div className="App">
          <h1 className="App-Title">useWorker</h1>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ul>
              <li>
                <Link style={{ color: 'white' }} to="/sorting">
                  Sorting Demo
                </Link>
              </li>
              <li>
                <Link style={{ color: 'white' }} to="/csv">
                  Csv Demo
                </Link>
              </li>
              <li>
                <Link style={{ color: 'white' }} to="/external">
                  External Scripts Demo
                </Link>
              </li>
              <li>
                <Link style={{ color: 'white' }} to="/transferable">
                  Transferable Demo
                </Link>
              </li>
            </ul>
          </header>
          <hr />
        </div>
        <div>
          <Switch>
            <Route path="/sorting">
              <SortingPage />
            </Route>
            <Route path="/csv">
              <CsvPage />
            </Route>
            <Route path="/external">
              <ExternalScriptsPage />
            </Route>
            <Route path="/transferable">
              <TransferablePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <Toaster />
    </>
  )
}
