import { useNavigate }
from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import {getStats} from "../services/dashboardService"

function AdminDashboard() {
   
  const name = localStorage.getItem("name")
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

    <div className="min-h-screen bg-slate-300 p-6">
      <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-2xl shadow mb-6">

        <h1 className="text-3xl font-bold">
          Welcome, {name} !
        </h1>

        <p className="mt-2">
          Update the water supply schedules and maintenance notices.
        </p>
      </div>

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

       <Link
         to="/add-water"
         className="border p-5 rounded-xl shadow transition-all duration-300 hover:scale-105">

         <h2 className="text-2xl font-bold mb-3">
           Manage Water Supply
         </h2>

         <p> Add water schedules </p>

       </Link>

       <Link
         to="/add-maintenance"
         className="border p-5 rounded-xl shadow transition-all duration-300 hover:scale-105">

          <h2 className="text-2xl font-bold mb-3"> Maintenance Updates </h2>
          <p> Add maintenance notices </p>

       </Link>
       <Link
         to="/manage-water"
         className="border p-5 rounded-xl shadow transition-all duration-300 hover:scale-105">

          <h2 className="text-2xl font-bold mb-3"> Manage Water Supply </h2>
          <p> Update and delete records </p>

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
      <div className="align-center text-center mb-5 border-t pt-5">
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

              className="hover:text-red-600 text-lg font-bold transition-colors duration-300"
            >
              Logout
            </button>
      </div>

    </div>
  )
}

export default AdminDashboard