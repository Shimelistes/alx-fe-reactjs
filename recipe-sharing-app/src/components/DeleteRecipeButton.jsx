import useRecipeStore from '../store/recipeStore'
import { useNavigate } from 'react-router-dom'

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId)
      navigate('/')
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton