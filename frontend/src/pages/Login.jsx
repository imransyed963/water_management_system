import { useState } from "react"
import api from "../api/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/login",
        {
          email,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      alert("Login successful")

    } catch (error) {

      console.log(error)

      alert("Login failed")
    }
  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleLogin}
        className="border p-10 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

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
          Login
        </button>

      </form>

    </div>
  )
}

export default Login