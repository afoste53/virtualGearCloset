import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import Login from './Login';
import CreateAccount from 'createAccount';

export default function Welcome(){
    const [hasAccount, setHasAccount] = useState(true);
    const [firstButton, setFirstButton] = useState('Login');
    const [secondButton, setSecondButton] = useState('Create Account');

    const handleClick = () =>{
        if(hasAccount){
            setHasAccount(false);
            setFirstButton('Create Account')
            setSecondButton('Go Back');
        }else{
            setHasAccount(true);
            setFirstButton('Login');
            setSecondButton('Create Account');
        }
    }
    
    return(
        <div class="header-image">
            <div class="hero is-fullheight">
                <div class="hero-body"id="welcome">
                    <div>
                        <h1 class="title has-text-bold">Welcome to Virtual Gear Closet!</h1>
                        <h3 class="subtitle">The Answer to All Your Gear Organizing Needs</h3>
                    </div>
                </div>
                <div class="container">
                    {hasAccount === true && <Login />}
                    {hasAccount === false && <CreateAccount/>}
                    <button class="button is-info is-light is-inverted is-outlined">{firstButton}</button>
    <button class="button is-info is-light is-inverted is-outlined" onClick={handleClick}>{secondButton}</button>
                </div>
                
            </div>
            
        </div>
    );
}