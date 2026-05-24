function MaintenanceCard({
  maintenance
}) {

  return (

    <div className="border rounded-xl p-5 shadow">

      <h2 className="text-2xl font-bold mb-2">
        {maintenance.area.name}
      </h2>

      <p>
        <strong>District:</strong>
        {" "}
        {maintenance.area.district}
      </p>

      <p>
        <strong>Issue:</strong>
        {" "}
        {maintenance.issue}
      </p>

      <p>
        <strong>Status:</strong>
        {" "}
        {maintenance.status}
      </p>

      <p>
        <strong>Expected Completion:</strong>
        {" "}
        {maintenance.expected_completion}
      </p>

    </div>
  )
}

export default MaintenanceCard