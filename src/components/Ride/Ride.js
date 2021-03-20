import React from 'react'
import './Ride.css';
import {createContext} from 'react';
import {Button, Card} from 'react-bootstrap';
import {useHistory} from 'react-router';
export const CategoryContext = createContext();

const Ride = (props) => {


    const history = useHistory();
    const {id, name, image} = props.category;

    const showDetails = id => {
        props.setCategories(props.category);
        const url = `destination/${id}`;
        history.push(url);
    }
    return (
        <CategoryContext.Provider value={[props.category, props.setCategories]}>
            <div className="col-md-3 align-items-center mt-5 mb-5">
                <div className="d-flex justify-content-around">
                    <Card id="card" className="">
                        <Card.Img id="team-image" variant="top" src={image}/>
                        <Card.Body>
                            <Card.Text> {name}</Card.Text>
                            <Button id="teamBtn" onClick={() => showDetails(id)}>Get Ride</Button>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </CategoryContext.Provider>
    );
};

export default Ride;