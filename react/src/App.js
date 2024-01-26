import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import TaskManager from './components/TaskManager/TaskManager';
import TaskItem from './components/TaskItem/TaskItem';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              // If the user is authenticated, navigate to the TaskManager page
              <Navigate to="/tasks" />
            ) : (
              // If not authenticated, show the Auth component
              <Auth setToken={setToken} />
            )
          }
        />
        <Route
          path="/tasks"
          element={token ? <TaskManager token={token} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
