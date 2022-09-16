import React from 'react';
import './reset.scss';

import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import Header from './componetns/header/header';
import NotFountPage from './pages/notFountPage';
import RegisterPage from './pages/registerPage';
import FilmsPage from './pages/filmsPage';
import AddFilmPage from './pages/addFilmPage';
import ImportFilmsPage from './pages/importFilmsPage';

const App = () => (
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signin" element={<RegisterPage/>}/>
            <Route path="/films" element={<FilmsPage/>}/>
            <Route path="/add" element={<AddFilmPage/>} />
            <Route path="/import" element={<ImportFilmsPage/>} />
            <Route path="/" element={<Navigate to="/films" replace={true} />} />
            <Route path="*" element={<NotFountPage/>} />
        </Routes>
    </BrowserRouter>
);

export default App;
