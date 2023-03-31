const Header = ({name}) => <h2>{name}</h2>

const Parts = ({ name, exercises}) => <p>{name}: {exercises}</p>

const Content = ({ parts }) => parts.map(({name, exercises, id}) => 
<Parts key={id} name={name} exercises={exercises}/> )

const Course = ({ course }) => {
    return (
     <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
    </>
    )
}

const Courseinfo = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }

      return <Course course={course}/>
}

export default Courseinfo