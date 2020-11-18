import React, {useState}from 'react';
import {Container} from 'react-bootstrap';
import Gear from './Gear.js';
import 'bulma/css/bulma.css';

export default function Closet (props) {
    const [editMode, setEditMode] = useState(false); 
    const [closetProperty, setClosetProperty] = useState({});
   

let headerSpec = {type: 'th',spec: ['Name', 'Weght','Price']};


    return(
    <Container className="closetDiv has-background-primary-light">
        <table>
            <tbody>
                <Gear specs={headerSpec} />
                <Gear />
                <Gear />
                <Gear />
                <Gear />           
            </tbody>
        </table>
    </Container>
    );

}
