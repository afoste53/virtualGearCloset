import React, {useState, useEffect} from 'react';
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
    const [sec, setSec] = useState();

    const setClosetWaterfall = (id, closet) => {
        setCloset((prev) => ({...prev, [id]:closet}));
        console.log('wrapper');
        console.log(closet);
        return closet;
    }

    useEffect(()=>{
        console.log("sec");
        console.log(sec);
        let h = closet;
        console.log('h');
        console.log(h);
        if(sec!== undefined){
        console.log('in if');
            h[sec.cId] = sec;
        setCloset(h);
        console.log('closet');
        console.log(closet);
        }
    },[sec, closet]);


return(<div className="header-image">
    <div className="hero is-fullheight" id="rooted">
    {!logBool && <Welcome setUserId={setUserId} setEmail={setEmail} setName={setName} 
                            setPassword={setPassword} setCloset={setCloset} setUser={setUser}
                             setLogBool={setLogBool}/>}
    {logBool && <User userId={userId} setSec={setSec}email={email} name={name} password={password} 
                            closet={closet} setUserId={setUserId} setEmail={setEmail}
                            setName={setName} setPassword={setPassword} setClosetWaterfall={setClosetWaterfall}  
                            user={user} setLogBool={setLogBool} setCloset={setCloset}/>}
    </div>
</div>);
}