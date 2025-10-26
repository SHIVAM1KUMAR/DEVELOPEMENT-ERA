import PropTypes from 'prop-types';                                                                            
function Student(props){
    return(
        <>
        <h1>Student Details</h1>
        <div className="student">
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Student: {props.isStudent ? "Yes" :"No"}</p>
        </div>
        </>
    );
}

Student.propTypes={
 name:PropTypes.string,
 age:PropTypes.number,
 isStudent:PropTypes.bool,
};

Student.defaultProps ={
    name:'Gueast',
    age:54,
    isStudent:false,
}
export default Student;