import React, {useState} from 'react';
import {Container, Button} from 'react-bootstrap';
import Gear from './Gear.js';
import 'bulma/css/bulma.css';

export default function Closet (props) {

    const [addGear, setAddGear] = useState(false);
    const [deleteCloset, setDeleteCloset] = useState(false);

    const toggleGear = () => {
        setAddGear(!addGear);
    }

    const toggleDelete = () => {
        setDeleteCloset(!deleteCloset);
    }

    //set up headers
    let headers =[];
    const specIterator = props.specs.values();
    for(const v of specIterator){
        headers.push(v)
    }

    let gearArr=[];
    for(const g in props.gear){
        gearArr.push(<Gear key={props.gear[g].name} gear={props.gear[g]}/>); 
    }

    const renderInput = () => {
        let arr = [];
        for(const s in props.specs){
            arr.push(<td><input key={props.specs[s]} placeholder={props.specs[s]}/></td>)
        }
        return (
            <tr>
                {arr}
            </tr>
        );
    }

    return(    
    <Container className="table-container closetDiv has-background-primary-light">
        <h2 className="has-text-bold">{props.name}</h2>

        {deleteCloset && (<><h3>Are you sure you want to delete this closet?</h3>
        <br/>
        <div className="buttons has-addons is-centered">
        <Button className="button mx-2 is-primary">Yes, delete</Button>
        <Button onClick={toggleDelete} className="button mx-2 is-danger">No, go back</Button>
        </div></>)}
        
        <table className="table is-striped is-fullwidth">
            <tbody>   
                <tr>
                    {headers.map((h) => <th key={h}>{h}</th>)}
                </tr>
                {gearArr}
                {addGear && renderInput()}
            </tbody>
        </table>
        <Container className="is-grouped ir-right buttons has-addons is-right">
            <Button onClick={toggleGear} className="button is-small mx-3">{addGear ? "Save" : "Add Gear"}</Button>
            <Button className="button is-small mx-3">Edit</Button>
            <Button onClick={toggleDelete} className="button is-small mx-3">Delete Closet</Button>
        </Container>
    </Container>)

    

}
