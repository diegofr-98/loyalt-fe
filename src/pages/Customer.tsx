import { useState } from "react"
import { useNavigate, useParams  } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useCustomer } from "@/hooks/useCustomer"

export default function Customer() {

    const navigate = useNavigate()

    const { businessId } = useParams()

    const { registerCustomer } = useCustomer()
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhone] = useState("")


    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (!businessId) {
            setError("BusinessId no encontrado en la URL")
            setLoading(false)
            return
        }

        try {

            const { customer, customerBusiness } =
                await registerCustomer(email, phoneNumber, businessId!)

            console.log(customer)
            console.log(customerBusiness)

            navigate("/wallet")

        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Acumula puntos y canjealos por premios deliciosos GRATIS</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="form-phone">Celular</Label>
                            <Input
                                id="form-phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={phoneNumber}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Enviando..." : "Enviar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}