import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContextProvider } from './context/AuthContext';

function App() {


    return (
        <>
        <AuthContextProvider>
      <Nav />

            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                </BrowserRouter>
            </AuthContextProvider>
    </>


  );
}

export default App;
