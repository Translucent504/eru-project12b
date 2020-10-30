import React, { useState } from 'react'

const Contact = ({ contactInfo, handleDelete, handleEdit }) => {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(contactInfo.data.name)
    const [phone, setPhone] = useState(contactInfo.data.phone)
    const edit = () => {
        if(editing){
            // fetch(update, {method:"PUT", body: JSON.stringify({name, phone})})
            console.log(`Contact info updated to ${name}, ${phone}`)
            handleEdit(contactInfo.ref['@ref'].id, {name, phone})
        }
        setEditing(e => !e)
    }
    
    return (
        <div>
            Name: <input disabled={!editing} onChange={({target}) => setName(target.value)} value={name}/>
            Phone: <input disabled={!editing} onChange={({target}) => setPhone(target.value)} value={phone}/>
            <button onClick={() => edit()}>{editing? "Save" : "Edit"}</button>
            <button onClick={() => handleDelete(contactInfo.ref['@ref'].id)}>Delete</button>
        </div>
    )
}

export default Contact
