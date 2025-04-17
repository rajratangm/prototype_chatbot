✅ Steps to Run the Project (No Coding Skills Required)
⚠️ Make sure you’ve already tested these steps before sending to confirm all works smoothly.

🔧 Prerequisites
Tell your friend to install:

Docker Desktop (for Windows/Mac)

Follow the official install instructions

Once installed, open Docker Desktop and make sure it’s running.

📦 How to Run the App
Download the project folder
→ Either you send it via email, Google Drive, or OneDrive.
→ Make sure it includes:

frontend/ (React app)

backend/ (FastAPI app)

docker-compose.yml

All necessary Dockerfiles

Open a terminal or command prompt
(In the folder where you see docker-compose.yml)

Run this command:

bash
Copy
Edit
docker-compose up --build
🛠️ It may take a few minutes the first time.

🌐 How to Access the App
Once it finishes building and says something like:

arduino
Copy
Edit
VITE v5.x ready in xxx ms
➜  Local:   http://localhost:8080/
Open the browser and visit:

Frontend (React): http://localhost:8080

Backend (FastAPI): http://localhost:8000

✅ To Stop the App
In the terminal, press:

mathematica
Copy
Edit
Ctrl + C
Then run:

bash
Copy
Edit
docker-compose down
🧠 Quick Tips for Your Friend
No Python or Node.js is needed

No package installs or commands other than docker-compose up --build

Internet is only needed for the first Docker build