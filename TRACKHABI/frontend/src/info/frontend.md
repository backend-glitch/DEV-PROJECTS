1. Authentication System

Frontend files:

Login.jsx
Register.jsx
AuthContext.jsx
ProtectedRoute.jsx
APIs:
POST /auth/register
POST /auth/login
GET  /auth/me
Request Example:
{
  "email": "user@gmail.com",
  "password": "123456"
}
Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "email": "user@gmail.com"
  }
}
2. Habits System

Frontend usage:

HabitForm.jsx
Habits.jsx
TodayHabitCard.jsx
APIs:
GET    /habits
POST   /habits
PUT    /habits/:id
DELETE /habits/:id
Habit Model:
{
  "id": "1",
  "userId": "123",
  "title": "Go Gym",
  "category": "Health",
  "createdAt": "date"
}
3. Daily Tracking (VERY IMPORTANT)

Used in:

Dashboard
Weekly Grid
Heatmap
APIs:
POST /habits/:id/toggle
GET  /habits/:id/history
GET  /progress/today
Example:
{
  "date": "2026-06-06",
  "completed": true
}
4. Dashboard Data API

Frontend uses:

SummaryCards
ProgressRing
MorningMotivation
API:
GET /dashboard
Response:
{
  "totalHabits": 5,
  "completedToday": 3,
  "streak": 7,
  "completionRate": 60
}
5. Analytics / Stats APIs

Used in:

WeeklyBarChart
MonthlyBarChart
CategoryPieChart
HeatmapChart
APIs:
GET /stats/weekly
GET /stats/monthly
GET /stats/categories
GET /stats/heatmap
6. AI Features (Advanced but optional)

Components:

AIChat.jsx
AIWeeklyReport.jsx
HabitSuggestionModal.jsx
APIs:
POST /ai/chat
POST /ai/weekly-report
POST /ai/suggest-habits
Example:
{
  "message": "How can I improve consistency?"
}

👉 Backend will call:

OpenAI API
7. Weekly View

Used in:

Weekly.jsx
WeeklyGrid.jsx
API:
GET /weekly
⚙️ Backend Architecture (Based on Your UI)

Use:

Node.js
Express.js
MongoDB
📁 Folder Structure
backend/
│
├── controllers/
│   ├── authController.js
│   ├── habitController.js
│   ├── statsController.js
│   ├── aiController.js
│
├── models/
│   ├── User.js
│   ├── Habit.js
│   ├── Progress.js
│
├── routes/
│   ├── authRoutes.js
│   ├── habitRoutes.js
│   ├── statsRoutes.js
│   ├── aiRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│
└── server.js