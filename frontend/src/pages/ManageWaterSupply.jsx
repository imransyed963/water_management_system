import {
  useEffect,
  useState
} from "react"

import {Link} from "react-router-dom"

import api from "../api/api"

function ManageWaterSupply() {

  const [waterSupply, setWaterSupply] =
    useState([])  

  const fetchWaterSupply = async () => {

    try {

      const response =
        await api.get("/water-supply")

      setWaterSupply(
        response.data
      )

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchWaterSupply()

  }, [])

  const handleDelete = async (id) => {

    try {

      const token =
        localStorage.getItem("token")

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this water supply?"
      )

      if (!confirmDelete) {
        return
      }

      await api.delete(
        `/water-supply/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      fetchWaterSupply()

    } catch (error) {

      console.log(error)

      alert("Delete failed")
    }
  }
  

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">

        Manage Water Supply

      </h1>

      <div className="space-y-5">

        {waterSupply.map((water) => (

          <div
            key={water.id}
            className="border rounded-xl p-5 shadow flex justify-between items-center"
          >

            <div>

              <h2 className="text-2xl font-bold">

                {water.area.name}

              </h2>

              <p>
                {water.water_type}
              </p>

              <p>
                {water.supply_time}
              </p>

              <p>
                {water.status}
              </p>

            </div>
            <Link
              to={`/edit-water/${water.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >

              Edit

            </Link>

            <button
              onClick={() =>
                handleDelete(water.id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >

              Delete

            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ManageWaterSupply