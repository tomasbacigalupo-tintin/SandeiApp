# Sandei Frontend

This folder contains the React + Vite application. The project is built with TypeScript and TailwindCSS.

## Requirements
- Node.js 20+
- A `.env` file specifying the backend URL. Copy `.env.example` and adjust `VITE_API_URL` to point to your API.

## Development
Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Production build
Create an optimized build in the `dist/` folder:

```bash
npm run build
```

You can preview the production build locally with:

```bash
npm run preview
```

The provided `Dockerfile` also builds the app and serves it with Nginx when deployed in containers.

