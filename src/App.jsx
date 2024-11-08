import Home from './components/Home'
import Details from './components/Details'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'



function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
