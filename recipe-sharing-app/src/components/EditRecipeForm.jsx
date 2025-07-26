import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'
import { useNavigate } from 'react-router-dom'

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const updateRecipe = useRecipeStore(state => state.updateRecipe)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateRecipe(recipe.id, { title, description })
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe title"
          style={{ padding: '8px', width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe description"
          style={{ padding: '8px', width: '100%', minHeight: '100px' }}
        />
      </div>
      <button 
        type="submit"
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Update Recipe
      </button>
    </form>
  )
}

export default EditRecipeForm