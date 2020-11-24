import React from 'react';

export default function EditGear (props){
    let k = Object.keys(props.gear);
    let row = [];
    k.forEach(k => {
        row.push(props.gear[k]);
    });
    
    
    return (
        <tr key={props.gear.name}>
            {row.map((d)=>{return <td key={d}><input placeHolder={d} /></td>})}
        </tr>
    );
}
