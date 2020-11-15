import React from 'react';
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';

export default function User(props){
    return (
    <div className="seeThrough">
            
            
            
            <div className="hero ">
            <Container>
                <DropdownButton stick="top" menuAlign="left" title="Menu" id="dropdown-menu">
                    <Dropdown.Item eventKey="1">Home</Dropdown.Item>
                    <Dropdown.Item eventKey="2"> </Dropdown.Item>
                    <Dropdown.Item eventKey="3"> </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
            </Container>
                <div className="has-text-centered hero-body">
                    <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {props.userObj.user.name}</h1>
                </div>
            </div>
        
        <div></div>
    </div>
    );
}