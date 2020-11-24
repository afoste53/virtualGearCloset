import React, {useEffect, useState} from 'react';
import {Container, Button} from 'react-bootstrap';
import 'bulma/css/bulma.css';
import axios from 'axios';

export default function Closet (props)  {
    const [gear, setGear] = useState([]);
    const [addBool, setAddBool] = useState(false);
    const [addVar, setAddVar] = useState(null);

    //set up headers
    let headers =[];
    const specIterator = props.specs.values();
    for(const v of specIterator){
        headers.push(v)
    }
    const setMap = (param) => {
        setGear(param);
    }

    useEffect(()=>{
        let row = [];
        for(let i = 0; i < props.gear.length; i++){
            row[i] = props.gear[i].map(g => <td key={g}>{g}</td>);
        }
        let gearArr = row.map(r => <tr key={Math.random()*26}>{r}</tr>);
        setMap(gearArr);
    },[props.gear, props.mostRecent]);
    
    const editGear = () => {
        
    }

    const addGear = () => {
        setAddBool(!addBool);
        let temp = headers.map(h => <td key={h + ' '}><input id={h} placeholder={h}/></td>);
        setAddVar(temp);
    }

    const deleteCloset = () => {

    }

    const saveGear = async () => {
        let saveArr = [];
        headers.forEach(h => saveArr.push(document.getElementById(h).value));
        props.gear.push(saveArr);
        let result = await axios ({method: 'put',
                                url: 'http://localhost:3030/closets' + props.cId,
                                data: {
                                    "name": props.name,
                                    "owner": props.owner,
                                    "specs": props.specs,
                                    "gear": props.gear
                                }    
                            });
        if(result.status === 200){
            let result = await axios({method: 'get',
                                        url: 'http://localhost:3030/closets' + props.cId});
            headers.forEach(h => document.getElementById(h).value ='');
            props.setMostRecent(result.data);
        }
        
    }

    return(    
    <Container className="table-container closetDiv has-background-primary-light">
        <h2 className="has-text-bold">{props.name}</h2>
                
        <table className="table is-striped is-fullwidth">
            <tbody>   
                <tr key="headers">
                    {headers.map((h) => <th key={h}>{h}</th>)}
                </tr>
                {gear}
                {addBool && <tr>{addVar}<td><Button onClick={saveGear} className="button is-small is-primary">Save</Button></td></tr>}
            </tbody>
        </table>
        <Container className="buttons are-normal is-centered" >
            <Button onClick={addGear} className="button is-success mx-2" >{!addBool ? "Add Gear" : "Done Editing"}</Button>
            <Button onClick={editGear} className="button is-primary mx-2" >Edit Gear</Button>
            <Button onClick={deleteCloset} className="button is-danger mx-2" >Delete Closet</Button>
        </Container>
    </Container>)

    

    }