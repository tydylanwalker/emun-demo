# Emun Demo

A **Next.js** demo project built with **React**, **TypeScript**, **Material-UI (MUI)**, and **React Redux**.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.0.0 or later  
  [Download Node.js](https://nodejs.org/)
- **npm**: v8.0.0 or later  
  Comes with the Node.js installation.

## Getting Started

The main branch of this repository is named `main`.

### 1. Clone the repository

```bash
git clone https://github.com/tydylanwalker/emun-demo.git
cd emun-demo
```

### 2. Install Dependencies

Run the following command in the project root to install all required dependencies:

```bash
npm install
```

### 3. Run the development server

Start the app in development mode by running:

```bash
npm run dev
```

The application will now be accessible at http://localhost:3000.

---

### Project Structure

- **`pages/`**: Contains all Next.js pages. The entry point is `pages/index.tsx`.
- **`components/`**: .tsx files - Reusable UI components.
- **`data/`**: .ts files - interfaces, enums, mappers, etc.
- **`functions/`**: .ts files - Reusable logic.
- **`hooks/`**: Custom React Hooks.
- **`services/`**: Has our backend GoogleSheetsService.
- **`store/`**: Contains our React Redux files - store and middleware (thunks).
- **`theme/`**: Contains our global styles and MUI themes.

### Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Material-UI**: A React component library implementing Google’s Material Design.
- **React Redux**: A state management library that helps manage and centralize application state.

### Available Scripts

In the project root, you can run the following scripts:

- **`npm install`**: Installs project dependencies.
- **`npm run dev`**: Starts the development server at [http://localhost:3000](http://localhost:3000).
- **`npm run build`**: Builds the project for production.
- **`npm start`**: Starts the application in production mode (requires `npm run build` first).
- **`npm run lint`**: Runs linting checks to ensure code quality.
- **`npm run format`**: Runs prettier to ensure code cleanliness.
