import React, {useState}from 'react';
import {Container} from 'react-bootstrap';
import Gear from './Gear.js';
import 'bulma/css/bulma.css';

export default function DetailedCloset(props){

    const [gear, setGear] = useState();

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




    return(
    <Container className="table-container detailedCloset has-text-large has-background-primary-light">
        <h1 className="has-text-bold">{props.name}</h1>
        <table className="table is-striped is-fullwidth">
            <tbody>   
                <tr>
                    {headers.map((h) => <th key={h}>{h}</th>)}
                </tr>
                {gearArr}
            </tbody>
        </table>
    </Container>);
}