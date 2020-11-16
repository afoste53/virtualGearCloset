import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';
import Closet from './Closet';
import NewCloset from './newClosetView';

export default function User(props){
    let generateCloset = () => {
        ReactDOM.render(<NewCloset />, document.getElementById('newCloset'));
    }


    return (
    <div className="seeThrough">
            
            
            
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
                        <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {props.userObj.name}</h1>
                    </div>
            </div>
        <Container id="closetContainer" >
            <Closet className="has-text-centered closetDiv"/>
            
            <br />
            <br />
            <br />
            <Container id='newCloset' onClick={generateCloset}>
                <button className="button is-primary">Create New Closet</button>
            </Container>
        </Container>

        
    </div>
    );
}