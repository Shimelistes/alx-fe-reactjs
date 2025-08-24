import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Formik Registered:", values);

        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => console.log("API response:", data));

        resetForm();
      }}
    >
      {() => (
        <Form className="space-y-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Formik Registration Form</h2>

          <div>
            <label className="block">Username:</label>
            <Field type="text" name="username" className="border p-2 w-full" />
            <ErrorMessage name="username" component="p" className="text-red-500" />
          </div>

          <div>
            <label className="block">Email:</label>
            <Field type="email" name="email" className="border p-2 w-full" />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>

          <div>
            <label className="block">Password:</label>
            <Field type="password" name="password" className="border p-2 w-full" />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;
