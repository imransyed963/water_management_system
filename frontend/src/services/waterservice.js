import api from "../api/api"

export const getWaterSupply = async () => {

  const response = await api.get(
    "/water-supply"
  )

  return response.data
}