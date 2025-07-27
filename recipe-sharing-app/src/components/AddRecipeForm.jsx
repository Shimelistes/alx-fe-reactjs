import { useState } from 'react'
import useRecipeStore from '../store/recipeStore'


const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() || !description.trim()) return
    
    addRecipe({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
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
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm