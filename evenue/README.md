# eVenue

eVenue is a full-stack event-planning platform for discovering local service providers and organizing celebration details. Citizens can browse providers by event and service, save favourites, rate vendors, complete a personal profile, and use Aadhaar image extraction to pre-fill profile information. Vendors can register their business, upload business images, and publish their services for discovery.

The project is split into:

- `evenue/` - React, TypeScript, and Vite frontend
- `server/` - Node.js, Express, and MongoDB backend

## Features

### Citizen experience

- Landing page with event categories, planning content, and vendor-focused calls to action
- Citizen signup and login
- Event and service discovery
- Vendor cards with:
  - Business information
  - Categories and contact details
  - Favourite toggle
  - Calculated average rating
  - Rating modal using `react-rating-stars-component`
- Favourite vendors loaded for the logged-in user
- Citizen profile form
- Aadhaar front/back image upload with AI-assisted detail extraction
- Saved profile details page
- Profile update flow with pre-filled form values
- Responsive citizen dashboard with search, favourites, and profile navigation

### Vendor experience

- Vendor registration form
- Business details and service categories
- Shop picture and business certificate uploads
- Cloudinary image upload integration
- Vendor lookup by email
- Vendor ratings stored as a running rating total and count

## Technology stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- ESLint
- Tailwind CSS and project-specific CSS
- `react-rating-stars-component`

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens
- bcrypt password hashing
- express-fileupload
- Cloudinary
- CORS
- OpenRouter configuration for Aadhaar extraction

## Project structure

```text
MERN-ts project/
├── evenue/
│   ├── public/
│   │   └── images/                # Home page imagery
│   ├── src/
│   │   ├── components/
│   │   │   ├── Citizen.tsx        # Citizen profile form and Aadhaar upload
│   │   │   ├── CitizenDashboard.tsx
│   │   │   ├── CitizenSearch.tsx  # Event, service, and vendor search
│   │   │   ├── Favourites.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Profile.tsx         # Saved profile details
│   │   │   ├── Signup.tsx
│   │   │   ├── VendorCard.tsx
│   │   │   └── VendorRegister.tsx
│   │   ├── App.tsx                # Frontend route configuration
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── server/
    ├── config/
    │   ├── ai-config.js
    │   ├── cloudConfig.js
    │   ├── mongooseConnect.js
    │   └── verify-token.js
    ├── controller/
    │   ├── citizenController.js
    │   ├── userController.js
    │   └── vendorController.js
    ├── models/
    │   ├── citizenSchema.js
    │   ├── events-services.js
    │   ├── favrtSchema.js
    │   ├── userDetailsSchema.js
    │   ├── userSchema.js
    │   └── vendorSchema.js
    ├── routers/
    │   ├── citizenRouter.js
    │   ├── userRouter.js
    │   └── vendorRouter.js
    ├── uploads/
    ├── server.js
    └── package.json
```

## Prerequisites

- Node.js 20 or newer is recommended
- npm
- MongoDB connection string
- Cloudinary account for vendor image uploads
- JWT secret
- AI provider key for Aadhaar extraction

## Installation

Clone the repository and install dependencies separately for the frontend and backend:

```bash
cd evenue
npm install

cd ../server
npm install
```

## Environment configuration

Create `server/.env`. The file is intentionally ignored by Git.

```env
mongo_url=mongodb+srv://<username>:<password>@<cluster>/<database>
jwt_secret=replace-with-a-long-random-secret
cloud_name=your-cloudinary-cloud-name
cloud_api_key=your-cloudinary-api-key
cloud_api_secret=your-cloudinary-api-secret
gemini_key=your-gemini-api-key
OPENROUTER_API_KEY=your-openrouter-api-key
```

Do not commit real credentials. The backend reads these variables through `dotenv`.

## Running the application

Start the backend in one terminal:

```bash
cd server
node server.js
```

The API listens on:

```text
http://localhost:2001
```

Start the frontend in a second terminal:

```bash
cd evenue
npm run dev
```

Vite prints the local frontend URL, normally:

```text
http://localhost:5173
```

The backend package does not currently define a start script. For development, run `node server.js` directly. `nodemon` is installed and can be used manually if a watch command is desired.

## Frontend routes

| Route | Purpose |
| --- | --- |
| `/home` | Public landing page |
| `/signup` | Create a citizen or vendor account |
| `/login` | Authenticate a user |
| `/vendor-form` | Register a vendor business |
| `/citizen-form` | Complete or edit citizen details |
| `/citizen-search` | Standalone citizen service search |
| `/citizen-dashboard/search` | Dashboard search page |
| `/citizen-dashboard/favourites` | Logged-in user's saved vendors |
| `/citizen-dashboard/profile` | Citizen profile form |
| `/citizen-dashboard/profile-details` | Saved citizen profile details |

The root route redirects to `/home`.

## Backend API

All endpoints are served from `http://localhost:2001`.

### User routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/user/saveUserData` | Create an account and hash the password |
| `GET` | `/user/verify-user` | Verify email/password and return a JWT |

