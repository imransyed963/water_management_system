import api from "../api/api"

export const getStats = async () => {

  const response =
    await api.get("/stats")

  return response.data
}