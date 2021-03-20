import React, {useEffect, useState} from 'react';
import './Destination.css'
import {useParams} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserFriends} from '@fortawesome/free-solid-svg-icons'

const Destination = () => {
    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const [element, setElement] = useState([]);
    const [permit, setPermit] = useState(false);
    const icon = <FontAwesomeIcon icon={faUserFriends} />
    useEffect(() => {

        const url = 'https://api.mocki.io/v1/ea69e576';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data = data.find(c => c.id == id);
                setElement(data);
            })
            .catch(error => console.log(error))
    }, [id])

    let flag;
    let finalDestination = [];
    const handleBlur = (e) => {
        finalDestination.push(e.target.value);
        if (flag) {
            setDetails(finalDestination);
        }
        flag = true;
        e.preventDefault();

    }

    const handleSubmit = () => {
        setPermit(true);
    }

    return (
        <div className=" container mainDiv">
            <div className="row">
                <div className="col-md-3 inputStyle">
                    {
                        !permit && <div>

                            <p>Pick from</p>
                            <input className="input" type="text" onBlur={handleBlur} placeholder="from" name="from" required/> <br/>
                            <p>Pick to</p>
                            <input className="input" type="text" onBlur={handleBlur} placeholder="to" name="to" required/> <br/>
                            <br/>
                            <input className="submitButton" type="submit" onClick={() => handleSubmit()}></input>
                        </div>
                    }

                    {
                        permit && <div>
                            {
                                details.map(detail => <li className="listStyleClass" key={detail.toString()}>{detail}</li>)
                            }
                            {
                                <div className="d-flex justify-content-between finalCardDetails">
                                    <img className="destinationClass" src={element.image} alt=""/>
                                    <h6>{element.name}</h6>
                                    <h6> {icon} {element.capacity}</h6>
                                    <h6>${element.cost}</h6>
                                </div>

                            }
                        </div>
                    }
                </div>
                <div className="col-md-9 mapStyle">
                    <iframe title="iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.82239289454!2d90.27923794728072!3d23.780887455957277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1616235797980!5m2!1sen!2sbd"
                        allowFullScreen="" loading="lazy">
                    </iframe>
                </div>


            </div>
        </div>

        // <div className="mainDiv container">
        //     <div className="row">
        //         <div className="col-md-3  inputStyle">
        //             <p>Pick from</p>
        //             <input type="text"/> <br/>
        //             <p>Pick to</p>
        //             <input type="text"/> <br/>
        //             <button>Get Rider</button>
        //         </div>
        //         <div className="col-md-9  mapStyle">
        //             <iframe
        //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12287.082466595812!2d90.47329282603404!3d23.71271273802011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b70acf2fe47b%3A0xaaa42c855a7e47b3!2sMatuail%20Medi%20Care%20Hospital%20%26%20Diagnostic%20Center!5e0!3m2!1sen!2sbd!4v1616217847703!5m2!1sen!2sbd"
        //                 allowFullScreen="" loading="lazy"></iframe>
        //         </div>
        //     </div>
        // </div>


    );
};

export default Destination;