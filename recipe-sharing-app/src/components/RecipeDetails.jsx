import { useParams, Link } from 'react-router-dom'
import useRecipeStore from '../store/recipeStore'
import DeleteRecipeButton from './DeleteRecipeButton'
import EditRecipeForm from './EditRecipeForm'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  )

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'block', marginBottom: '20px' }}>← Back to recipes</Link>
      <h1>{recipe.title}</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{recipe.description}</p>
      
      <div style={{ marginTop: '40px' }}>
        <h3>Edit Recipe</h3>
        <EditRecipeForm recipe={recipe} />
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  )
}

export default RecipeDetails