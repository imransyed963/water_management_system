import { useState } from "react"

import api from "../api/api"

function AddMaintenance() {

  const [formData, setFormData] =
    useState({

      area_id: "",

      issue: "",

      status: "",

      expected_completion: ""
    })

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
        "/maintenance",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        "Maintenance added"
      )

    } catch (error) {

      console.log(error)

      alert("Failed")
    }
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">

        Add Maintenance

      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >

        <input
          type="number"
          name="area_id"
          placeholder="Area ID"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="issue"
          placeholder="Issue"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <input
          type="text"
          name="expected_completion"
          placeholder="Expected Completion"
          className="border p-3 w-full"
          onChange={handleChange}
        />

        <button
          className="bg-black text-white px-5 py-3"
        >
          Add
        </button>

      </form>

    </div>
  )
}

export default AddMaintenance