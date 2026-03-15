import { useState } from "react"
import { useNavigate, useParams  } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Customer() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhone] = useState("")

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const { businessId } = useParams()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // 1️⃣ Crear customer
            const customerResponse = await fetch("http://localhost:8080/api/v1/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    phoneNumber,
                }),
            })

            const customerData = await customerResponse.json()

            if (!customerResponse.ok) {
                throw new Error(customerData.message || "Error creando el customer")
            }

            const { customerId } = customerData

            // 2️⃣ Crear relación customer-business
            const relationResponse = await fetch(
                "http://localhost:8080/api/v1/customer/customer-business", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId,
                    businessId, // viene desde la URL
            })
                })


            const relationData = await relationResponse.json()

            if (!relationResponse.ok) {
                throw new Error(relationData.message || "Error vinculando customer con business")
            }

            navigate("/wallet")

        } catch (err: any) {
            setError(err.message)
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