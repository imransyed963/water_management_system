import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {getAreas} from "../services/areaService.js"

import { getWaterSupply } from "../services/waterservice.js"

import { getMaintenance } from "../services/maintenanceservice.js"

import WaterCard from "../components/watercard.jsx"

import MaintenanceCard from "../components/maintenancecard.jsx"
import Navbar from "../components/Navbar.jsx"

function Dashboard() {

  const name = localStorage.getItem("name")

  const navigate = useNavigate()

  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState("")
  
  const [waterSupply, setWaterSupply] = useState([])

  const [maintenance, setMaintenance] = useState([])

  const [loading, setLoading] = useState(true)

  const handleLogout = () => {

   localStorage.removeItem(
    "token"
    )

    navigate("/")
  }
  
    useEffect(() => {

    const fetchAreas = async () => {

      try {

              const data = await getAreas()

              setAreas(data)

      } catch (error) {

              console.log(error)

      }

       }

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
    fetchAreas()

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

    const filteredWaterSupply =
          selectedArea === ""
         ? waterSupply
         : waterSupply.filter(
           (item) =>
           item.area.id ===
           Number(selectedArea)
      )

  return (
       <>
      <Navbar />

    <div className="min-h-screen bg-slate-300 p-6">

      <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-2xl shadow mb-6">

        <h1 className="text-3xl font-bold">
          Welcome, {name} !
        </h1>

        <p className="mt-2">
          Stay updated with water supply schedules and maintenance notices.
        </p>

      </div>

      <div className="mb-6">

          <label className="font-semibold"> Select Area </label>

          <select
            value={selectedArea}
            onChange={(e) =>
              setSelectedArea(e.target.value)
            }
            className="border p-3 rounded-lg ml-3"
          >

            <option value=""> All Areas </option>

            {areas.map((area) => (

              <option
                key={area.id}
                value={area.id}
              >

                {area.name}

              </option>

            ))}

          </select>

      </div>
      <h2 className="text-3xl font-bold mb-5">
        💧 Water Supply
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-10">

        {filteredWaterSupply.map((water) => (

          <WaterCard
            key={water.id}
            water={water}
          />

        ))}

      </div>

      <h2 className="text-3xl font-bold mb-5">
        🛠️ Maintenance Updates
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
  </>)
}

export default Dashboard