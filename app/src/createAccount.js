import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export default function CreateAccount () {
    return (
        <form>
            <strong>Create Account</strong>
            <br/>
            <field>
                <lable>Enter your email</lable>
                <input class="input is-large seeThrough" type="text"/>
            </field>
            <field>
                <label>Password</label>
                <input class="input is-large seeThrough" type="password"/>
            </field>
            <field>
                <label>Confirm password</label>
                <input class="input is-large seeThrough" type="password"/>
            </field>
        </form>
    );
}