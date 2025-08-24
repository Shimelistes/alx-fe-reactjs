import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikRegistrationForm from './components/formikForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      {/* Render the controlled registration form */}
      <RegistrationForm />

      <div className="my-8 text-gray-600 text-lg font-medium">--- OR ---</div>

      {/* Render the Formik registration form */}
      <FormikRegistrationForm />
    </div>
  );
}
