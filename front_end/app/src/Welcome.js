import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
import Login from './Login';
import CreateAccount from 'createAccount';

export default function Welcome(props){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [newEmail, setNewEmail] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const handleLogin = login => {
        setEmail(login.email);
        setPassword(login.password);
    }

    const handleCreateAccount = newAccount =>{
        setNewEmail(newAccount.email);
        setNewPassword(newAccount.password);
        setName(newAccount.name);
    }

    const handleLoginClick = () => {
        props.loginSignUp(email, password, null);
    }
                                
    const handleCreateClick = () =>{
        props.loginSignUp(newEmail, newPassword, name);
                    
    }
    
    
    return(<>
        
            <div className="hero-body"id="rooted">
                <div>
                    <h1 className="title has-text-bold">Welcome to Virtual Gear Closet!</h1>
                    <h3 className="subtitle">The Answer to All Your Gear Organizing Needs</h3>
                </div>
            </div>
            <Container className="columns">    
                <Container className="column">
                    <Login onChange={handleLogin} />
                    <Button className="button is-primary is-medium m-3" onClick={handleLoginClick}>Login</Button>
                </Container>
                <Container className="column">
                    <CreateAccount onChange={handleCreateAccount}/>
                    <Button className="button is-primary is-medium m-3" onClick={handleCreateClick}>Create Account</Button>
                </Container>
            </Container>
                
            
                
            </>
    );
}
