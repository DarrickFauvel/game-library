import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../config/supabaseClient"
import { GameContext } from "../contexts/GameContext"

const Update = () => {
  const { isLoading, setIsLoading } = useContext(GameContext)
  const { id } = useParams()

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
      .update({ title, image, description, quantity })
      .match({ id: id })
      .select()

    if (error) {
      console.log(error)
      setFormError("Cannot update game")
    }

    if (data) {
      setFormError("")
      navigate("/")
    }
  }

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("games")
      .delete()
      .match({ id: id })
      .select()

    if (error) {
      console.log(error)
      setFormError("Could not delete game")
    }
    if (data) {
      setFormError("")
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from("games")
        .select()
        .eq("id", id)
        .single()

      if (error) {
        console.log(error)
        setFormError("Could not fetch game")
      }

      if (data) {
        setFormError("")

        setTitle(data.title)
        setImage(data.image)
        setDescription(data.description)
        setQuantity(data.quantity)
      }
    }

    fetchGame()
  }, [])

  return (
    <section className="page update">
      <form className="updateForm" onSubmit={handleSubmit}>
        <h1>Update game</h1>
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

        <button type="submit">Update game</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      <button onClick={() => handleDelete(id)}>Delete game</button>
    </section>
  )
}

export default Update
