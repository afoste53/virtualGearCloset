import React, {useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';
import Closet from './Closet';

export default function User(props){   
    const addNewCloset = () => {
       
   }
   
    return (
    <div className="seeThrough">
        <Container id="closetContainer" >
            <Container id="currClosets">
                {props.closetIds == null && <h1>Loading....</h1>}
                {props.closetObjs.map(c => <Closet key={c.cId} cId={c.cId} name={c.name} email={props.email} 
                                                    closetObjs={props.closetObjs} closetIds={props.closetIds}
                                                    setClosetObjs={props.setClosetObjs} setClosetIds={props.setClosetIds}
                                                    owner={c.owner} ownerName={props.name} specs={c.specs} gear={c.gear}
                                                    setMostRecent={props.setMostRecent} mostRecent={props.mostRecent}
                                                    password={props.password}
                                                    />)}
            </Container>
            <Button onClick={addNewCloset} className="button m-4 is-primary">Add New Closet!</Button>
        </Container>       
    </div>
    );
}