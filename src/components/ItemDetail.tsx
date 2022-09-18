import { Link } from "react-router-dom"

interface Item {
  id: number
  title: string
  image: string
}

const ItemDetail = ({ itemObj }: Item) => {
  return (
    <Link to={"/" + itemObj.id}>
      <div className="item">
        <h2 className="item__title">{itemObj.title}</h2>
        <img className="item__image" src={itemObj.image} alt={itemObj.title} />
      </div>
    </Link>
  )
}

export default ItemDetail
