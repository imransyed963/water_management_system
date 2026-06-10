import { useNavigate }
from "react-router-dom"
import { Link } from "react-router-dom"

function AdminDashboard() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    navigate("/")
  }

  return (

    <div className="p-10">

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-5">
        Logout
      </button>

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

       <Link
         to="/add-water"
         className="border p-5 rounded-xl shadow">

         <h2 className="text-2xl font-bold mb-3">
           Manage Water Supply
         </h2>

         <p>
           Add water schedules
         </p>

       </Link>

       <Link
         to="/add-maintenance"
         className="border p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-3">
           Maintenance Updates
          </h2>

          <p>
            Add maintenance notices
          </p>

       </Link>
       <Link
         to="/manage-water"
         className="border p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-3">
           Manage Water Supply
          </h2>

          <p>
            View and delete records
          </p>

        </Link>

      </div>

    </div>
  )
}

export default AdminDashboard