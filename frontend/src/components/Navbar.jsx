import { Link } from "react-router-dom"

function Navbar() {

  return (

    <nav className=" sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold text-blue-600">
        🔹🔷🔹info.H2O🔹🔷🔹
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

            const confirmLogout =
              window.confirm( "Are you sure you want to logout?")

            if (!confirmLogout) {

              return
            }

            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("name")

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