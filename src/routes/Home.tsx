import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ItemDetail from "../components/ItemDetail"
import { supabase } from "../config/supabaseClient"
import Data from "../interfaces/Data"
import { GameContext } from "../contexts/GameContext"

interface DataProps {
  data: Data[]
}

interface Item {
  id: number
}

const Home = () => {
  const {
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    items,
    setItems,
  } = useContext(GameContext)

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("games")
        .select()
        .order("created_at", { ascending: false })

      if (error) {
        setFetchError("Cannot fetch game data")
        setItems([])
      }
      if (data) {
        setIsLoading(false)
        setItems(data)
        setFetchError("")
      }
    }

    fetchGames()
  }, [])

  return (
    <div>
      <div className="items">
        <div className="items-grid">
          {isLoading && <h2>Loading...</h2>}
          {items.map((item: Item) => (
            <ItemDetail itemObj={item} key={item.id} />
          ))}
        </div>
      </div>
      {fetchError && <p className="error">{fetchError}</p>}
    </div>
  )
}

export default Home
