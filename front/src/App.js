import * as React from 'react';
import Login from './components/login.js'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Switch} from "react-router-dom";
import Register from "./components/Register";
import Error from "./Route/ErrorPage";
import DashBoardAdmin from "./components/Admin/AdminDashBoard"
import UserPage from "./components/UserPage";
import RegisterApplication from "./components/RegisterApplication"
import RegisterCompany from "./components/RegisterCompany"
import RegisterAdvertisement from "./components/RegisterAdvertisement"
import Frontage from "./components/Frontage";
import JobSeeker from './components/JobSeeker.js';
import ChampionSeeker from './components/ChampionSeeker.js';
import Redirection from './components/Redirection.js';
import LearnMore from './components/LearnMore'


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Frontage/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
                <Route exact path="/redirection">
                    <Redirection/>
                </Route>
                <Route exact path="/registerApplication">
                    <RegisterApplication/>
                </Route>
                <Route exact path="/registerCompany">
                    <RegisterCompany/>
                </Route>
                <Route exact path="/registerAdvertisement">
                    <RegisterAdvertisement/>
                </Route>
                <Route exact path="/admin">
                    <DashBoardAdmin/>
                </Route>
                <Route exact path="/user">
                    <UserPage/>
                </Route>
                <Route exact path="/championseeker">
                    <ChampionSeeker/>
                </Route>
                <Route exact path="/jobseeker">
                    <JobSeeker/>
                </Route>
                <Route exact path="/learnmore">
                    <LearnMore/>
                </Route>
              
                <Route exact path="/error">
                    <Error/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App;