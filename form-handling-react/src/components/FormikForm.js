import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const FormikForm = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log("Formik form submitted:", values);
        resetForm();
      }}
    >
      {() => (
        <Form className="p-4 border rounded w-80 mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">User Registration (Formik)</h2>

          <div className="mb-3">
            <label className="block mb-1">Username</label>
            <Field
              type="text"
              name="username"
              className="border px-2 py-1 w-full"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Email</label>
            <Field
              type="email"
              name="email"
              className="border px-2 py-1 w-full"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <Field
              type="password"
              name="password"
              className="border px-2 py-1 w-full"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
