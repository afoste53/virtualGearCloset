import React, {useState, useEffect} from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export default function CreateAccount (props) {
    const [formData, setFormData] = useState({email: '', name: '', password: ''});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(props.onChange){
            props.onChange(formData);
        }
    }, [formData, props]);

    return (
    <div >
        <form className="has-text-bold has-text-white">
            <strong className="has-text-white">Create Account</strong>
            <br/>
            <field>
                <lable>Enter your email</lable>
                <input name="email" className="input is-medium seeThrough" type="text" onChange={handleChange}/>
            </field>
            <field>
                <lable>Name</lable>
                <input name="name" className="input is-medium seeThrough" type="text" onChange={handleChange}/>
            </field>
            <field>
                <label>Password</label>
                <input name="password"  className="input is-medium seeThrough" type="password" onChange={handleChange}/>
            </field>
            
        </form>
    </div>);
}