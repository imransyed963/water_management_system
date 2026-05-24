import {
  Routes,
  Route
} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminRoute from "./components/AdminRoute"
import AddMaintenance from "./pages/AddMaintenance.jsx"
import AddWaterSupply from "./pages/AddWaterSupply.jsx"

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/add-maintenance"
        element={
          <AdminRoute>
            <AddMaintenance />
          </AdminRoute>
        }
      />
      
      <Route
        path="/add-water"
        element={
          <AdminRoute>
            <AddWaterSupply />
          </AdminRoute>
        }
      />

    </Routes>
  )
}

export default App