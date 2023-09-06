import React from 'react';
import { useSelector } from 'react-redux';
import LoginPage from './Login';
import Dashboard from './Dashboard';
import { RootState } from './store'; // Assuming your RootState is exported from store.ts

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="App">
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
}

export default App;
