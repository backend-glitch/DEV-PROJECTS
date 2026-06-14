import { useLocation,Link,useNavigate } from "react-router-dom";
import { useState } from "react";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
const [regNo, setRegNo] = useState("");
const [course, setCourse] = useState("");
const [faculty, setFaculty] = useState("");
const [assignmentNo, setAssignmentNo] = useState("");
const [pdfName,setpdfName] = useState("");

  const {
    questions = [],
    answers = {},
  } = location.state || {};

  return (

    <>

 <button className="text-xl p-2 mt-3 ml-4 bg-blue-500 hover:bg-blue-600 rounded" onClick={() => 
    navigate("/export", {
  state: {
    questions,
    answers,
    studentName,
    regNo,
    course,
    faculty,
    assignmentNo,
    pdfName,
  },
})

 }>
    EXPORT
 </button>

      <h2 className="font-bold text-2xl ml-3 mt-4">My Details</h2>
 <div className="flex flex-col  border  rounded-lg mt-5 ml-5">
   
    <input
  type="text"
  placeholder="Student Name"
  value={studentName}
  onChange={(e) => setStudentName(e.target.value)}
/>

<input
  type="text"
  placeholder="Registration Number"
  value={regNo}
  onChange={(e) => setRegNo(e.target.value)}
/>

<input
  type="text"
  placeholder="Course"
  value={course}
  onChange={(e) => setCourse(e.target.value)}
/>

<input
  type="text"
  placeholder="Faculty"
  value={faculty}
  onChange={(e) => setFaculty(e.target.value)}
/>

<input
  type="text"
  placeholder="Assignment Number"
  value={assignmentNo}
  onChange={(e) => setAssignmentNo(e.target.value)}
/>

<input
  type="text"
  placeholder="PDF Name"
  value={pdfName}
  onChange={(e) => setpdfName(e.target.value)}
/>

</div>



    <div className="max-w-4xl mx-auto p-10">


      <h1 className="text-3xl font-bold mb-8">
        Assignment Preview
      </h1>

        <div className="border-2 border-gray-300 rounded-lg p-6 mb-10 border-none">
       

        <div className="grid grid-cols-1 gap-y-4">
          <p>
            <span className="font-semibold">Student Name:</span>{" "}
            {studentName}
          </p>

          <p>
            <span className="font-semibold">
              Registration No:
            </span>{" "}
            {regNo}
          </p>

          <p>
            <span className="font-semibold">Course:</span>{" "}
            {course}
          </p>

          <p>
            <span className="font-semibold">Faculty:</span>{" "}
            {faculty}
          </p>

          <p>
            <span className="font-semibold">
              Assignment No:
            </span>{" "}
            {assignmentNo}
          </p>

            <p>
            <span className="font-semibold">
              PDF Name :
            </span>{" "}
            {pdfName}
          </p>

        </div>
      </div>

      {questions.map((question, index) => (
        <div
          key={index}
          className="mb-10"
        >
          <h2 className="font-bold text-xl mb-3">
            Question {index + 1}
          </h2>

          <p className="whitespace-pre-wrap mb-4">
            {question}
          </p>

          <h3 className="font-semibold mb-2">
            Answer
          </h3>

          <div className="whitespace-pre-wrap border p-4 rounded-lg border-none">
            {answers[index]}
          </div>
        </div>
      ))}
    </div>

    </>
  );
};

export default Preview;