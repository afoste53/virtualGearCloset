import React from 'react';
import 'bulma/css/bulma.css';

export default function Gear (props) {
    let k = Object.keys(props.gear);
    let row = [];
    k.forEach(k => {
        row.push(props.gear[k]);
    });
    

    return (
        <tr key={props.gear.name}>
            {row.map((d)=>{return <td>{d}</td>})}
        </tr>
    );
}