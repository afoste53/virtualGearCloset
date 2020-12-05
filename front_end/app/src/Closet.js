import React, {useEffect, useState, useCallback} from 'react';
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

    const setUp = useCallback((name) => {
        if(!props.names.includes(name) ){
            let temp = props.names;
            if(!temp.includes(name)){
                temp.push(name);
                props.setNames(temp);
            }
        }
    }, [props]);

    
    const updateGear = useCallback(async(arr) =>{
        let res = axios({method: 'put',
                        url: 'https://virtual-gc.herokuapp.com/closets' + props.cId,
                        data: {
                            owner: props.owner,
                            name: props.name,
                            specs: props.specs,
                            gear: arr
                        }
                    });
        console.log(res);
    },[props]);


    const deleteIndividual = useCallback((index) => {
        let temp = [];
        for(let i = 0; i < props.gear.length; i++){
            i !== index && temp.push(props.gear[i]);
        }
        let tObjs = props.closetObjs;
        tObjs[props.cId].gear = temp;
        props.setClosetObjs(tObjs);
        props.setMostRecent(!props.mostRecent);
        updateGear(temp);

    },[props, updateGear]);

    // const saveIndividual = useCallback((index) => {
    //     let newProps = [];
    //     console.log(index);
    //     //editGearVar[index].props.children[0].forEach(c => newProps.push(c.props.value));
    //     //editGearVar[index].props.children[0].forEach(c => console.log(c.props));
    //     let temp = [];
    //     for(let i = 0; i < props.gear.length; i++){
    //         if(i !== index){
    //             temp.push(props.gear[i]);
    //         }else{
    //            temp.push(newProps);
    //         }
    //     }
    //     console.log(temp);
    // }, [props])

    // const addData = (event) => {
    //     console.log(event.target);

    // }

    useEffect(()=>{
        let row = [];
        let edits = [];
        for(let i = 0; i < props.gear.length; i++){
            row[i] = props.gear[i].map(g => <td className="is-size-6" key={parseInt(g.cId)+i}>{g}</td>);
            edits[i] = props.gear[i].map(g => <td data={g} className="mx-6 is-size-6" key={g.cId + 390}>{g}</td>)
            setUp(props.gear[i][0]);           
        }
        

        let gearArr = row.map(r => <tr key={Math.random(27)*26}>{r}</tr>);
        let editArr = [];
        for(let i = 0; i< edits.length; i++){
            editArr[i] = <tr id={i} key={i*Math.random()}>
                            {edits[i]}  
                            <td><Button onClick={()=>deleteIndividual(i)}className="button is-small is-danger">Delete Item</Button></td>
                           </tr>;
        }
        setMap(gearArr, editArr);
    },[props.gear, props.mostRecent, deleteIndividual, setUp]);
    
    const saveChanges = () => {
        for(let i = 0; i < props.gear.length; i++){

        }
        setEditing(!editing);
    }

    const addGear = () => {
        setAddBool(!addBool);
        let temp = headers.map(h => <td key={h + ' '}><input id={h} placeholder={h}/></td>);
        setAddVar(temp);
    }

    const deleteCloset = async () => {
        let tempIds = props.closetIds.filter(i => i !== parseInt(props.cId));
       let result = await axios({method: 'put',
                                url: 'https://virtual-gc.herokuapp.com/users' + props.owner,
                                data:{
                                    email: props.email,
                                    name: props.ownerName,
                                    password: props.password,
                                    closets: tempIds
                                }
                                });
        if(result.data === props.owner){
            let r2 = await axios({method: 'delete',
                                url: 'https://virtual-gc.herokuapp.com/closets' + props.cId
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
                                    url: 'https://virtual-gc.herokuapp.com/closets' + props.cId,
                                    data: {
                                        "name": props.name,
                                        "owner": props.owner,
                                        "specs": props.specs,
                                        "gear": props.gear
                                    }
                                });
            if(result.status === 200){
                let result = await axios({method: 'get',
                                            url: 'https://virtual-gc.herokuapp.com/closets' + props.cId
                                            });
                headers.forEach(h => document.getElementById(h).value ='');
                props.setMostRecent(result.data);
            }
        }
    }

    const editSetUp = () =>{
        setAddBool(false);
        setEditing(!editing);
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
        {!editing && (<Container className="buttons are-normal is-centered" >
            <Button onClick={addGear} className="button is-success mx-2" >{!addBool ? "Add Gear" : "Done Adding"}</Button>
            <Button onClick={editSetUp} className="button is-primary mx-2" >Edit Gear</Button>
            <Button onClick={() => setDeleteBool(!deleteBool)} className="button is-danger mx-2" >{deleteBool ? "Cancel" : "Delete Closet"}</Button>
        </Container>)}
        {editing && (<Container className="buttons are-normal is-centered">
                            <Button onClick={saveChanges} className="button is-success">Save Changes</Button>
                    </Container>)}
    </Container>)
}