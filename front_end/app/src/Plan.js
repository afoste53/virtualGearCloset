import React, {useState, useEffect} from 'react';
import {Container, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import 'bulma/css/bulma.css';
import './App.css';

export default function Plan(props){
    const [allGear, setAllGear] = useState([]);
    const [gearList, setGearList] = useState([]);
    const [searchResults, setSearchResults] = useState(allGear);
    const [tripDate, setTripDate] = useState(null);
    const [tripName, setTripName] = useState('');
    const [dateAlertBool, setDateAlert] = useState(false);
    const [headerVal, setHeaderVal] = useState(0);

    emailjs.init("user_wgxjtzvusqQ8LL70iBes3");

    const setUp = (t) =>{
        setAllGear(t);
    }

    const search = (event) => {
        setHeaderVal(0);
        let str = event.target.value.toLowerCase();
        let f = allGear.filter(g => g.toLowerCase().includes(str));
        setSearchResults(f);
        if(str === ''){
            setSearchResults([]);
        }else if(str !== '' && f.length === 0){
            setSearchResults(['No results - click to add to list anyways']);
        }
    }

    const addToList = (event) => {
        !gearList.includes(event.target.value) && setGearList((prev) => [...prev, event.target.value]);
    }

    const addNewClick = () => {
        let str = document.getElementById('searchBar').value;
        !gearList.includes(str) && setGearList((prev) => [...prev, str]);
    }

    const removeItem = (id) => {      
        let str = id[Object.keys(id)[0]];

        let t = gearList.filter(t => t!== str);
        setGearList(t);
    }

    const cleanUp = () => {
        document.getElementById('tripNameInput').value = '';
        document.getElementById('tripDateInput').value = '';
        document.getElementById('searchBar').value = '';
        setGearList([]);
        setTripName('');
        setTripDate(null);
        setSearchResults([]);
    }

    const doneClick = async (event) => {
        setHeaderVal(0);
        emailjs.init("user_wgxjtzvusqQ8LL70iBes3");
        if(tripDate === null ){
            setDateAlert(true);
            return;
        }

        let message = 'Things to include: \u000A';
        gearList.forEach(g => message += '\u2022' + g.toString() + '\u000A');

        let templateParams = {
                    'reply_to': 'virtualgearcloset@gmail.com',
                    'to_email': props.email,
                    'to_name': props.name,
                    'trip_name' : tripName,
                    'trip_date': tripDate,
                    'message': message
                }

        emailjs.send('default_service', 'trip_list_template', templateParams)
            .then(function(response) {
                cleanUp();
                setHeaderVal(1);
            }, function(error) {
                console.log('FAILED...', error);
                setHeaderVal(2);
        });

    }

    useEffect(()=>{
        let temp = [];
        for(let i = 0; i<props.closetObjs.length; i++){
            for(let j = 0; j<props.closetObjs[i].gear.length; j++){
                temp.push(props.closetObjs[i].gear[j][0]);
            }
        }
        setUp(temp);
    },[props.closetObjs]);

    const setUpDate = (event) => {
        setHeaderVal(0);
        dateAlertBool && setDateAlert(false);
        setTripDate(event.target.value);
    }

    const setUpName = (event) => {
        setHeaderVal(0);
        setTripName(event.target.value);
    }

    return(<Container className="white-background scrollable">
            {props.closetObjs === undefined && <h3>Loading...</h3>}
            <Container className="m-4 has-text-centered">{headerVal === 1 ? <h3 className="has-text-success">Success - check your email for your packing list!</h3> 
                            : headerVal === 2 ? <h3 className="has-text-danger">Something went wront....try again!</h3> 
                            : null}</Container>
            <Container className="columns ">
            
                <Container className="column is-3">
                    <Container>
                        <label className="m-6 is-size-5">Trip Name</label>
                        <br/>
                        <input id="tripNameInput" onChange={setUpName} type="text" placeholder="Trip Name"/>
                    </Container>
                    <br/>
                    <br/>
                    <br/>
                    <Container>
                        <label className="m-6 is-size-5">Trip Date</label>
                        <br/>
                        <input onChange={setUpDate} id="tripDateInput" type="date"/>
                        {dateAlertBool && <p className="has-text-danger">Must select a date</p>}
                    </Container>
                </Container>    
            
                <Container className="column is-6 m-1">
                    <Container>
                    <label className="is-size-5">Which gear items would you like to include?</label>
                    <br/>
                    <input id='searchBar' onChange={search} className="input is-medium" type="text" placeholder="Search for Gear to take by Name"/>
                    </Container>
                    <Container className="is-centered">
                        <ul id="searchResults">
                            {searchResults[0] === 'No results - click to add to list anyways' ? 
                                                    searchResults.map(s => <li className="my-1">
                                                        <Button value={s} onClick={addNewClick} 
                                                            className="button is-four-fifths is-small is-success is-light is-fullwidth">
                                                            {s}</Button></li>) :
                                                    searchResults.map(s => <li className="my-1">
                                                        <Button value={s} onClick={addToList} 
                                                            className="button is-four-fifths is-small is-success is-light is-fullwidth">
                                                            {s}</Button></li>)}
                        </ul>
                    </Container>
                </Container>

                <Container className="column is-3 m-1">
                    <p className="is-size-5">Things to Pack</p>
                    <ul id="toGo">
                        {gearList.map(g => <li id={g} className="columns has-text-weight-medium field has-addons is-size-5">
                                            <div  className="column is-three-fifths">
                                            <p>{g}</p>
                                            </div>
                                            <div className="column">
                                            <Button value="Cancel" onClick={()=>removeItem({g})}
                                                className="button is-small is-danger is-light">
                                                Cancel</Button>
                                            </div>    
                                            </li>)}
                    </ul>
                    <Button onClick={doneClick} className="button is-success is-fullwidth">Done!</Button>
                </Container>
            </Container>
           <br/>
        </Container>);
}