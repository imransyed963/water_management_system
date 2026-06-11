import { useNavigate }
from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import {getStats} from "../services/dashboardService"

function AdminDashboard() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("role")

    navigate("/")
  }
  const [stats, setStats] = useState({})

  useEffect(() => {
    loadStats()},[])

  const loadStats = async () => {
    try {
      const data = await getStats()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
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

         <p> Add water schedules </p>

       </Link>

       <Link
         to="/add-maintenance"
         className="border p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-3"> Maintenance Updates </h2>
          <p> Add maintenance notices </p>

       </Link>
       <Link
         to="/manage-water"
         className="border p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-3"> Manage Water Supply </h2>
          <p> View and delete records </p>

        </Link>

      </div>  
      <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="p-4 shadow rounded-xl">

            <h3>Total Users</h3>

            <p>{stats.users}</p>

          </div>

          <div className="p-4 shadow rounded-xl">

            <h3>Total Areas</h3>

            <p>{stats.areas}</p>

          </div>

          <div className="p-4 shadow rounded-xl">

            <h3>Water Supply Records</h3>

            <p>{stats.water_supply}</p>

          </div>

          <div className="p-4 shadow rounded-xl">

            <h3>Maintenance Records</h3>

            <p>{stats.maintenance}</p>

          </div>

      </div>

    </div>
  )
}

export default AdminDashboard