import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Section = ( {title, children} ) => {
    return(
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    )
}


const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setName] = useState('')
    const [newNumber, setNumber] =useState('')
    const [showAll, setShowAll] = useState(persons)

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
                setShowAll(response.data)
            })
    }, [])  

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
            <Section title={'Phonebook'}>
                <Filter handleFilter={handleFilter}/>
            </Section>
            <Section title={'Add a new contact'} >
                <PersonForm addPerson={addPerson} newName={newName}
                handlePersonChange={handlePersonChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange}/>
            </Section>
            <Section title={'Numbers'}>
               <Persons showAll={showAll} />
            </Section>
        </>
    )
}

export default Phonebook