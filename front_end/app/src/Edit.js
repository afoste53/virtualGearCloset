import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bulma/css/bulma.css';
import './App.css';

export default function Edit(props){
    const [edit, setEdit] = useState(false);
    const [editString, setEditString] = useState(false);
    const [alert, setAlert] = useState('');


    const addGear = () => {
        setEdit(true);
        let editStr = (
            <Container>
                <Container className="has-text-centered">
                   
                </Container>
                <Container className="buttons">
                    <Button onClick={save} className="button is-primary mx-5">Save!</Button>
                    <Button onClick={cancel} className="button is-primary mx-5">Cancel!</Button>
                </Container>
            </Container>);
        setEditString(editStr);
    }

    const cancel = () => {
        setEdit(false);
    }

    const save = () => {
        
        
        setEdit(false);
    }

    const callUpdate = (str) =>{
        let closName = Object.keys(props.closets)[0];
        let oldGear = props.closets[closName].gear;
        delete oldGear[str];
        let clos = props.closets;
        clos.gear = oldGear;
        props.updateUser([props.password,clos]);
    }

    const deleteFunc = () => {
        let deleteName = document.getElementById("toDelete").value;
        let deleteNameLC = deleteName.toLowerCase();
        let names = getNames().map(n => n.toLowerCase());;
        let finalAnswer;
        if(names.includes(deleteNameLC)){ callUpdate(deleteName);
        }else{
                setEditString(
                <Container className="noFriendsContainer has-text-bold">
                    <Container id="search" className="has-text-centered">
                        <label className="mx-3"><strong>Hmm..didn't find that one, try again</strong></label>
                        <input id="toDelete" placeholder="Delete..."/>
                    </Container>
                    <Container className="buttons">
                        <Button onClick={deleteFunc} className="button is-primary mx-5">Delete forever!</Button>
                        <Button onClick={cancel} className="button is-danger mx-5">Cancel!</Button>
                    </Container>
                </Container>);
        }
        
    }
    
    const getNames = () => {
        let cId = Object.keys(props.closets)[0];
        let keys = Object.keys(props.closets[cId].gear);
        let gear = props.closets[cId].gear;
        return keys.map(k => gear[k].name);
    }

    const deleteGear = () => {
        setEdit(true);
        let deleteStr = (
            <Container className="noFriendsContainer has-text-bold">
                <Container id="search" className="has-text-centered">
                    <label className="mx-3"><strong>What's the name of the item you'd like to delete?</strong></label>
                    <input id="toDelete" placeholder="Delete..."/>
                </Container>
                <Container className="buttons">
                    <Button onClick={deleteFunc} className="button is-primary mx-5">Delete forever!</Button>
                    <Button onClick={cancel} className="button is-danger mx-5">Cancel!</Button>
                </Container>
            </Container>);
        setEditString(deleteStr);
    }

    return(
        <Container className="hero align-center">
            {!edit &&(<Container className="hero-body">
                <Button onClick={addGear} className="button is-primary mx-5">Add Gear</Button>
                <Button onClick={deleteGear} className="button is-danger mx-5">Delete Gear</Button>
            </Container>)}
            {edit && (<Container className="hero-body">
                        {editString}
                        </Container>)}
        </Container>
        );
}