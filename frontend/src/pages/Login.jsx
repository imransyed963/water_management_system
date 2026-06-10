import { useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

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

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleLogin}
        className="border p-10 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6"> Login </h1>

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
          className="bg-black text-white px-4 py-2 w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  )
}

export default Login