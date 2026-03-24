import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { createBusiness } from "@/api/requests"
import { useBusiness } from "@/hooks/useBusiness"

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessTypeId: z.string().min(1, "Business type is required"),
})

type FormData = z.infer<typeof schema>

export default function Business() {
  const navigate = useNavigate()
  const { setBusiness } = useBusiness()

  const [businessTypes, setBusinessTypes] = useState<any[]>([])
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  useEffect(() => {
    const fetchTypes = async () => {
      const { data } = await supabase.from("business_type").select("*")
      if (data) setBusinessTypes(data)
    }

    fetchTypes()
  }, [])

  const uploadLogo = async () => {
    if (!logoFile) return null

    const fileName = `${Date.now()}-${logoFile.name}`

    const { error } = await supabase.storage
      .from("business-logos")
      .upload(fileName, logoFile)

    if (error) {
      setError(error.message)
      return null
    }

    const { data } = supabase.storage
      .from("business-logos")
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const onSubmit = async (form: FormData) => {
    setLoading(true)
    setError(null)

    try {
      const logoUrl = await uploadLogo()

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error("No session")
      }

      if (!logoUrl) {
        throw new Error("No logo url")
      }

      const business = await createBusiness(
        form.businessName,
        form.businessTypeId,
        logoUrl,
        session.access_token
      )

      if (business.error) {
        setError(business.error)
      } else {
        setBusiness(business)
        navigate("/dashboard", { state: { businessId: business.uuid } })
      }
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up your business</CardTitle>
          <CardDescription>
            It only takes a few seconds
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Business name"
              {...register("businessName")}
            />

            <Select
              onValueChange={(value) =>
                setValue("businessTypeId", value, { shouldValidate: true })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Business type" />
              </SelectTrigger>

              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.uuid} value={type.uuid}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return

                setLogoFile(file)
                setLogoPreview(URL.createObjectURL(file))
              }}
            />

            {logoPreview && (
              <img
                src={logoPreview}
                className="h-20 rounded-md object-cover"
              />
            )}

            <Button
              className="w-full"
              disabled={!isValid || !logoFile || loading}
            >
              {loading ? "Creating business..." : "Continue"}
            </Button>
          </form>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
