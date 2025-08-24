const mockRegisterApi = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.username && userData.email && userData.password) {
        resolve({ success: true, message: 'Registration successful!' });
      } else {
        reject({ success: false, message: 'Registration failed. Please fill all fields.' });
      }
    }, 1000);
  });
};

export default mockRegisterApi;