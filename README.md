🗳️ Poll Voting System (Frontend)
A React + Vite app with Bootstrap styling to create and vote on polls in real-time.

🚀 Features
Create polls with multiple options
Vote on polls
View poll results in real-time (auto-refresh every 5 seconds)

📡 API Endpoints
1️⃣ Get All Polls
Endpoint: GET /polls
Description: Fetch all polls.
2️⃣ Get a Single Poll
Endpoint: GET /polls/:id
Description: Fetch poll details by ID.
3️⃣ Create a Poll
Endpoint: POST /polls
Description: Create a new poll.
4️⃣ Vote on a Poll
Endpoint: POST /polls/:id/vote
Description: Vote for an option in a poll.


🗄️ Database Schema (MongoDB)
const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options:
  [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 }
    }
  ]
});


🛠 Installation & Setup
git clone https://github.com/your-username/poll-voting-frontend.git
cd poll-voting-frontend
npm install(this will install all the dependencies)
npm run dev(this will start the development server on localhost:5173)
