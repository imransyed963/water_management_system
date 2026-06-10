import {
  useEffect,
  useState
} from "react"

import {
  useParams,
  useNavigate
} from "react-router-dom"

import api from "../api/api"

import {
  getAreas
} from "../services/areaService"

function EditWaterSupply() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [areas, setAreas] =
    useState([])

  const [formData, setFormData] =
    useState({

      area_id: "",

      water_type: "",

      supply_time: "",

      status: ""
    })

  useEffect(() => {

    fetchWater()

    fetchAreas()

  }, [])

  const fetchWater = async () => {

    try {

      const response =
        await api.get("/water-supply")

      const water =
        response.data.find(
          (item) =>
            item.id === Number(id)
        )

      if (water) {

        setFormData({

          area_id: water.area.id,

          water_type:
            water.water_type,

          supply_time:
            water.supply_time,

          status: water.status
        })
      }

    } catch (error) {

      console.log(error)
    }
  }

  const fetchAreas = async () => {

    try {

      const data =
        await getAreas()

      setAreas(data)

    } catch (error) {

      console.log(error)
    }
  }

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

      await api.put(
        `/water-supply/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        "Updated successfully"
      )

      navigate("/manage-water")

    } catch (error) {

      console.log(error)

      alert("Update failed")
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">

        Edit Water Supply

      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >

        <select
          name="area_id"
          value={formData.area_id}
          onChange={handleChange}
          className="border p-3 w-full"
        >

          <option value="">
            Select Area
          </option>

          {areas.map((area) => (

            <option
              key={area.id}
              value={area.id}
            >

              {area.name}
              {" - "}
              {area.district}

            </option>

          ))}

        </select>

        <input
          type="text"
          name="water_type"
          value={formData.water_type}
          onChange={handleChange}
          placeholder="Water Type"
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="supply_time"
          value={formData.supply_time}
          onChange={handleChange}
          placeholder="Supply Time"
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          className="border p-3 w-full"
        />

        <button
          className="bg-black text-white px-5 py-3"
        >

          Update

        </button>

      </form>

    </div>
  )
}

export default EditWaterSupply