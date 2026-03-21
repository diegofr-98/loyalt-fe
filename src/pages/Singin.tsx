
  import { useState } from "react"
  import { Link, useNavigate } from "react-router-dom"
  import { supabase } from "../lib/supabaseClient"

  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"

  import z from "zod"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { fetchBusinessByOwnerId } from "@/api/requests"
  import { useBusiness } from "@/hooks/useBusiness"

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  type FormData = z.infer<typeof schema>

  export default function Login() {
    const { setBusiness } = useBusiness()
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      const business = await fetchBusinessByOwnerId(data.user.id, data.session.access_token);
    
      if (business) {
        navigate("/dashboard", {state: { businessId: business.uuid }})
      } else {
        navigate("/business")
      }
      
      setBusiness(business)
      setLoading(false)
     }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
          <Card className="w-full max-w-md">

            <CardHeader>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>
                Inicia sesión con tu correo y contraseña
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
                  {loading ? "Cargando..." : "Iniciar Sesión"}
                </Button>

              </form>

              {error && (
                  <p className="text-sm text-red-500 mt-4">{error}</p>
              )}

              <p className="text-sm text-muted-foreground mt-6 text-center">
                ¿No tienes cuenta?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Regístrate
                </Link>
              </p>

            </CardContent>
          </Card>
        </div>
    )
  }

