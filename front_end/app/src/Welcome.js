import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './App.css';
import Login from './Login';
import CreateAccount from 'createAccount';
import axios from 'axios';
import User from './User.js';

export default function Welcome(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleLogin = login => {
        setEmail(login.email);
        setPassword(login.password);
    }
 
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

    const handleLoginClick = async () => {
        let result = await axios({
                            method: 'post',
                            url: 'http://localhost:3030/login',
                            data: {user: email,
                                password: password}
                            });
            let newData = null;
            if(result.status === 200){
                let res = await axios({
                    method: 'get',
                    url: 'http://localhost:3030/users' + result.data
                });
                newData = res.data;
                
            }
        console.log(newData);
        if(newData != null){

            ReactDOM.render(<User userObj={newData} />, document.getElementById('root'));
        }
    }
    
    return(
        <div className="header-image">
            <div className="hero is-fullheight">
                <div className="hero-body"id="welcome">
                    <div>
                        <h1 className="title has-text-bold">Welcome to Virtual Gear Closet!</h1>
                        <h3 className="subtitle">The Answer to All Your Gear Organizing Needs</h3>
                    </div>
                </div>
                <div className="container columns">
                    <div className="column is-one-fourth"></div>
                    <div className="column is-one-half">
                    {hasAccount === true && <Login onChange={handleLogin} />}
                    {hasAccount === false && <CreateAccount/>}
                    <button className="button is-info is-light is-inverted is-outlined" onClick={handleLoginClick}>{firstButton}</button>
    <button className="button is-info is-light is-inverted is-outlined" onClick={handleClick}>{secondButton}</button>
                    </div>
                    <div className="column is-fourth"></div>
                </div>
                
            </div>
            
        </div>
    );
}