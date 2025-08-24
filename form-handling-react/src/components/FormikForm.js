import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password, // Again, this is mock
        }),
      });

      if (response.ok) {
        alert('Registration successful!');
        resetForm();
      } else {
        throw new Error('Registration failed');
      }
    } catch (err) {
      setErrors({ submit: 'An error occurred during registration.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>User Registration (Formik)</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            {/* Username */}
            <div style={{ marginBottom: '15px' }}>
              <label>Username:</label>
              <Field
                type="text"
                name="username"
                placeholder="Enter your username"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage
                name="username"
                component="div"
                style={{ color: 'red' }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '15px' }}>
              <label>Email:</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '15px' }}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: 'red' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {errors.submit && (
              <div style={{ color: 'red', marginTop: '10px' }}>{errors.submit}</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;