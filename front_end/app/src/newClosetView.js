import React, {useState} from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import {Container, Button} from 'react-bootstrap';
import axios from 'axios';
 
export default function NewCloset(props){
    const [page, setPage] = useState(1);
    const [nameVar, setName] = useState('');
    const [checked, setChecked] = useState([]);
    const [alertText, setAlertText] = useState('');

    const handleSubmit = async () => {
        if(page===1){
            if(document.getElementById('nameInput').value !== ''){
                let keys = Object.keys(props.otherCloset);
                let names = [];
                for(const k in keys){ 
                    names.push(props.otherCloset[k].name);
                }
                if(names.includes(document.getElementById('nameInput').value)){   
                    setAlertText("You've already used that name - pick a new one");
                }else{
                    setName(document.getElementById('nameInput').value);
                    setPage((prev) => prev+1);
                }
                
            }else{
                setAlertText('Must enter a name');
            }
        }else if(page===2){
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
        
            setPage((prev) => prev+1);
        
        }else if(page===3){        
                //limited number of fields -> detailed and summary show the same thing   
                let result = await axios({method: 'post',
                                    url: 'http://localhost:3030/closets',
                                    data: {
                                        name: nameVar,
                                        owner: props.userId,
                                        specs: checked,
                                        gear: {}
                                    }
                                    });
                                    console.log(result.data.cId);
                                    let newCId = result.data.cId;
                    let newC = result.data;
                    props.setCloset((prev) =>  ({...prev, newCId: newC}));
                    console.log(props.userId);
                    console.log(props.email);
                    console.log(props.name);
                    console.log(props.password);
                    console.log(props.otherCloset);
                result = await axios({method: 'put',
                                    url: 'http://localhost:3030/users/' + props.userId,
                                    data: {
                                            "user": props.email,
                                            "name": props.name,
                                            "password": props.password,
                                            "closets": props.otherCloset
                                            }   
                                    });   

        
                                }
         
        
    }

    const goBack = () => {
        setPage(prev => prev-1);
    }

    const page1 = (<Container >
                        <label className="has-text-bold is-large">What do you want to name your closet? </label>
                        <input className="is-large" id="nameInput"/>
                        <h6 id="alert" className="is-large has-text-centered has-text-danger">{alertText}</h6>
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

    const page3 = (
                    <Container>
                        <p>Select your top three fields</p>
                        <small>Don't worry, they'll be included in the detailed view</small>
                        <Container className="columns is-multiline">
                            {checked.map(c => <div className="column"><input key={c} type="checkbox"/><label>{c}</label></div>)}
                        </Container>
                        <br/>
                    </Container>)
                    ;   

 

    return(
        <Container className="newClosetContainer">
            <form className="is-primary">
                {page === 1 ? page1 :  (page===2 ? page2 : page3 )}                
                
               
               <Container className="columns" id="buttons"> 
                    <Button className="button column is-one-fifth is-danger" onClick={props.generateCloset}>Cancel</Button>
                    <div className="column is-one-fifth"></div>
                    {page !== 1 ? <Button className="button column is-one-fifth is-warning" onClick={goBack}>Back</Button> : <div className="column is-one-fifth"></div>}
                    <div className="column is-one-fifth"></div>
                    <Button className="button column is-one-fifth is-primary" onClick={handleSubmit}>{page!==3 ? "Next!" : "Go!"}</Button>
                    <br/>
                </Container>
                
                   
               
                
                
            </form>
        </Container>
    );
}