### Citizen routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/citizen/saveEvents` | Seed or retrieve the event/service catalog |
| `GET` | `/citizen/fetchServices` | Get services for an event; requires a Bearer token |
| `GET` | `/citizen/fetchVendors` | Get paginated vendors for a service; requires a Bearer token |
| `POST` | `/citizen/extractAadhaar` | Extract profile fields from an Aadhaar image |
| `POST` | `/citizen/saveCitizenData` | Save data using the legacy citizen model |
| `POST` | `/citizen/saveUserDetails` | Create or update saved profile details by email |
| `GET` | `/citizen/getUserDetails` | Retrieve saved profile details by email |

### Vendor routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/vendor/doregister` | Register a vendor and upload business images |
| `GET` | `/vendor/fetchDetails` | Find vendor details by email |
| `POST` | `/vendor/savefavrts` | Add or remove a vendor favourite; requires a Bearer token |
| `GET` | `/vendor/getfavrts` | Retrieve a user's favourite vendor IDs; requires a Bearer token |
| `POST` | `/vendor/getfavrtCards` | Resolve favourite vendor IDs into vendor cards |
| `POST` | `/vendor/saveRating` | Add a rating to a vendor's running total |

### Authentication header

Protected endpoints expect:

```http
Authorization: Bearer <jwt>
```

The frontend stores the token and logged-in user object in browser `localStorage` after login:

- `token`
- `user`

## Data models

### Users

Stores account credentials and role:

- `email`
- `name`
- `password` (bcrypt hash)
- `role`

### Vendors

Stores business and discovery data:

- Contact and business identity
- Address and city
- Categories
- Website and Instagram information
- Cloudinary image URLs
- `ratingSum`
- `users_rated`

The displayed average rating is calculated as:

```text
ratingSum / users_rated
```

### Favourites

Stores a user's email and an array of vendor email IDs.

### User details

The `userDetails` collection stores:

- Email
- Aadhaar card number
- Name
- Date of birth
- Gender
- Address
- City
- Contact number

Profile saves use an upsert by email, so updating a profile does not create another record for the same email.

### Events and services

The event catalog stores event names with their required service categories. The citizen search page seeds the catalog when it is empty and then retrieves it.

## Main application flows

### Signup and login

1. A user selects a role during signup.
2. The backend hashes the password with bcrypt.
3. Login verifies the credentials.
4. The backend creates a JWT that expires after 20 minutes.
5. The frontend stores the token and user object in `localStorage`.
6. Citizens are sent to the citizen dashboard; vendors are sent to the vendor form.

### Citizen search

1. The frontend loads the event catalog.
2. The citizen selects an event.
3. The frontend loads services for that event.
4. Selecting a service requests paginated vendors.
5. Vendor cards render the matching providers.

### Favourites

The favourites page reads the logged-in user's email from `localStorage`, retrieves the user's saved vendor IDs, and requests the corresponding vendor documents. The email is not entered manually on the page.

### Vendor rating

The card shows the calculated average rating. Clicking the rating opens a modal. The selected rating is submitted explicitly to `/vendor/saveRating`; ratings are not saved merely by mounting the card or changing the displayed average.

### Citizen profile

The citizen form supports manual entry and Aadhaar image extraction. The saved profile page loads the record associated with the logged-in user's email. Existing details can be passed back into the form for editing, and the backend upserts the record by email.

## Validation and development commands

From `evenue/`:

```bash
npm run build
npm run lint
npm run preview
```

- `npm run build` runs TypeScript project compilation followed by a Vite production build.
- `npm run lint` runs ESLint.
- `npm run preview` serves the production build locally.

From `server/`, JavaScript files can be syntax-checked with:

```bash
node --check server.js
```

## Troubleshooting

### Cannot connect to the API

- Confirm the backend is running on port `2001`.
- Confirm the frontend Axios URLs still point to `http://localhost:2001`.
- Check the browser Network tab and backend terminal output.

### MongoDB connection fails

- Check `mongo_url` in `server/.env`.
- Confirm the MongoDB cluster allows the current IP address.
- Confirm the database credentials are valid.

### Protected endpoint returns session expired

- Log in again to create a fresh token.
- Confirm the `Authorization: Bearer <token>` header is present.
- Confirm `jwt_secret` is set and has not changed while the token is active.

### Aadhaar extraction fails

- Confirm an AI provider key is configured.
- Upload a valid image file.
- Check the backend response for unsupported image, timeout, rate-limit, or invalid-data messages.

### Vendor images fail to upload

- Confirm all Cloudinary variables are set.
- Confirm the form includes `shopPicture` and `businessCertificate`.
- Check the backend `uploads/` directory and Cloudinary configuration.

## Security notes

- Never commit `.env` files, API keys, JWT secrets, or Cloudinary secrets.
- Passwords are hashed before storage.
- Protected citizen/vendor endpoints use JWT middleware where configured.
- Aadhaar images and extracted identity information are sensitive data; use HTTPS, access control, and secure storage before deploying publicly.
- The current frontend uses hard-coded localhost API URLs and should use an environment-based API URL for production.

## Production considerations

Before deploying, consider:

- Move frontend API URLs into a Vite environment variable such as `VITE_API_URL`.
- Add authentication middleware to profile read/write and rating endpoints where appropriate.
- Associate favourites and profile data with the authenticated JWT identity instead of trusting an email supplied by the client.
- Add request validation and centralized error handling.
- Add rate limiting and structured logging.
- Configure secure CORS origins instead of allowing all origins.
- Serve uploaded assets through a controlled storage/CDN policy.
- Add automated tests for authentication, profile upserts, favourites, ratings, and vendor search.

