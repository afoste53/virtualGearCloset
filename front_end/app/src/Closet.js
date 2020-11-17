import React, {useState}from 'react';

export default function Closet () {
    const [editMode, setEditMode] = useState(false); 
    const [closetProps, setClosetProps] = useState({});
    /** 
     * 
     * {name: string, 
     *   email: string,
     *   gear: []}
     * 
     * 
     * useEffect -> get data from backend and render as 'closet'
     **/



    return(<div className="container is-max-desktop">
        <ul className="closet">
            
        </ul>



    </div>);

}
