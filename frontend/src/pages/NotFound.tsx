import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/login" className="text-blue-600 hover:underline">
        Go to login
      </Link>
    </div>
  );
}
