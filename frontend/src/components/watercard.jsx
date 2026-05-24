function WaterCard({ water }) {

  return (

    <div className="border rounded-xl p-5 shadow">

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
