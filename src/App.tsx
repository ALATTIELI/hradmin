import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';  // Import the AppRoutes

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
}

export default App;
