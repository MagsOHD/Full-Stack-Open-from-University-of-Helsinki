import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
    return (
        <div>
            <div>
                {
                    courses.map(course => (
                        <div key={course.id}>
                            <Header title={course.name} />
                            <Content courses={course.parts} />
                            <Total parts={course.parts} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Course;