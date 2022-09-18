import { Routes, Route } from "react-router-dom"

import "./App.css"
import { GameContextProvider } from "./contexts/GameContext"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Add from "./routes/Add"
import Home from "./routes/Home"
import Update from "./routes/Update"

const App = () => {
  return (
    <GameContextProvider>
      <div className="App">
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add" element={<Add />} />
            <Route path=":id" element={<Update />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </GameContextProvider>
  )
}

export default App
