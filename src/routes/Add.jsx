import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabaseClient'
import { GameContext } from '../contexts/GameContext'
import htmlEntities from '../utilities/htmlEntities'

const BGG_API_URL =
  'http://192.168.0.142:8080/https://boardgamegeek.com/xmlapi2/thing?id='

const Add = () => {
  const navigate = useNavigate()

  const { formError, setFormError, thing, setThing, isLoading, setIsLoading } =
    useContext(GameContext)

  if (thing.item) {
    const fetchFromBGG = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(BGG_API_URL + htmlEntities(thing.item))
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
          },
          {
            selector: 'minplayers',
            attribute: 'value'
          },
          {
            selector: 'maxplayers',
            attribute: 'value'
          },
          {
            selector: 'playingtime',
            attribute: 'value'
          },
          {
            selector: 'minplayingtime',
            attribute: 'value'
          },
          {
            selector: 'maxplayingtime',
            attribute: 'value'
          },
          {
            selector: 'minage',
            attribute: 'value'
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !quantity) {
      setFormError('Please fill in the title and quantity fields')
      return
    }

    const { data, error } = await supabase
      .from('games')
      .insert([{ title, image, description, quantity }])
      .select()

    if (error) {
      console.log(error)
      setFormError('Cannot add game')
    }

    if (data) {
      setFormError('')
      navigate('/')
    }
  }

  return (
    <section className='page create'>
      <form className='addForm' onSubmit={handleSubmit}>
        <h1>Add game</h1>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            className='form-control'
            type='text'
            placeholder='Enter title...'
            id='title'
            value={thing.name}
            onChange={(e) =>
              setThing((prevThing) => ({ ...prevThing, name: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor='yearpublished'>Year published</label>
          <input
            className='form-control'
            type='text'
            placeholder='Enter year published...'
            id='yearpublished'
            value={thing.yearpublished}
            onChange={(e) =>
              setThing((prevThing) => ({
                ...prevThing,
                yearpublished: e.target.value
              }))
            }
          />
        </div>
        <div>
          <label htmlFor='image'>Image</label>
          <input
            className='form-control'
            type='text'
            placeholder='Enter image url...'
            id='image'
            value={thing.image}
            onChange={(e) =>
              setThing((prevThing) => ({ ...prevThing, image: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            className='form-control'
            type='text'
            placeholder='Enter description...'
            id='description'
            value={thing.description}
            onChange={(e) =>
              setThing((prevThing) => ({
                ...prevThing,
                description: e.target.value
              }))
            }
          />
        </div>
        <div>
          <label htmlFor='quantity'>Quantity</label>
          <input
            className='form-control'
            type='number'
            id='quantity'
            value={thing.quantity}
            onChange={(e) =>
              setThing((prevThing) => ({
                ...prevThing,
                quantity: parseInt(e.target.value)
              }))
            }
          />
        </div>

        <button>Add game</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </section>
  )
}

export default Add
