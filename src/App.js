import './App.css';
import React, {createContext, useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Destination from "./components/Destination/Destination";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Header/>
                        <Home/>
                    </Route>

                    <Route path="/home">
                        <Header/>
                        <Home/>
                    </Route>

                    <Route path="/login">
                        <Header/>
                        <Login/>
                    </Route>

                    {/*<Route path="/destination">*/}
                    {/*    <Header/>*/}
                    {/*    <Destination/>*/}
                    {/*</Route>*/}

                    <PrivateRoute path="/destination/:id">
                        <Header />
                        <Destination />
                    </PrivateRoute>

                </Switch>
            </Router>
        </UserContext.Provider>

    );
}

export default App;
