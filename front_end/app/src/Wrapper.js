import React, {useState} from 'react';
import Welcome from './Welcome.js';
import User from './User.js';


export default function Wrapper (){
    const [logBool, setLogBool] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [closet, setCloset] = useState();

return(<div className="header-image">
    <div className="hero is-fullheight" id="rooted">
    {!logBool && <Welcome setUserId={setUserId} setEmail={setEmail} setName={setName} setPassword={setPassword} setCloset={setCloset} setUser={setUser} setLogBool={setLogBool}/>}
    {logBool && <User userId={userId} email={email} name={name} password={password} closet={closet} user={user} setLogBool={setLogBool}/>}
    </div>
</div>);
}