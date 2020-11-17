import React, {useState, useEffect} from 'react';
//import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './App.css';
import Login from './Login';
import CreateAccount from 'createAccount';
import axios from 'axios';
//import User from './User.js';

export default function Welcome(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    const handleLogin = login => {
        setEmail(login.email);
        setPassword(login.password);
    }

    const handleCreateAccount = newAccount =>{
        setEmail(newAccount.email);
        setPassword(newAccount.password);
        setName(newAccount.name);
        console.log('email ' + email + ' password '+ password + " name " + name);
    }
 
    const [hasAccount, setHasAccount] = useState(true);
    const [firstButton, setFirstButton] = useState('Login');
    const [secondButton, setSecondButton] = useState('Create Account');

    useEffect(() => {
        firstButton === 'Login' ? setHasAccount(true) : setHasAccount(false);
    }, [firstButton]);

    const handleClick = () =>{
        if(hasAccount){
            setFirstButton('Create Account')
            setSecondButton('Go Back');
        }else{
            setFirstButton('Login');
            setSecondButton('Create Account');
        }
    }

    const handleLoginClick = async () => {
        if(hasAccount){
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
            if(newData != null){
                props.setLogBool(true);
                props.setUserId(newData.userId);
                props.setEmail(newData.email);
                props.setName(newData.name);
                props.setPassword(newData.password);
                props.setCloset(newData.closet);                //ReactDOM.render(<User userObj={newData} />, document.getElementById('rooted'));
            }
        }else{
            let result = await axios({method: 'post',
                                    url: 'http://localhost:3030/users',
                                    data: {
                                        email: email,
                                        name: name,
                                        password: password
                                    }
                                    });
            let newData = result.data;
            if(result.status===200){
                props.setLogBool(true);
                props.setUserId(newData.userId);
                props.setEmail(newData.email);
                props.setName(newData.name);
                props.setPassword(newData.password);
                props.setCloset(newData.closet); 
            }
                    
        }
    }
    
    return(<>
        
                <div className="hero-body"id="rooted">
                    <div>
                        <h1 className="title has-text-bold">Welcome to Virtual Gear Closet!</h1>
                        <h3 className="subtitle">The Answer to All Your Gear Organizing Needs</h3>
                    </div>
                </div>
                <div className="container columns">
                    <div className="column is-one-fourth"></div>
                    <div className="column is-one-half">
                    {hasAccount === true && <Login onChange={handleLogin} />}
                    {hasAccount === false && <CreateAccount onChange={handleCreateAccount}/>}
                    <button className="button is-info is-light is-inverted is-outlined" onClick={handleLoginClick}>{firstButton}</button>
    <button className="button is-info is-light is-inverted is-outlined" onClick={handleClick}>{secondButton}</button>
                    </div>
                    <div className="column is-fourth"></div>
                </div>
                
            </>
    );
}