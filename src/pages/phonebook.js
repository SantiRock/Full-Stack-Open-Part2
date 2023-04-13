import { useState } from 'react'


const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setName] = useState('');

   const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName
    }
    setPersons(persons.concat(personObject))
    setName('')
   }

   const handlePersonChange = (event) => {
    setName(event.target.value)
   }


    return(
        <>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                    value={newName}
                    onChange={handlePersonChange} 
                    />
                </div>
                <div>
                    <button type='submit' >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => 
                <p key={person.name}>{person.name}</p>)}
        </>
    )
}

export default Phonebook