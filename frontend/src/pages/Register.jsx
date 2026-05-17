import { useState } from "react"
import api from "../api/api"

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await api.post(
        "/register",
        {
          name,
          email,
          password
        }
      )

      alert("Registration successful")

    } catch (error) {

      console.log(error)

      alert("Registration failed")
    }
  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleRegister}
        className="border p-10 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white px-4 py-2 w-full"
        >
          Register
        </button>

      </form>

    </div>
  )
}

export default Register