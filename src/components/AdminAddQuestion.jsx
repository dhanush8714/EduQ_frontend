import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../utils/api";

export default function AdminAddQuestion() {
  const { user } = useAuth();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [category, setCategory] = useState("HTML");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!question || options.some((o) => !o)) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          question,
          options,
          correctAnswer,
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Question added successfully ✅");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer(0);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="bg-white max-w-md mx-auto p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Admin – Add Question
      </h2>

      {message && (
        <p className="mb-3 text-sm text-blue-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="w-full mb-3 p-2 border rounded"
        />

        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
            placeholder={`Option ${i + 1}`}
            className="w-full mb-2 p-2 border rounded"
          />
        ))}

        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value={0}>Correct: Option 1</option>
          <option value={1}>Correct: Option 2</option>
          <option value={2}>Correct: Option 3</option>
          <option value={3}>Correct: Option 4</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option>HTML</option>
          <option>JavaScript</option>
          <option>React</option>
          <option>C++</option>
          <option>Python</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer">
          Add Question
        </button>
      </form>
    </div>
  );
}
