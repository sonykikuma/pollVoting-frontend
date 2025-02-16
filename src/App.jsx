import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Header from "./components/Header";

function App() {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  useEffect(() => {
    const fetchPolls = () => {
      fetch("https://poll-voting-backend.vercel.app/polls")
        .then((res) => res.json())
        .then((data) => setPolls(data));
    };
    fetchPolls();
    const interval = setInterval(fetchPolls, 5000);

    return () => clearInterval(interval);
  }, []);

  const PollHandler = (event) => {
    event.preventDefault();

    const filteredOptions = options.filter((opt) => opt.trim() !== "");

    if (!question.trim() || filteredOptions.length < 2) {
      alert("Please enter a question and at least two options.");
      return;
    }

    fetch("https://poll-voting-backend.vercel.app/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options }),
    })
      .then((res) => res.json())
      .then((newPoll) => {
        setPolls([...polls, newPoll]);
        setQuestion("");
        setOptions(["", ""]);
      })
      .catch((err) => console.error("Error creating poll:", err));
  };
  console.log(polls);
  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Poll Voting</h2>
        <form onSubmit={PollHandler}>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {options.map((opt, i) => (
            <div className="mb-3" key={i}>
              <label className="form-label">Option {i + 1}</label>
              <input
                type="text"
                className="form-control"
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[i] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => setOptions([...options, ""])}
          >
            Add Option
          </button>

          <button type="submit" className="btn btn-primary">
            Create Poll
          </button>
        </form>

        <h2 className="mt-4">Available Polls</h2>
        <ul className="list-group">
          {polls.map((poll) => (
            <li className="list-group-item" key={poll._id}>
              <a href={`/poll/${poll._id}`} className="text-decoration-none">
                {poll.question}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
