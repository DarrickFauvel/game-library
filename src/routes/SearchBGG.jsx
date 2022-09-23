import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { GameContext } from '../contexts/GameContext'
import htmlEntities from '../utilities/htmlEntities'

import styles from './search.module.css'

const BGG_API_URL =
  'http://192.168.0.142:8080/https://boardgamegeek.com/xmlapi2/search?query='

const SearchBGG = () => {
  const { isLoading, setIsLoading } = useContext(GameContext)
  const [formError, setFormError] = useState('')
  const [query, setQuery] = useState('')
  const [things, setThings] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!query) {
      setFormError('Please enter a search query')
      return
    }

    const fetchFromBGG = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(BGG_API_URL + htmlEntities(query))
        const xmlString = await response.text()
        const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml')
        const thingsHtmlCollection = xmlDoc.querySelectorAll('item')
        const thingsArray = [...thingsHtmlCollection]
        setThings(thingsArray)
        setFormError('')
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFromBGG()
  }

  return (
    <>
      <h2>Search BGG</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='search-box'>
          <input
            type='text'
            value={query}
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            className='form-control'
          />
          <button className='btn btn-primary'>Go</button>
        </div>
        {formError && <p className='error'>{formError}</p>}
        {isLoading && <p>Loading...</p>}

        <ul className={styles.list}>
          {things.map((thing, index) => {
            const bggId = thing.getAttribute('id')
            const thingName = thing
              .querySelector("name[type='primary']")
              ?.getAttribute('value')
            const yearPublished = thing
              .querySelector('yearpublished')
              ?.getAttribute('value')

            return (
              <li className={styles.item} key={index}>
                <Link className={styles.link} to={'/view/' + bggId} key={index}>
                  <div className={styles.name} title='primary name'>
                    {thingName}
                  </div>
                </Link>
                <div className={styles.year} title='year published'>
                  {yearPublished}
                </div>
              </li>
            )
          })}
        </ul>
      </form>
    </>
  )
}

export default SearchBGG
