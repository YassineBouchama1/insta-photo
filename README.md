# Insta-Photo

## Description
Insta-Photo is a Next.js application that allows users to authenticate, view, and like images using the Unsplash API.

## Features

### 1. Authentication
- Users can log in using the following credentials:
  - `muser1/mpassword1` → Successful login
  - `muser2/mpassword2` → Successful login
  - `muser3/mpassword3` → Displays error message: `Ce compte a été bloqué.`
  - Any other credentials → Displays error message: `Informations de connexion invalides`

### 2. Listing Photos
- Fetches and displays images from the Unsplash API.
- Implements pagination or infinite scrolling for a smooth user experience.

### 3. Liking Photos
- Users can like/unlike images.
- The UI updates to reflect whether an image has been liked by the user.

## Technologies Used
- **Next.js** (v15.1.7)
- **React** (v19.0.0)
- **Quick-LRU** (used instead of LevelDB due to issues)
- **LevelDB** for database storage
- **Unsplash API** for fetching images
- **Tailwind CSS** for styling
- **React Query** for data fetching and state management
- **Intercepting Routes** for efficient navigation and routing

## Installation

### Prerequisites
- Node.js installed on your machine

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/YassineBouchama1/insta-photo.git
   cd insta-photo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```sh
   UNSPLASH_ACCESS_KEY=
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   UNSPLASH_CLIENT_SECRET=
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the app in your browser:
   ```sh
   http://localhost:3000
   ```

## Scripts
- `npm run dev` - Runs the application in development mode with Turbopack.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to check for linting errors.

## API Integration
- The application integrates with the Unsplash API for fetching images.
- Users need to create an Unsplash developer account to obtain an access key.

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes and create a pull request.

## License
This project is licensed under the MIT License.

