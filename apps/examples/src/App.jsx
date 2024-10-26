import React from 'react'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'

import CsvPage from './pages/Csv'
import ExternalScriptsPage from './pages/ExternalScripts'
import SortingPage from './pages/Sorting'
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
    <ToastProvider>
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
          <Routes>
            <Route path="/sorting" element={<SortingPage />} />
            <Route path="/csv" element={<CsvPage />} />
            <Route path="/external" element={<ExternalScriptsPage />} />
            <Route path="/transferable" element={<TransferablePage />} />
          </Routes>
        </div>
      </Router>
    </ToastProvider>
  )
}
