import React from 'react';

export default function User(props){
    return (
    <div>
        <nav className="navbar is-info">
            
        </nav>
        <div className="hero is-regular has-text-centered is-info ">
            <div className="hero-body">
                <h1 id="welcomeBackHeader" className="title has-text-bold">Welcome Back {props.userObj.user.name}</h1>
            </div>
        </div>


    </div>
    );
}