import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "@/pages/Landing"
import Login from "@/pages/Singin"
import Register from "@/pages/Singup"
import Customer from "@/pages/Customer.tsx"
import Dashboard from "@/pages/dashboard/Dashboard"
import Customers from "@/pages/dashboard/Customers"
import Campaigns from "@/pages/dashboard/Campaigns"
import Settings from "@/pages/dashboard/Settings"
import Rewards from "@/pages/dashboard/Rewards"
import ProtectedRoute from "./components/protectedRoute"
import Business from "./pages/other/Business"
import Wallet from "@/pages/Wallet.tsx"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

          <Route path="/customer/:businessId" element={<Customer />} />
          <Route path="/wallet" element={<Wallet />} />

        {/* protegidas */}
        <Route
          path="/business"
          element={
            <ProtectedRoute>
              <Business />
            </ProtectedRoute>
          }
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
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <Rewards />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}