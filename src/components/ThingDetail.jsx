import { Link } from 'react-router-dom'

const ItemDetail = ({ thing }) => {
  return (
    <Link to={'/' + thing.id}>
      <div className='card'>
        <div className='card__cover'>
          <img
            className='card__cover--image'
            src={thing.image}
            alt={thing.title}
          />
        </div>
        <div className='card__content'>
          <h2 className='card__content--title'>{thing.title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default ItemDetail
