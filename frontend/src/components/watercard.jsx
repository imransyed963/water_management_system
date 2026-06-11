import{FaWater} from "react-icons/fa"

function WaterCard({ water }) {

  return (

    <div className=" bg-white rounded-2xl p-5
    shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <h2 className="text-2xl font-bold mb-2">
        {water.area.name}
      </h2>

      <p>
        <strong>District:</strong>
        {" "}
        {water.area.district}
      </p>

      <p>
        <strong>Water Type:</strong>
        {" "}
        {water.water_type}
      </p>

      <p>
        <strong>Supply Time:</strong>
        {" "}
        {water.supply_time}
      </p>

      <p>
        <strong>Status:</strong>
        {" "}
        {water.status}
      </p>

    </div>
  )
}

export default WaterCard
