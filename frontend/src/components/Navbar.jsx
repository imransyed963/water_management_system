import { Link } from "react-router-dom"

function Navbar() {

  return (

    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        🔹🔷🔹Water Management🔹🔷🔹
      </h1>

      <div className="flex gap-6">

        <Link
          to="/dashboard"
          className="hover:text-blue-600"
        >
          Dashboard
        </Link>

        <button
            onClick={() => {

                localStorage.removeItem("token")
                localStorage.removeItem("role")

                window.location.href = "/"

            }}

            className="hover:text-red-600"
            >

            Logout

        </button>

      </div>

    </nav>

  )
}

export default Navbar