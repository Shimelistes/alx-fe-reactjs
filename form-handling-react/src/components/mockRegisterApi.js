// Mock API function to simulate user registration
// This function mimics an asynchronous network request.
const mockRegisterApi = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Attempting to register user:', userData);
      // Simulate a scenario where a specific user already exists
      if (userData.username === 'testuser' && userData.password === 'password123') {
        resolve({ success: false, message: 'User already exists!' });
      } else {
        // Simulate successful registration for other users
        resolve({ success: true, message: 'Registration successful!' });
      }
    }, 1000); // Simulate a 1-second network delay
  });
};

export default mockRegisterApi;
