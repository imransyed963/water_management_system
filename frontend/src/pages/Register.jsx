import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { Link } from "react-router-dom"

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

    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-500 via-cyan-500 to-indigo-700">

      <form
        onSubmit={handleRegister}
        className="w-96 p-8 rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30"
      >

          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Create Account
          </h1>

          <p className="text-white/80 text-center mb-6">
            Water Management System
          </p>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                      py-3 rounded-lg transition-all duration-300 hover:scale-105"
        >
          {loading ? "Creating account..." : "Register"} 
        </button>
           <div className="mt-4 text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                      py-3 rounded-lg transition-all duration-300 hover:scale-105">

            <p>

              Already have an account?

              <Link
                to="/"
                className="text-blue-950 ml-1"
              >
                Login
              </Link>

            </p>

          </div>

      </form>

    </div>
  )
}

export default Register