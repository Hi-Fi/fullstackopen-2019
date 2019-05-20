import React from 'react' 

const Header = ({course}) => (
    <h1>{course.name}</h1>
)

const Content = (props) => (
    props.parts.map ( part => 
        <Part part={part.name} exercise={part.exercises} key={part.id}/>
    )
)

const Part = (props) => (
    <p>
        {props.part} {props.exercise}
    </p>
)

const Total = ({parts}) => {
    let exercise_count = parts.reduce ( (exercise_count, current_part) => (
        exercise_count+current_part.exercises 
    ), 0)
    return (
        <p>yhteensä {exercise_count} tehtävää</p>
    )
}

const Course = ({course}) => {
        return (
            <div>
                <Header course={course} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
}

export default Course