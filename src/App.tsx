import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import Navbar from './components/shared/Navbar'
import ApplyPage from './pages/Apply'
import CardPage from './pages/Card'
import HomePage from './pages/Home'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import TestPage from './pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/signin" Component={SigninPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
