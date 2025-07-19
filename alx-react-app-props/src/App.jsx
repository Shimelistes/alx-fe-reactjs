import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import UserProfile from './components/UserProfile';

import ProfilePage from './components/ProfilePage';
import UserContext from './UserContext';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <div>
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>

      <div>
        <a href="https://vite.dev " target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev " target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* Uncomment and use these components as needed */}
      <div>
        <WelcomeMessage />
        <Header />
        <MainContent />
        <Footer />

        <UserProfile 
          name="Alice" 
          age="25" 
          bio="Loves hiking and photography" 
        />
      </div>
    </div>
  );
}

export default App;