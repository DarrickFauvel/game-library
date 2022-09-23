import { Routes, Route } from 'react-router-dom'

// import "./App.css"
import { GameContextProvider } from './contexts/GameContext'
import Footer from './components/Footer'
import Header from './components/Header'
import Add from './routes/Add'
import Home from './routes/Home'
import Update from './routes/Update'
import NavTop from './components/NavTop'
import SearchBGG from './routes/SearchBGG'
import View from './routes/View'

const App = () => {
  return (
    <GameContextProvider>
      <div className='pancake-stack'>
        <NavTop />
        <Header />

        <main className='main container border-bottom'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='add' element={<Add />} />
            <Route path='view/:bggId' element={<View />} />
            <Route path='search-bgg' element={<SearchBGG />} />
            <Route path=':id' element={<Update />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </GameContextProvider>
  )
}

export default App
