import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="md:text-4xl text-lg font-bold">404 - Page Not Found {":("}</h1>
        <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound