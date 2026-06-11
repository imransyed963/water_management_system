import {FaTools} from "react-icons/fa"

function MaintenanceCard({
  maintenance
}) {

  return (

    <div className=" bg-white rounded-2xl p-5
    shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

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