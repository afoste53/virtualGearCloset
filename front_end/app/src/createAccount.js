import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';

export default function CreateAccount () {
    return (<div >
        <form class="has-text-bold has-text-white">
            <strong class="has-text-white">Create Account</strong>
            <br/>
            <field>
                <lable>Enter your email</lable>
                <input class="input is-medium seeThrough" type="text"/>
            </field>
            <field>
                <lable>Name</lable>
                <input class="input is-medium seeThrough" type="text"/>
            </field>
            <field>
                <label>Password</label>
                <input class="input is-medium seeThrough" type="password"/>
            </field>
            <field>
                <label>Confirm password</label>
                <input class="input is-medium is-inverted seeThrough" type="password"/>
            </field>
        </form>
    </div>);
}