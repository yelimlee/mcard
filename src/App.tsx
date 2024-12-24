import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CardPage from './pages/Card'
import HomePage from './pages/Home'
import TestPage from './pages/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/test" Component={TestPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
