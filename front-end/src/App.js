import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./Pages/Home/Home";
import Login from './Pages/Login/Login'
import Events from './Pages/Events/events';
import SignUp from './Pages/SignUp/SignUp';
import CreatePage from './Pages/CreatePage/CreatePage';

let idGroup = 1;

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route index element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="events/:idGroup" element={<Events />} />
      <Route path="signup" element={<SignUp/>}/>
      <Route path="createPage" element={<CreatePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
