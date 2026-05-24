import api from "../api/api"

export const getAreas = async () => {

  const response = await api.get(
    "/areas"
  )

  return response.data
}