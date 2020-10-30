import React, { useState } from 'react'

const Contact = ({ contactInfo, handleDelete }) => {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(contactInfo.name)
    const [phone, setPhone] = useState(contactInfo.phone)
    const handleEdit = () => {
        if(editing){
            // fetch(update, {method:"PUT", body: JSON.stringify({name, phone})})
            console.log(`Contact info updated to ${name}, ${phone}`)
        }
        setEditing(e => !e)
    }
    
    return (
        <div>
            Name: <input disabled={!editing} onChange={({target}) => setName(target.value)} value={name}/>
            Phone: <input disabled={!editing} onChange={({target}) => setPhone(target.value)} value={phone}/>
            <button onClick={() => handleEdit(name, phone)}>{editing? "Save" : "Edit"}</button>
            <button onClick={() => handleDelete(name)}>Delete</button>
        </div>
    )
}

export default Contact
