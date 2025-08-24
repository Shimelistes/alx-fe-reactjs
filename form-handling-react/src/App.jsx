import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div className="App p-6 space-y-6">
      <h1 className="text-2xl font-bold">Form Handling in React</h1>
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}

export default App;
