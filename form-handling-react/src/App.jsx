import React, { useState } from 'react';
import ControlledForm from './components/ControlledForm';
import FormikForm from './components/formikForm';

const App = () => {
  const [showControlled, setShowControlled] = useState(true);

  const toggleForm = () => {
    setShowControlled(!showControlled);
  };

  return (
    <div className="app-container">
      <h1 className="text-center text-3xl font-bold my-6">User Registration</h1>
      <button 
        onClick={toggleForm} 
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Switch to {showControlled ? 'Formik' : 'Controlled'} Form
      </button>
      {showControlled ? <ControlledForm /> : <FormikForm />}
    </div>
  );
};

export default App;