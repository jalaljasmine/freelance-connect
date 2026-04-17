# Freelance Connect — Frontend

React + Vite + Tailwind CSS frontend for the Freelance Connect marketplace.

## Setup
1. Run: npm install
2. Create .env file: VITE_API_URL=http://localhost:5000
3. Run: npm run dev
4. Open: http://localhost:5173

## Pages
- / or /gigs       → Browse all gigs (public)
- /login           → Login page
- /register        → Register page
- /gigs/:id        → Single gig detail
- /create-gig      → Create a gig (sellers only, login required)
- /dashboard/buyer  → Track sent requests (login required)
- /dashboard/seller → Manage incoming requests (login required)

## Key Files
- src/context/AuthContext.jsx → Global user state
- src/api/axios.js            → API caller with auto JWT
- src/components/ProtectedRoute.jsx → Route guard
