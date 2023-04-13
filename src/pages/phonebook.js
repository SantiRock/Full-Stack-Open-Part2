import { useState } from 'react'


const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567'}
    ])

    const [newName, setName] = useState('');
    const [newNumber, setNumber] =useState('');

    const addPerson = (event) => {
    if (persons.some(person => person.name === newName)) {
        alert(newName + ' is already added you phonebook')
        setName('')
        setNumber('')
    } else {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObject))
        setName('')
        setNumber('')
        }
    }

   const handlePersonChange = (event) => {
    setName(event.target.value)
   }

   const handleNumberChange = (event) => {
    setNumber(event.target.value)
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
                    number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type='submit' >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => 
                <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Phonebook