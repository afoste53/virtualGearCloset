import React from 'react';
import 'bulma/css/bulma.css';

export default function Gear (props) {
    let row = [];
    

    
    return (<tr>
            {console.log(row)}
            {row.map((d)=>{return <td key={d[0]}>{d}</td>})}
    </tr>);
}