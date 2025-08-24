import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Form Handling</h1>
      
      <h3>Controlled Component</h3>
      <RegistrationForm />

      <hr style={{ margin: '40px 0' }} />

      <h3>Formik Version</h3>
      <FormikForm />
    </div>
  );
}

export default App;