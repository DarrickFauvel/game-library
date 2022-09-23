import { createContext, useContext, useState } from 'react'

const GameContext = createContext()

const GameContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [formError, setFormError] = useState('')
  const [things, setThings] = useState([])
  const [thing, setThing] = useState({})

  return (
    <GameContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchError,
        setFetchError,
        formError,
        setFormError,
        things,
        setThings,
        thing,
        setThing
      }}>
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContextProvider, GameContext }
