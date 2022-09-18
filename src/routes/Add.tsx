import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../config/supabaseClient"

const Add = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [formError, setFormError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !quantity) {
      setFormError("Please fill in the title and quantity fields")
      return
    }

    const { data, error } = await supabase
      .from("games")
      .insert([{ title, image, description, quantity }])
      .select()

    if (error) {
      console.log(error)
      setFormError("Cannot add game")
    }

    if (data) {
      setFormError("")
      navigate("/")
    }
  }

  return (
    <section className="page create">
      <form className="addForm" onSubmit={handleSubmit}>
        <h1>Add game</h1>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            placeholder="Enter image url..."
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter description..."
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <button>Add game</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </section>
  )
}

export default Add
