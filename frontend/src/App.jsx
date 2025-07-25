import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import AuthGuard from "./components/routeGuard.jsx";
import {Routes, Route} from "react-router-dom";

import './App.css'

function App() {
  return (
      <Routes>
          <Route path="/" element={
              <AuthGuard>
                <IndexPage />
              </AuthGuard>
          } />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
  )
}

export default App
