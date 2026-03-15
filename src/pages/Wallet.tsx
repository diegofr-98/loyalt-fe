import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Customer() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [phoneNumber, setPhone] = useState("")
    const [business, setBusiness] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

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
            const businessId = "TU_BUSINESS_ID" // puede venir de env o props

            const relationResponse = await fetch(
                "http://localhost:8080/api/v1/customer/customer-business",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customerId,
                        businessId,
                    }),
                }
            )

            const relationData = await relationResponse.json()

            if (!relationResponse.ok) {
                throw new Error(relationData.message || "Error vinculando customer con business")
            }

            // 3️⃣ Navegar
            navigate("/wallet")

        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center px-4">
           wallet
        </div>
    )
}