import { useState } from "react";

export default function JournalForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(content);

    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-ui-600 rounded-xl p-4"
    >
      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        placeholder="What did you do today?"
        className="w-full border border-ui-600 p-3 rounded"
        rows={5}
      />

      <button
        className="mt-3 px-4 py-2 bg-ui-500 hover:bg-ui-600 text-white rounded"
      >
        Save Entry
      </button>
    </form>
  );
}