import axios from "axios"

const api = axios.create({
  baseURL: "https://water-management-system-njnu.onrender.com"
})

export default api