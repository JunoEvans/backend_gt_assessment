# backend_gt_assessment
Backend GT Skills Assessment Submission
# Task Management API (Simple Version)

Very basic REST API for creating and managing tasks with assigner/assignee rules.

## Features
- Create task (assign to someone else)
- List all tasks
- Update title/priority (only assigner)
- Update status (only assignee)
- Unassign task (only assigner)
- Delete task (only assigner)

## Technologies
- Node.js
- Express

## Setup Instructions

1. Make sure you have Node.js installed (v18+ recommended)  
   → https://nodejs.org

2. Open terminal in this folder and run:
   ```bash
   npm init -y
   npm install express
How to Run the Project
node index.js
→ You will see:
🎉 Server is running! Open: http://localhost:3000
Keep the terminal open.
Example API Requests
Use Postman or curl. Always add header:
x-user-id: 1 (or 2, etc.)
1. Create Task (as user 1 assigning to user 2)
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "x-user-id: 1" \
  -d '{"title":"Finish report","priority":"high","assignedTo":2}'
2. Get All Tasks
curl http://localhost:3000/tasks -H "x-user-id: 1"
3. Update Status (as the assigned user – id 2)
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "x-user-id: 2" \
  -d '{"status":"in-progress"}'
(Change 1 to your real task ID)
