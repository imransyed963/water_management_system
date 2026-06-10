import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

function Register() {

  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async (e) => {

    e.preventDefault()
    if(!name || !email || !password) {setError("Please fill in all fields") 
      return 
    }
    if (password.length < 6) {setError("Password must be at least 6 characters")
      return
    }
    setLoading(true)
    setError("")

    try {

      await api.post("/register",{name,email,password})

      alert("Registration successful")
      navigate("/")
    } 
    catch (error) {

      console.log(error)
      setError(error?.response?.data?.message || "Registration failed")
    }
    finally {
      setLoading(false) 
    }
  }

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleRegister}
        className="border p-10 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6"> Register </h1>

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
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full  disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"} 
        </button>

      </form>

    </div>
  )
}

export default Register