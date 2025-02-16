import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";

const PollDetail = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = () => {
      fetch(`https://poll-voting-backend.vercel.app/polls/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPoll(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching poll:", err);
          setLoading(false);
        });
    };
    fetchPoll();

    const interval = setInterval(fetchPoll, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const vote = () => {
    if (selectedOption === null) return;

    fetch(`https://poll-voting-backend.vercel.app/polls/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionIndex: selectedOption }),
    })
      .then((res) => res.json())
      .then((updatedPoll) => setPoll(updatedPoll));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!poll) return <p className="text-center">Poll not found.</p>;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>{poll.question}</h2>
        <ul className="list-group">
          {poll.options.map((option, index) => (
            <li
              key={option._id}
              className={`list-group-item ${
                selectedOption === index ? "active" : ""
              }`}
              onClick={() => setSelectedOption(index)}
              style={{ cursor: "pointer" }}
            >
              {option.text} ({option.votes} votes)
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary mt-3"
          onClick={vote}
          disabled={selectedOption === null}
        >
          Vote
        </button>
        <div className="my-3">
          <Link to="/" className="" style={{ textDecoration: "none" }}>
            🗳️ back to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PollDetail;
