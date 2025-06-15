import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
    return (
        <div>
            <div>
                <Header title={courses.name} />
                <Content courses={courses.parts} />
                <Total parts={courses.parts}/>
            </div>
        </div>
    );
}

export default Course;