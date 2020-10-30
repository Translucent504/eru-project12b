import './App.css';
import { useEffect, useState } from 'react'
import Contact from './components/Contact';

function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    (async () => {
      const result = await fetch('/.netlify/functions/crud', { method: "GET" })
      const t2 = await result.json()
      setContacts(t2)
    })()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/.netlify/functions/crud', {
      method: "POST",
      body: JSON.stringify({
        name,
        phone
      })
    }).then(v => console.log(v))
  }

  const updateContact = (oldContact, newContact) => {

  }

  const deleteContact = (name) => {
    
  }
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input value={name} onChange={({ target }) => setName(target.value)} type="text" id="name" />
        <label htmlFor="phone">Phone:</label>
        <input value={phone} onChange={({ target }) => setPhone(target.value)} type="text" id="phone" />
        <button type="submit">Create</button>
      </form>
      {contacts.map(c => (
        <Contact
          contactInfo={c}
          key={c.name + c.phone}
          handleEdit={updateContact}
          handleDelete={deleteContact} />
      ))}

    </div>
  );
}

export default App;
