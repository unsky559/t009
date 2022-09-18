import React from 'react';
import './reset.scss';

import {
  BrowserRouter, Navigate, Route, Routes
} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import Header from './componetns/header/header';
import NotFountPage from './pages/notFountPage';
import RegisterPage from './pages/registerPage';
import FilmsPage from './pages/filmsPage';
import AddFilmPage from './pages/addFilmPage';
import ImportFilmsPage from './pages/importFilmsPage';
import { useAppSelector } from './hooks/redux';

const App = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer.auth);

  return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={!isAuth ? <LoginPage/> : <Navigate to="/films" replace={true}/>}/>
                <Route path="/signin" element={!isAuth ? <RegisterPage/> : <Navigate to="/films" replace={true}/>}/>
                <Route path="/films" element={isAuth ? <FilmsPage/> : <Navigate to="/login" replace={true}/>}/>
                <Route path="/add" element={isAuth ? <AddFilmPage/> : <Navigate to="/login" replace={true}/>}/>
                <Route path="/import" element={isAuth ? <ImportFilmsPage/> : <Navigate to="/login" replace={true}/>}/>
                <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
                <Route path="*" element={<NotFountPage/>}/>
            </Routes>
        </BrowserRouter>
  );
};

export default App;
