const Header = ({name}) => <h2>{name}</h2>

const Parts = ({ name, exercises}) => <p>{name}: {exercises}</p>

const Content = ({ parts }) => parts.map(({name, exercises, id}) => 
<Parts key={id} name={name} exercises={exercises}/> )

const TotalExercices = ({ parts }) => {
    const sum = (val, part) => val + part.exercises
    const totalExercices = parts.reduce(sum, 0)
    return (
      <p><b>Total of {totalExercices} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
     <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <TotalExercices parts={course.parts} />
    </>
    )
}

const Courses = ({courses}) => courses.map(course =>
  <Course key={course.id} course={course} />)

const Courseinfo = () => {
    const courses = [
      {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div className="container">
      <Courses courses={courses}/>
    </div>
  )
}

export default Courseinfo