import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/providers/AuthProvider'
import { useContext } from 'react'

export default function ProtectedRoute({ children }: any) {
  const { session, loading } = useContext(AuthContext)

  if (loading) return <p>Cargando...</p>

  if (!session) return <Navigate to="/signin" />

  return children
}