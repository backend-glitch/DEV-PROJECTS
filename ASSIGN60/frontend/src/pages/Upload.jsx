import { useState } from "react";
import API from "../connections/axios.js";


const Upload = () =>  {

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");


  const handleUpload = async () => {

    if (!file) {
  alert("Please select a PDF first");
  return;
}

//   console.log("Selected file:", file);

  const formData = new FormData();
  formData.append("pdf", file);

  const res = await API.post("/upload", formData);
   console.log(res);

  setText(res.data.data);
};



  return (
    <div className="p-6">
     <input
  type="file"
  accept=".pdf"
  onChange={(e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }}
/>

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 ml-2"
      >
        Upload
      </button>

      <pre className="mt-6 whitespace-pre-wrap">
        {text}
      </pre>
    </div>
  );
}
export default Upload;