import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Container, Button} from 'react-bootstrap';
import 'bulma/css/bulma.css';
import axios from 'axios';

export default function Closet (props)  {
    const [gear, setGear] = useState([]);
    const [editGearVar, setEditGearVar] = useState([]);
    const [editing, setEditing] = useState(false);
    const [addBool, setAddBool] = useState(false);
    const [addVar, setAddVar] = useState(null);
    const [deleteBool, setDeleteBool] = useState(false);
    
    //set up headers
    let headers =[];
    const specIterator = props.specs.values();
    for(const v of specIterator){
        headers.push(v)
    }
    const setMap = (param, editparam) => {
        setGear(param);
        setEditGearVar(editparam);
    }

    useEffect(()=>{
        let row = [];
        let edits = [];
        for(let i = 0; i < props.gear.length; i++){
            row[i] = props.gear[i].map(g => <td className="is-size-6" key={g}>{g}</td>);
            edits[i] = props.gear[i].map(g => <td className="{'comp' + ${i}} is-size-6" key={g+1}><input placeholder={g}/></td>)
        }
        // edits.forEach(arr => arr.push(<td><Button key={arr.length} onClick={saveEdits} 
        //     className="button is-small is-primary">
                // Save</Button></td>));
        let gearArr = row.map(r => <tr key={Math.random()*26}>{r}</tr>);
        let editArr = edits.map(r => <tr key={Math.random()*47}>{r}</tr>);
        setMap(gearArr, editArr);
    },[props.gear, props.mostRecent]);
    
    const saveEdits = (e) => {
       console.log(ReactDOM.findDOMNode(e.target));

    }

    const addGear = () => {
        setAddBool(!addBool);
        let temp = headers.map(h => <td key={h + ' '}><input id={h} placeholder={h}/></td>);
        setAddVar(temp);
    }

    const deleteCloset = async () => {
        let tempIds = props.closetIds.filter(i => i !== parseInt(props.cId));
       let result = await axios({method: 'put',
                                url: 'https://virtual-gear-closet.herokuapp.com/users' + props.owner,
                                data:{
                                    email: props.email,
                                    name: props.ownerName,
                                    password: props.password,
                                    closets: tempIds
                                }
                                });
        if(result.data === props.owner){
            let r2 = await axios({method: 'delete',
                                url: 'https://virtual-gear-closet.herokuapp.com/closets' + props.cId
                                });
            if(r2.data){
                props.setClosetIds(tempIds);
            }
        }
    }

    

    const saveGear = async () => {
        let saveArr = [];
        headers.forEach(h => saveArr.push(document.getElementById(h).value));
        let changeBool = false;
        saveArr.forEach(g => {
            if(g !== ''){
                changeBool = true;
            }    
        });
        if(changeBool){

        props.gear.push(saveArr);
            let result = await axios ({method: 'put',
                                    url: 'https://virtual-gear-closet.herokuapp.com/closets' + props.cId,
                                    data: {
                                        "name": props.name,
                                        "owner": props.owner,
                                        "specs": props.specs,
                                        "gear": props.gear
                                    }    
                                });
            if(result.status === 200){
                let result = await axios({method: 'get',
                                            url: 'https://virtual-gear-closet.herokuapp.com/closets' + props.cId});
                headers.forEach(h => document.getElementById(h).value ='');
                props.setMostRecent(result.data);
            }
        }
    }

    return(    
        
    <Container className="table-container my-5 closetDiv has-background-primary-light">
        {!deleteBool && <h2 className="has-text-bold">{props.name}</h2>}
        {deleteBool && (<>
                        <><h2 className="has-text-bold" >Are you sure you want to delete {props.name}?</h2></>
                        <Container className="buttons are-small is-centered mx-3">
                            <Button onClick={deleteCloset} className="button is-success" >Yes, delete {props.name}</Button>
                            <Button onClick={()=>setDeleteBool(false)} className="button is-small is-danger" >No, take me back to safety</Button> 
                        </Container>
                        </> )}
                
        <table className="table is-striped is-fullwidth">
            <tbody>   
                <tr key="headers">
                    {headers.map((h) => <th key={h}>{h}</th>)}
                </tr>
                {!editing && gear}
                {editing && editGearVar}
                {addBool && <tr>{addVar}<td><Button onClick={saveGear} className="button is-small is-primary">Save</Button></td></tr>}
            </tbody>
        </table>
        <Container className="buttons are-normal is-centered" >
            <Button onClick={addGear} className="button is-success mx-2" >{!addBool ? "Add Gear" : "Done Adding"}</Button>
            <Button onClick={() => setEditing(!editing)} className="button is-primary mx-2" >Edit Gear</Button>
            <Button onClick={() => setDeleteBool(!deleteBool)} className="button is-danger mx-2" >{deleteBool ? "Cancel" : "Delete Closet"}</Button>
        </Container>
    </Container>)

    

    }