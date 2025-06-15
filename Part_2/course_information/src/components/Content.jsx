import Part from "./Part"

const Content = ({ courses }) => {
    return (
        <div>
            {courses.map(course => <Part key={course.id} name={course.name} exercises={course.exercises} />)}
        </div>
    )
}

export default Content