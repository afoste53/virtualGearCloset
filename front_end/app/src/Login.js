import React, {useState, useEffect}from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export default function Login(props){
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    useEffect(() => {
        if(props.onChange){
            props.onChange(formData);
        }
    }, [formData, props]);

    return(<form className="has-text-bold has-text-white" >
            <strong className="has-text-white">Login </strong>
            <br/>
            <div>
                <label>Email</label>
                <input name="email" onChange={handleChange} className="input is-large seeThrough" type="text" placeholder="Username"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" onChange={handleChange} className="input is-large seeThrough" type="password" placeholder="Password"/> 
            </div>
            
        </form>);
}