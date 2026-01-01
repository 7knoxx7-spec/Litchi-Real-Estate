# Release Notes - v1.0.0

## Features
- **Real Estate Listings**: View properties with real data from database.
- **Interactive Map**: Explore properties on a map with clustering (Leaflet).
- **AI Recommendations**: Smart property suggestions based on user preferences.
- **Authentication**: Secure Login/Register with JWT.
- **Property Management**: Admin/Agent dashboard (Backend API ready).
- **Search & Filter**: Advanced filtering by price, location, type.
- **Localization**: Arabic/English support.

## Technical Details
- **Frontend**: React, Vite, Tailwind CSS, TanStack Query, Radix UI.
- **Backend**: Node.js, Express, Prisma, SQLite.
- **Security**:
  - JWT Authentication
  - Rate Limiting
  - Helmet (Security Headers)
  - Zod Input Validation
  - Secure File Upload (Type/Size validation)
- **Performance**:
  - Optimized Build
  - Asset Minification
  - React Query Caching

## Setup
1. `npm install` in root and server.
2. `cd server && npx prisma migrate deploy && npx prisma db seed`.
3. `npm run build` (Frontend) & `cd server && npm run build` (Backend).
4. Start server: `cd server && npm start`.
5. Start frontend (or serve via Nginx): `npm run preview`.

## Known Issues
- AI is currently rule-based (scoring algorithm), not LLM-based.
- Payment gateway is mocked.
