import { useContext, useEffect } from 'react'
import ThingDetail from '../components/ThingDetail'
import { supabase } from '../config/supabaseClient'
import { GameContext } from '../contexts/GameContext'

const Home = () => {
  const {
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    things,
    setThings
  } = useContext(GameContext)

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('games')
        .select()
        .order('created_at', { ascending: false })

      if (error) {
        setFetchError('Cannot fetch game data')
        setThings([])
      }
      if (data) {
        setIsLoading(false)
        setThings(data)
        setFetchError('')
        localStorage.setItem('things', JSON.stringify(data))
      }
    }

    if (localStorage.getItem('things')) {
      const thingsString = localStorage.getItem('things')
      const thingsArray = JSON.parse(thingsString)
      setThings(thingsArray)
    } else {
      fetchGames()
    }
  }, [])

  return (
    <>
      <div className='things'>
        <div className='things-grid'>
          {isLoading && <h2>Loading...</h2>}
          {things.map((thing) => (
            <ThingDetail thing={thing} key={thing.id} />
          ))}
        </div>
      </div>
      {fetchError && <p className='error'>{fetchError}</p>}
    </>
  )
}

export default Home
