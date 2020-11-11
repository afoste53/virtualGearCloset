import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export default function Login(){
    return(<form class="has-text-bold has-text-white">
            <strong class="has-text-white">Login </strong>
            <br/>
            <field>
                <label>Email</label>
                <input class="input is-large seeThrough" type="text" placeholder="Username"/>
            </field>
            <field>
                <label>Password</label>
                <input class="input is-large seeThrough" type="password" placeholder="Password"/> 
            </field>
            
        </form>);
}