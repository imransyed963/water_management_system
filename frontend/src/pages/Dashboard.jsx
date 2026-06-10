import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  getWaterSupply
} from "../services/waterservice.js"

import {
  getMaintenance
} from "../services/maintenanceservice.js"

import WaterCard from "../components/watercard.jsx"

import MaintenanceCard from "../components/maintenancecard.jsx"

function Dashboard() {

  const navigate = useNavigate()

  const [waterSupply, setWaterSupply] =
    useState([])

  const [maintenance, setMaintenance] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const handleLogout = () => {

   localStorage.removeItem(
    "token"
    )

    navigate("/")
  }
  
    useEffect(() => {

    const fetchData = async () => {

      try {

        const waterData =
          await getWaterSupply()

        const maintenanceData =
          await getMaintenance()

        setWaterSupply(waterData)

        setMaintenance(
          maintenanceData
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

    fetchData()

  }, [])

  if (loading) {

    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    )
  }

  {waterSupply.length === 0 && (

    <p className="text-gray-500">
      No water supply data available.
    </p>)}

  return (

    <div className="p-10">

        <button onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-5">
          Logout
        </button>

      <h1 className="text-4xl font-bold mb-10">
        Citizen Dashboard
      </h1>

      <h2 className="text-3xl font-bold mb-5">
        Water Supply
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-10">

        {waterSupply.map((water) => (

          <WaterCard
            key={water.id}
            water={water}
          />

        ))}

      </div>

      <h2 className="text-3xl font-bold mb-5">
        Maintenance Updates
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {maintenance.map((item) => (

          <MaintenanceCard
            key={item.id}
            maintenance={item}
          />

        ))}

      </div>

    </div>
  )
}

export default Dashboard