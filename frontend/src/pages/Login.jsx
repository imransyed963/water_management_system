import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()
    if(!email || !password){
      setError("Please fill in all fields")
      setLoading(false)
        return
    }

    setLoading(true)
    setError("")
  
    try {

      const response = await api.post("/login",{email,password})

      localStorage.setItem("token",response.data.access_token,)

      localStorage.setItem("role",response.data.role,)

      localStorage.setItem("name",response.data.name)

        
       if (response.data.role === "admin") {navigate("/admin")}
       else{navigate("/dashboard")}
    } 
    
    catch (error) {

      console.log(error)
      setError(error?.response?.data?.message || "Login failed, invalid password or email")  
    } 
    
    finally {
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-500 via-cyan-500 to-indigo-700">
      <form
        onSubmit={handleLogin}
        className="w-96 p-8 rounded-2xl bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30"
      >

          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Welcome Back
          </h1>

          <p className="text-white/80 text-center mb-6">
            Water Management System
          </p>
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
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                      py-3 rounded-lg transition-all duration-300 hover:scale-105"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
          <div className="mt-4 text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                      py-3 rounded-lg transition-all duration-300 hover:scale-105">

            <p>

                  Don't have an account?

                  <Link
                    to="/register"
                    className="text-blue-950 ml-1"
                  >
                    Register
                  </Link>

            </p>

          </div>

      </form>

    </div>
  )
}

export default Login