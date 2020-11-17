import React, {useState, useEffect} from 'react';
import Welcome from './Welcome.js';
import User from './User.js';
//import Cookies from 'universal-cookie';


export default function Wrapper (){
  //  const cookies = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);
    const [u, setUser] = useState();
    const [renderVar, setRenderVar] =useState(<Welcome userProp={u} loginSetter={setLoggedIn} userSetter={setUser}/>);
    useEffect(()=>{
        loggedIn ?setRenderVar(<User userProp={u} loginSetter={setLoggedIn} userSetter={setUser}/>) :setRenderVar(<Welcome userProp={u} loginSetter={setLoggedIn} userSetter={setUser}/>);
    }, [loggedIn,u]);

return(<div className="header-image">
    <div className="hero is-fullheight" id="rooted">
    {renderVar}
    </div>
</div>);
}