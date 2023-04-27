import { useState, useEffect } from 'react'
import phonebookService from '../services/phonebook'

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
                    <button className='add' type='submit' >add</button>
                </div>
            </form>
        )
    }

const Person = ( { name, number, deleteClickHandler } ) => {
return(
    <li>
        {name} - {number}
        <button className='btn' onClick={deleteClickHandler}>Delete</button>
    </li>
)}

const Persons = ( {showAll, deletePers} ) => {
 
    return (
        <ul>
            {showAll.map(person => 
            <Person key={person.id} name={person.name} 
            number={person.number} 
            deleteClickHandler={() => deletePers(person.id, person.name)}/>)}
        </ul>
    )
} 

const Section = ( {title, children} ) => {
    return(
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

const Notification = ({ message, variant}) => {
    if (message === null) {
        return null
    }
    return (
        <div className={`notification ${variant}`} >
            {message}
        </div>
    )
}

const Phonebook = () => {
    const [persons, setPersons] = useState([])
    const [newName, setName] = useState('')
    const [newNumber, setNumber] =useState('')
    const [showAll, setShowAll] = useState(persons)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationVariant, setNotificationVariant] = useState('success')

    useEffect(() => {
        phonebookService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setShowAll(initialPersons)
            })
    }, [])  

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const contact = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase())
                const changeNumber = { ...contact, number: newNumber}
                
                phonebookService
                    .update(contact.id, changeNumber)
                    .then(newPerson => {
                        setPersons(persons.map(person => person.id !== contact.id ? person : newPerson))
                        setShowAll(persons.map(person => person.id !== contact.id ? person : newPerson))
                        setName('')
                        setNumber('')
                        setNotificationMessage(
                           `${newPerson.name}'s number has been update` 
                        )
                        setNotificationVariant('success')
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                    })
                    .catch( error => {
                        setNotificationVariant('error')
                        setNotificationMessage(
                            `Information of ${newName} has already been removed from server`
                        )                        
                        setTimeout(() => {
                            setNotificationMessage(null)
                        }, 5000)
                        setPersons(persons.filter(person => person.name !== newName ))
                        setShowAll(persons.filter(person => person.name !== newName ))
                    })
            } else {
                setName('')
                setNumber('')
             }

        } else {  
            const personObject = {
                name: newName,
                number: newNumber,
            }
            phonebookService
                .create(personObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    setShowAll(persons.concat(newPerson))
                    setName('')
                    setNumber('')
                    setNotificationMessage(
                        `${newPerson.name} has been add` 
                     )
                     setNotificationVariant('success')
                     setTimeout(() => {
                         setNotificationMessage(null)
                     }, 5000)
            })
        }
    }

    const deletePers = (id, name) => {
        if(window.confirm(`Delete ${name} ?`) === true) {
            phonebookService
            .deletePers(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id ))
                setShowAll(persons.filter(person => person.id !== id ))
                setNotificationMessage(
                    `${name}'s information has been delete` 
                 )
                 setNotificationVariant('success')
                 setTimeout(() => {
                     setNotificationMessage(null)
                 }, 5000)
            })
            .catch( error => {
                setNotificationVariant('error')
                setNotificationMessage(
                    `Information of ${name} has already been removed from server`
                )
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== id ))
                setShowAll(persons.filter(person => person.id !== id ))
            })
    } else { return }
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
        <div className='container'>
            <Section title={'Phonebook'}>
                <Notification message={notificationMessage} variant={notificationVariant}/>
                <Filter handleFilter={handleFilter}/>
            </Section>
            <Section title={'Add a new contact'} >
                <PersonForm addPerson={addPerson} newName={newName}
                handlePersonChange={handlePersonChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange}/>
            </Section>
            <Section title={'Numbers'}>
               <Persons showAll={showAll} deletePers={deletePers} />
            </Section>
        </div>
    )
}

export default Phonebook