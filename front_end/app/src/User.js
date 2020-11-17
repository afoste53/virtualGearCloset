<<<<<<< Updated upstream
import React from 'react';
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';

export default function User(props){
=======
import React, {useState} from 'react';
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';
import Closet from './Closet';
import NewCloset from './newClosetView';
import axios from 'axios';

export default async function User(props){
    
    
    let res = await axios({
        method: 'get',
        url: 'http://localhost:3030/users' + props.userProp
    });



    const [generateView, setGenerateView] = useState(false);
    let generateCloset = () => {
        generateView ? setGenerateView(false) : setGenerateView(true);
    }
    const user = props.userProp;
>>>>>>> Stashed changes
    return (
    <div className="seeThrough">
            
            
            
<<<<<<< Updated upstream
            <div className="hero ">
            <Container>
                <DropdownButton stick="top" menuAlign="left" title="Menu" id="dropdown-menu">
                    <Dropdown.Item eventKey="1">Home</Dropdown.Item>
                    <Dropdown.Item eventKey="2"> </Dropdown.Item>
                    <Dropdown.Item eventKey="3"> </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
=======
            <div className="hero" id="menu">
                <Container>
                    <DropdownButton stick="top" menuAlign="left" title="Menu" id="dropdown-menu">
                        <Dropdown.Item eventKey="1">Home</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Plan a Trip</Dropdown.Item>
                        <Dropdown.Item eventKey="3" onClick={generateCloset}>Create New Closet</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">About</Dropdown.Item>
                        <Dropdown.Item eventKey="5">Log out</Dropdown.Item>
                    </DropdownButton>
                </Container>
                    <div className="has-text-centered hero-body">
                        <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {res.name}</h1>
                    </div>
            </div>
        <Container id="closetContainer" >
            <Closet className="has-text-centered closetDiv"/>
            
            <br />
            <br />
            <br />
            <Container id='newCloset' >
    {generateView && <NewCloset userObj={user} 
                        generateView={generateView} 
                        cancel={generateCloset}/>};
    {!generateView &&  <button className="button is-primary" 
                                onClick={generateCloset}>Create New Closet</button>};
                
>>>>>>> Stashed changes
            </Container>
                <div className="has-text-centered hero-body">
                    <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {props.userObj.user.name}</h1>
                </div>
            </div>
        
        <div></div>
    </div>
    );
}