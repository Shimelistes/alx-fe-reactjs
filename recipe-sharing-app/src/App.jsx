import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <Outlet />
      <RecipeList />
    </div>
  )
}

export default App