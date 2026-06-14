import { useState } from "react"
import { useEffect } from "react"
import { getAreas } from "../services/areaService"

import api from "../api/api"

function AddWaterSupply() {

  const [formData, setFormData] =
    useState({

      area_id: "",

      water_type: "",

      supply_time: "",

      status: ""
    })
  const [areas, setAreas] = useState([])

  useEffect(() => {
    const fetchAreas = async () => {

      try {
        const data = await getAreas()
        setAreas(data)
      } catch (error) {
        console.log("Failed to fetch areas", error)
      }
    }
    fetchAreas()
  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const token =
        localStorage.getItem("token")

      await api.post(
        "/water-supply",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        "Water supply added"
      )

    } catch (error) {

      console.log(error)

      alert("Failed")
    }
  }

  return (

    <div className="p-10">

       <h1 className="text-4xl font-bold mb-10">
          Add Water Supply
       </h1>

      <form
         onSubmit={handleSubmit}
         className="max-w-xl space-y-4" >

          <select
            name="area_id"
            placeholder="Area"
            className="border p-3 w-full"
            onChange={handleChange}
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name} {"-"} {area.district}
              </option>
            ))}
          </select>
          
         <input
          type="text"
          name="water_type"
          placeholder="Water Type"
          className="border p-3 w-full"
          onChange={handleChange}/>

         <input
          type="text"
          name="supply_time"
          placeholder="Supply Time"
          className="border p-3 w-full"
          onChange={handleChange} />

         <input
            type="text"
            name="status"
            placeholder="Status"
            className="border p-3 w-full"
            onChange={handleChange} />

         <button
             className="bg-black text-white px-5 py-3">
             Add
         </button>
       </form>

    </div>
  )
}

export default AddWaterSupply