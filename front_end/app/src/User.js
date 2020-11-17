import React, {useState} from 'react';
import { Dropdown, Container, DropdownButton, Button } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';
import Closet from './Closet';
import NewCloset from './newClosetView';

export default function User(props){
    const [newCloset, setNewCloset] = useState(false);
    
    let generateCloset = () => {
        newCloset ? setNewCloset(false) : setNewCloset(true);
    }


    return (
    <div className="seeThrough">
            
            
    {console.log(props.password)}
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
                        <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {props.name}</h1>
                    </div>
            </div>
        <Container id="closetContainer" >
            <Closet className="has-text-centered closetDiv"/>
            
            <br />
            <br />
            <br />
            <Container id='newCloset' >
                {!newCloset && <Button onClick={generateCloset} className="button is-primary">Create New Closet</Button>}
                {newCloset && <NewCloset generateCloset={generateCloset}/>}
            </Container>
        </Container>

        
    </div>
    );
}