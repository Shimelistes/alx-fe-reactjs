import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function FormikForm() {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });



      // 

      const data = await res.json();
      alert(`User registered: ${data.username}`);
      resetForm();
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("Something went wrong!");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">Formik Registration Form</h2>

          <div>
            <Field
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white p-2 rounded"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
