import { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './view.module.css'

import { GameContext } from '../contexts/GameContext'
import htmlEntities from '../utilities/htmlEntities'

const BGG_API_URL =
  'http://192.168.0.142:8080/https://boardgamegeek.com/xmlapi2/thing?id='

const View = () => {
  const { bggId } = useParams()

  const { isLoading, setIsLoading, thing, setThing } = useContext(GameContext)

  useEffect(() => {
    const fetchFromBGG = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(BGG_API_URL + htmlEntities(bggId))
        const xmlString = await response.text()
        const xmlDoc = new DOMParser().parseFromString(xmlString, 'text/xml')

        const getDomData = (domData, selector, attribute = null) => {
          if (!domData || !selector) {
            console.log('Dom or selector not specified')
            return
          }

          if (attribute) {
            return domData.querySelector(selector).getAttribute(attribute)
          } else {
            return domData.querySelector(selector).textContent
          }
        }

        const domElementsToGet = [
          {
            selector: 'item',
            attribute: 'id'
          },
          {
            selector: 'name',
            attribute: 'value'
          },
          {
            selector: 'thumbnail'
          },
          {
            selector: 'image'
          },
          {
            selector: 'yearpublished',
            attribute: 'value'
          },
          {
            selector: 'description'
          }
        ]

        domElementsToGet.forEach((element) => {
          const data = getDomData(xmlDoc, element.selector, element.attribute)

          setThing((prevThing) => ({
            ...prevThing,
            [element.selector]: data
          }))
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFromBGG()
  }, [])

  return (
    <>
      <h2>Viewing</h2>
      {isLoading && <p>Loading...</p>}
      <div className={styles.info}>
        <div className={styles.split}>
          <p>item: {thing.item}</p>
          <p>name: {thing.name}</p>
          <p>yearpublished: {thing.yearpublished}</p>
        </div>
        <div className={styles.split}>
          <Link className={styles.link} to={'/add'}>
            + Add this game
          </Link>
        </div>
      </div>
      <img className='image' src={thing.image} alt={thing.name} />
    </>
  )
}

export default View
