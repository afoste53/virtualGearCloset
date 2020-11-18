import React from 'react';
import 'bulma/css/bulma.css';

export default function Gear (props) {
    let r;
    
    props.specs!=undefined ? r=(<tr className="columns">
            <th className="gear column">{props.specs.spec[0]}</th>
            <th className="gear column">{props.specs.spec[1]}</th>
            <th className="gear column">{props.specs.spec[2]}</th>
        </tr>) : r= <tr></tr>;

    return r;
}