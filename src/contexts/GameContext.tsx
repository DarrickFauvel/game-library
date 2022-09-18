import { createContext, useContext, useState } from "react"

const GameContext = createContext()

const GameContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState("")
  const [items, setItems] = useState([])

  return (
    <GameContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchError,
        setFetchError,
        items,
        setItems,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}

export { GameContextProvider, GameContext }
