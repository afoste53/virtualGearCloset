import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
import axios from 'axios';
 
export default function NewCloset(props){    
    const [nameAlert, setNameAlert] = useState(false);
    
    const handleCheckboxes = () => {
        const checkboxes = document.querySelectorAll(`input:checked`);
        let values = ["Name"];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
        let custom1 = document.getElementById('custom1').value;
        let custom2 = document.getElementById('custom2').value;

        custom1 !== '' && values.push(custom1);
        custom2 !== '' && values.push(custom2);

        return values;
    }

    const getName = () => {
        const name = document.getElementById('newName').value;
        if(name === ''){
            setNameAlert(true);
            return;
        }
        nameAlert && setNameAlert(false);
        return name;
    }

    const handleInput = () => {
        const newSpecs = handleCheckboxes();
        const newName = getName();
        if(newName != null){
            handleSubmit(newSpecs, newName);
        }
   }

   const handleSubmit = async (newSpecs, newName) => {
       let res1 = await axios({method: 'post',
                                url: 'http://localhost:3030/closets',
                                data: {'ownerId' : props.ownerId,
                                        'name' : newName,
                                        'specs' : newSpecs,
                                        "gear" : []
                                }
                            });
        if(res1.status === 200){
            props.newClosetId(res1.data.cId);
            props.setNewClosetBool(!props.newClosetBool);
        }
   }
    
   return (<Container className="noFriendsContainer">
    <Container className="my-3">
    <h6>What do  you want to call your closet?</h6>
        <input placeholder="Closet Name" id='newName'/>
        <br/>
        {nameAlert && <small className="has-text-danger">Must Select a name</small>}
    </Container>
    <Container className="my-3">
        <div className="form-group">
            <h6>What fields would you like to include in your closet</h6>
            <div className="columns is-multiline is-size-7 has-text-weight-medium">
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Brand"/><label>Brand</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Weight - Grams"/><label>Weight (grams)</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Weight - Ounces"/><label>Weight (ounces)</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Color"/><label>Color</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Date"/><label>Purchase Date</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Price"/><label>Price</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Length"/><label>Length</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Size"/><label>Size</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Material"/><label>Material</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Sub Category"/><label>Sub Category</label>
                </div>
                <div className="column is-one-fifth" >
                    <input type="checkbox" name="specs" value="Quantity"/><label>Quantity</label>
                </div>
                <div className="column is-two-fifths">
                    <input type="text" id="custom1" placeholder="Custom Field One"/>
                </div>
                <div className="column is-two-fifths">
                    <input type="text" id="custom2" placeholder="Custom Field Two"/>
                </div>
            </div>
        </div>
    </Container>
    <Container className="buttons are-small is-centered">
        <Button onClick={handleInput} className="button mx-4 is-success">Make my closet!</Button>
        <Button onClick={props.handleNewClosetClick} className="button mx-4 is-danger">Cancel</Button>
    </Container>    
</Container>)
    }

