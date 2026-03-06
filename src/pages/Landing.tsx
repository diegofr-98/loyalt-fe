import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenido a <span className="text-indigo-600">Loyalt</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          La plataforma definitiva para programas de fidelización que impulsa el crecimiento de tu negocio.
          Atrae, retiene y recompensa a tus clientes de manera efectiva.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.href = "/signup"}>
            Comenzar Ahora
          </Button>
          <Button size="lg" variant="outline">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          ¿Por qué elegir Loyalt?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-indigo-600">Fácil de Usar</CardTitle>
              <CardDescription>
                Interfaz intuitiva que permite configurar programas de fidelización en minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Sin necesidad de conocimientos técnicos avanzados. Nuestra plataforma es accesible para todos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-indigo-600">Análisis Avanzado</CardTitle>
              <CardDescription>
                Métricas detalladas para entender el comportamiento de tus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Toma decisiones informadas con reportes en tiempo real y análisis predictivos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-indigo-600">Integración Total</CardTitle>
              <CardDescription>
                Conecta con tus sistemas existentes sin complicaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                API robusta y conectores preconfigurados para ERP, CRM y plataformas de e-commerce.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¡Comienza a fidelizar a tus clientes hoy!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de empresas que ya confían en Loyalt para impulsar su crecimiento.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100" onClick={() => window.location.href = "/signup"}>
            Registrarse Gratis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Loyalt. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
