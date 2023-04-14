import { useState } from 'react'

const Filter = ( {handleFilter} ) => {
    return (
        <form>
            <div>
                Filter shown with <input
                onChange={handleFilter}
                />
            </div>
        </form>
    )
}

const PersonForm = ( {addPerson, newName, handlePersonChange, 
    newNumber, handleNumberChange} ) => {
        return (
            <form onSubmit={addPerson}>
                <div>
                    Name: <input
                    value={newName}
                    onChange={handlePersonChange} 
                    />
                </div>
                <p></p>
                <div>
                    Number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                    />
                </div>
                <p></p>
                <div>
                    <button type='submit' >add</button>
                </div>
            </form>
        )
    }

const Person = ( { name, number} ) => <p>{name} - {number}</p>

const Persons = ( {showAll} ) => showAll.map(person => 
<Person key={person.id} name={person.name} number={person.number}/>) 

const Phonebook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setName] = useState('')
    const [newNumber, setNumber] =useState('')
    const [showAll, setShowAll] = useState(persons)

    const addPerson = (event) => {
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
        alert(newName + ' is already added you phonebook')
        setName('')
        setNumber('')
    } else {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        setPersons(persons.concat(personObject))
        setShowAll(persons.concat(personObject))
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

   const handleFilter = (event) => {
    let word = event.target.value.toLowerCase()
    setShowAll(persons.filter(person => person.name.toLowerCase().includes(word)))
   }

    return(
        <>
            <h2>Phonebook</h2>
            <Filter handleFilter={handleFilter}/>
            <h2>Add a new contact</h2>
            <PersonForm addPerson={addPerson} newName={newName}
            handlePersonChange={handlePersonChange} newNumber={newNumber}
            handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons showAll={showAll} />
        </>
    )
}

export default Phonebook