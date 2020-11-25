import React, {useState, useEffect} from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';
import Closet from './Closet';
import NewCloset from './newClosetView';

export default function User(props){   
    const [emptyPageBool, setEmptyPageBool] = useState(true);
    const [newClosetBool, setNewClosetBool] = useState(null);
   
    const handleNewClosetClick = () => {
        setEmptyPageBool(!emptyPageBool);
        setNewClosetBool(!newClosetBool);
    }

    return (
    <div className="seeThrough">
        <Container id="closetContainer" >
            <Container id="currClosets">
                {props.closetIds.length < 1 && emptyPageBool &&  (<Container className="is-centered">
                                                <h3>Nothing to see here yet, let's get started with your first closet!</h3>
                                            </Container>)}
                {newClosetBool && <NewCloset setNewClosetBool={setNewClosetBool} newClosetBool={newClosetBool} newClosetId={props.newClosetId} ownerId={props.userId}  handleNewClosetClick={handleNewClosetClick}/>}
                {props.closetObjs.map(c => <Closet key={c.cId} cId={c.cId} name={c.name} email={props.email} 
                                                    closetObjs={props.closetObjs} closetIds={props.closetIds}
                                                    setClosetObjs={props.setClosetObjs} setClosetIds={props.setClosetIds}
                                                    owner={c.owner} ownerName={props.name} specs={c.specs} gear={c.gear}
                                                    setMostRecent={props.setMostRecent} mostRecent={props.mostRecent}
                                                    password={props.password}
                                                    />)}
            </Container>
            {!newClosetBool && <Button onClick={handleNewClosetClick} className="button m-4 is-primary">Add New Closet!</Button>}
        </Container>       
    </div>
    );
}