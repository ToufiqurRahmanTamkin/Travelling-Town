import React, {useEffect, useState} from 'react';
import "./Home.css"
// import {Button, Card} from "react-bootstrap";
import Ride from '../Ride/Ride';

const Home = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const url = 'https://api.mocki.io/v1/ea69e576';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                
                setCategories(data);
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div className="banner">
            <div className=" row m-5 d-flex home-container" >
                {
                    categories.map(category => <Ride key={category.id} category={category} setCategories={setCategories} />)
                }
            </div>

        </div>
    );
};

export default Home;