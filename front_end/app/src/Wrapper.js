import React, {useState, useEffect} from 'react';
import { Dropdown, Container, DropdownButton } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import axios from 'axios';
import Welcome from './Welcome.js';
import User from './User.js';
import Plan from './Plan.js';

export default function Wrapper (){
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState(null);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [closetIds, setClosetIds] = useState(null);
    const [closetObjs, setClosetObjs] = useState([]);
    const [mostRecent, setMostRecent] = useState([]);
    const [names, setNames] = useState([]);
    
    const newClosetId = async (newId) =>{
       if(closetIds.length > 0){
           setClosetIds(prev => [...prev, newId]);
       }else{
           setClosetIds([newId]);
       }
       let temp = closetIds;
       temp.push(newId);
       let result = await axios({method: 'put',
                                url: 'http://localhost:3030/users' + userId,
                                data: {
                                    email: email,
                                    name: name,
                                    password: password,
                                    closets: temp
                                }
                                });
                         
    }

    const setUpClosetObjs = async () => {
        setClosetObjs([]);
        for(let i = 0; i < closetIds.length; i++){
            let c = await axios({method: 'get',
                                url: 'http://localhost:3030/closets' + closetIds[i]
                                });
            if(closetObjs == null){
                setClosetObjs(c.data);
                console.log(closetObjs);
            }else if(!closetObjs.includes(c.data)){
                setClosetObjs(prev => [...prev, c.data]);
            }      
        }
        
    }

    //runs at begginning, when new closet is added, or when closet is removed?
    //when to update backend?
    useEffect(()=>{
        if(closetIds != null ){
            if(closetIds.length >= 0){
                setUpClosetObjs(); 
                setLoggedIn(true);
                setPage(1);       
            }
        }    
    },[closetIds]);

  

    const loginSignUp = async (email, password, name) => {
        //existing user login
        if(name === null){
            let idResult = await axios({method: 'post',
                                    url: 'http://localhost:3030/login',
                                    data: {
                                        email: email,
                                        password: password
                                    }
                                });
        if(idResult.status === 200){
            let result = await axios({method: 'get',
                                    url: 'http://localhost:3030/users' + idResult.data
                                    });
            if(result.status === 200){
                setName(result.data.name);
                setEmail(result.data.email);
                setPassword(result.data.password);
                setClosetIds(result.data.closets);
                setUserId(result.data.userId);
            }
        }

        }//create new user
        else if(name !== null){
            let result = await axios({method: 'post',
                                    url: 'http://localhost:3030/users',
                                    data: {
                                        email: email,
                                        password: password,
                                        name: name,
                                        closets: []
                                    }
                                    });
            if(result.status === 200){
                setName(result.data.name);
                setEmail(result.data.email);
                setPassword(result.data.password);
                setClosetIds(result.data.closets);
                setUserId(result.data.userId);  
                setLoggedIn(true);
                setPage(1);
            }
        }
    }

return(

    <div className="header-image">
    <div className="hero is-fullheight" id="rooted">

        {!loggedIn && <Container className="hero">
                            <Welcome loginSignUp={loginSignUp}/>
                    </Container>}

        {loggedIn && <div className="hero" id="menu">
            <Container>
                <DropdownButton stick="top" menuAlign="left" title="Menu" id="dropdown-menu">
                    <Dropdown.Item onClick={() => setPage(1)} eventKey="1">Home</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPage(2)} eventKey="2" >Plan a Trip</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">About</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Log out</Dropdown.Item>
                </DropdownButton>
            </Container>
            <div className="has-text-centered hero-body">
                <h1 id="welcomeBackHeader" className="title has-text-bold">
                                            {page === 1 ? "Welcome Back " + name + "!" :
                                                   "Let's Plan a Trip " + name + "!"}
                </h1>
            </div>
        </div>}

        {loggedIn && <Container >
            {page===1 && <User className="m-6" 
                                    name={name}  
                                    closetIds={closetIds}
                                    setClosetIds={setClosetIds}
                                    closetObjs={closetObjs}
                                    setClosetObjs={setClosetObjs}
                                    setMostRecent={setMostRecent}
                                    mostRecent={mostRecent}
                                    password={password}
                                    email={email}
                                    userId={userId}
                                    newClosetId={newClosetId}
                                    setNames={setNames}
                                    names={names}/>}
            {page===2 && <Plan className="m-6"
                                    name={name}
                                    closetIds={closetIds}
                                    closetObjs={closetObjs}
                                    email={email}
                                    names={names}
                                    namesArr={["gilbert", "tonya", "tina"]}/>}
        </Container>}
    </div>
</div>);
}