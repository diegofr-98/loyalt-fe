import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormData = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const onSubmit = async (form: FormData) => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate("/business")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>
            Regístrate para empezar
          </CardDescription>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Label htmlFor="email">Correo</Label>
            <Input
              type="email"
              placeholder="Correo electrónico"
              {...register("email")}
            />

            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password")}
            />

            <Button
              className="w-full"
              disabled={!isValid || loading}
            >
              {loading ? "Registrando..." : "Continuar"}
            </Button>

          </form>

          {error && (
            <p className="text-sm text-red-500 mt-4">{error}</p>
          )}

          <p className="text-sm text-muted-foreground mt-6 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}