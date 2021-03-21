import React, { useContext } from 'react';
import {  Link} from "react-router-dom";
import './Header.css';
import {Nav, Navbar} from "react-bootstrap";
import { UserContext } from '../../App';
const Header = () => {

    const [loggedInUser] = useContext(UserContext);
    const { isSignedIn, name } = loggedInUser;
    return (
        <div className=" mt-2">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand >Traveling Town</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Link to="/home" className="m-2 list-item">Home</Link>
                        {/* <Link to="/login" className="m-2 list-item">Destination</Link> */}
                        {
                         !isSignedIn &&    <Link to="/login" className="m-2 list-item">Destination</Link>
                        }
                        <Link to="/home" className="m-2 list-item">Blog</Link>
                        <Link to="/home" className="m-2 list-item">Contact</Link>
                        {
                            isSignedIn && <Link to="/login" className="m-2 list-item login-btn">{name}</Link>                              
                        }
                        {                           
                            !isSignedIn &&  <Link to="/login" className="m-2 list-item login-btn">Login</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;