import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
 
export default function NewCloset(props){

    return(
        <Container className="newClosetContainer">
            <form className="is-primary">
                <div className="form-group">
                    <input type='text' placeholder='CLOSET NAME' />
                </div>
                <div className="form-group">
                    <p>Select what fields you'd like to include in your closet</p>
                    <div className="columns is-multiline">
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="brand"/><label>Brand</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="grams"/><label>Weight (grams)</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="ounces"/><label>Weight (ounces)</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="color"/><label>Color</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="date"/><label>Purchase Date</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="price"/><label>Price</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="length"/><label>Length</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="size"/><label>Size</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="material"/><label>Material</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="sub"/><label>Sub Category</label>
                        </div>
                        <div className="column is-one-fifth" >
                            <input type="checkbox" value="quantity"/><label>Quantity</label>
                        </div>
                        <div className="column is-two-fifths">
                            <input type="text" placeholder="Custom Field One"/>
                        </div>
                        <div className="column is-two-fifths">
                            <input type="text" placeholder="Custom Field Two"/>
                        </div>
                    </div>
                    <Container className="columns"> 
                        <Button className="button column is-two-fifth is-primary">Go!</Button>
                        <div className="column is-one-fifth"></div>
                        <Button className="button column is-two-fifth is-danger" onClick={props.generateCloset}>Cancel</Button>
                    </Container>
                </div>
                
            </form>
        </Container>
    );
}