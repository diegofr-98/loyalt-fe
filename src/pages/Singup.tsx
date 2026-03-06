import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Register() {
  const navigate = useNavigate()

  const [bussinesTypes, getBussinesTypes] = useState<any[] | null>(null)
  const [businessType, setBusinessType] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchBussinesTypes = async () => {
      const { data } = await supabase.from('business_type').select('*')
      getBussinesTypes(data)
    }
    fetchBussinesTypes()
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)
console.log(businessType)
    const { data ,error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          business_type_id: businessType
        }
      }
    })

    // llamar creacion negocio
    // eliminar name y bussinessType de options
    // desactivar trigger creacion empreasa en supabase
    // agregar campo logo empresa

    console.log(data)

    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>
            Regístrate para acceder a tu panel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              placeholder="Nombre del negocio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger>
                <SelectValue placeholder={businessType ? businessType : "Tipo de negocio"} />
              </SelectTrigger>

              <SelectContent>
                {bussinesTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>

          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-500 mt-4">{message}</p>
          )}

          <p className="text-sm text-muted-foreground mt-6 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}