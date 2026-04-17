# Freelance Connect — Backend

## Setup Steps
1. Run: npm install
2. Edit .env — add your MongoDB URI and JWT secret
3. Run: npm run dev
4. Open: http://localhost:5000

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Gigs
- GET    /api/gigs           (browse all)
- GET    /api/gigs/:id       (single gig)
- POST   /api/gigs           (create — login required)
- DELETE /api/gigs/:id       (delete — login required)

### Requests
- POST /api/requests              (send request — buyer)
- GET  /api/requests/buyer        (my requests — buyer)
- GET  /api/requests/seller       (incoming — seller)
- PUT  /api/requests/:id/status   (update status — seller)
