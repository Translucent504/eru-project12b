import './App.css';
import { useEffect, useState } from 'react'
import Contact from './components/Contact';

function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [contacts, setContacts] = useState([])

  const refreshContacts = async () => {
    const result = await fetch('/.netlify/functions/crud', { method: "GET" })
    const t2 = await result.json()
    setContacts(t2)
  }

  useEffect(() => {
    refreshContacts()
  }, [])



  const handleSubmit = (e) => {
    e.preventDefault()
    setName('')
    setPhone('')
    fetch('/.netlify/functions/crud', {
      method: "POST",
      body: JSON.stringify({
        name,
        phone
      })
    }).then(() => refreshContacts())
  }

  const updateContact = (contactId, newContact) => {
    fetch('/.netlify/functions/crud', {
      method: "PUT", body: JSON.stringify({
        id: contactId,
        data: {
          ...newContact
        }
      })
    })
  }

  const deleteContact = (contactId) => {
    fetch('/.netlify/functions/crud', { method: "DELETE", body: contactId }).then(() => {
      setContacts(contacts => contacts.filter(c => c.ref['@ref'].id !== contactId))
    })
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
          key={c.ref['@ref'].id}
          handleEdit={updateContact}
          handleDelete={deleteContact} />
      ))}

    </div>
  );
}

export default App;
