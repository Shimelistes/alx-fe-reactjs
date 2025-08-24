import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mockRegisterApi from '../api/mockRegisterApi';

const FormikForm = () => {
  const [message, setMessage] = useState('');
  const [isSubmittingFormik, setIsSubmittingFormik] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    setIsSubmittingFormik(true);

    try {
      const response = await mockRegisterApi(values);
      setMessage(response.message);
      if (response.success) resetForm();
    } catch {
      setMessage('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
      setIsSubmittingFormik(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full my-4 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formik Registration Form</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikUsername">
                Username:
              </label>
              <Field
                type="text"
                id="formikUsername"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikEmail">
                Email:
              </label>
              <Field
                type="email"
                id="formikEmail"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="formikPassword">
                Password:
              </label>
              <Field
                type="password"
                id="formikPassword"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                disabled={isSubmittingFormik}
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
              transition duration-200 ease-in-out"
              disabled={isSubmittingFormik}
            >
              {isSubmittingFormik ? 'Submitting...' : 'Register with Formik'}
            </button>
            {message && (
              <p className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'} mt-4`}>
                {message}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
