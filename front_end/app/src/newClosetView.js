import React, {useState, useEffect} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
 
export default function NewCloset(props){
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [checked, setChecked] = useState([]);

    useEffect(() => {

    }, [page]);
    
    const handleSubmit = () => {
        if(page===1){
            if(document.getElementById('nameInput').value != ''){
                setName(document.getElementById('nameInput').value);
                setPage(2);
            }else{
                document.getElementById('nameInput').placeholder = 'Must enter a name';
            }
            
            
        }else{
            const checkboxes = document.querySelectorAll(`input:checked`);
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            let custom1 = document.getElementById('custom1').value;
            let custom2 = document.getElementById('custom2').value;

            custom1 !== '' && values.push(custom1);
            custom2 !== '' && values.push(custom2);

            setChecked(values);
        }
    }

    const page1 = (<Container >
                        <label className="has-text-bold is-large">What do you want to name your closet? </label>
                        <input className="is-large" id="nameInput"/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        </Container>);

    const page2 = (
        <div className="form-group">
            <p>What fields would you like to include in your closet</p>
            <div className="columns is-multiline">
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
        </div>);
    
        
    return(
        <Container className="newClosetContainer">
            <form className="is-primary">
                {page === 1 ? page1 : page2}
                
                
               <Container className="columns" id="buttons"> 
                    <Button className="button column is-two-fifth is-primary" onClick={handleSubmit}>{page===1 ? "Next!" : "Go!"}</Button>
                    <div className="column is-one-fifth"></div>
                    <Button className="button column is-two-fifth is-danger" onClick={props.generateCloset}>Cancel</Button>
                </Container>
                
                
            </form>
        </Container>
    );
}