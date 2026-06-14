import { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const Export = () => {

    
  const location = useLocation();
  const pdfRef = useRef();

  const {
    questions = [],
    answers = {},
    studentName = "",
    regNo = "",
    course = "",
    faculty = "",
    assignmentNo = "",
    pdfName = "",
  } = location.state || {};


const downloadPDF = () => {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });

  const pageHeight   = 297;
  const marginLeft   = 20;
  const marginBottom = 20;
  const contentWidth = 170;

  let y = 20;


  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - marginBottom) {
      pdf.addPage();
      y = 20;
    }
  };


  const drawText = (text, fontSize, fontStyle = "normal") => {
    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", fontStyle);
    const lines = pdf.splitTextToSize(String(text || ""), contentWidth);
    const lineH  = fontSize * 0.45;
    lines.forEach((line) => {
      checkPageBreak(lineH + 1);
      pdf.text(line, marginLeft, y);
      y += lineH + 1;
    });
  };

  pdf.setFontSize(20);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Name: ${studentName}`, marginLeft, y);
  y += 15;

  pdf.text(`Reg No: ${regNo}`, marginLeft, y);
  y += 15;

    pdf.text(`Course: ${course}`, marginLeft, y);
  y += 15;

  pdf.text(`Faculty: ${faculty}`, marginLeft, y);
  y += 15;

    pdf.text(`Assignment: ${assignmentNo}`, marginLeft, y);

  y += 200;


  questions.forEach((question, index) => {

   
    // checkPageBreak(8);
    // drawText(`Question ${index + 1}`, 11, "bold");
    // y += 2;

    // question text
    drawText(question, 11, "normal");
    y += 3;

    // answer text
    drawText(answers[index] || "", 11, "normal");
    y += 8;
  });

  pdf.save(`${pdfName}.pdf`);
};

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white">

<div className="flex justify-between mb-6">

    <h1 className="font-bold text-2xl">EXPORT SECTION</h1>
  <button
    onClick={downloadPDF}
    className="bg-green-600 text-white px-5 py-3 rounded-lg"
  >
    Export PDF
  </button>
</div>

<div ref={pdfRef}>
      <div className="ml-10 mb-8">
        <p>Name: {studentName}</p>
        <p>Registration No:{regNo}</p>
        <p>Course:{course}</p>
        <p>Faculty: {faculty}</p>
        <p>Assignment No:{assignmentNo}</p>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="mb-10">
       
          <p className="ml-10 whitespace-pre-wrap mt-2">
            {question}
          </p>

        

          <div className="ml-10 whitespace-pre-wrap mt-2">
            {answers[index]}
          </div>
        </div>
      ))}

    </div>
    </div>
  );
};

export default Export;