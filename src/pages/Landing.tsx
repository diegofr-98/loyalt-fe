import { ArrowRight, CreditCard, Gift, Store, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <section className="relative overflow-hidden">

        <div className="container relative mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm text-slate-700 backdrop-blur">
              <Store className="h-4 w-4 text-violet-600" />
              Loyalty cards built for growing small businesses
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-950 sm:text-6xl">
                Grow your business with digital loyalty cards your customers will actually use.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Loyalt helps local businesses increase repeat purchases, bring customers back more often,
                and build stronger relationships through simple digital loyalty cards and rewards.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full bg-violet-600 px-6 text-white hover:bg-violet-700"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg"
                      variant="outline"
                      className="rounded-full border-slate-300 bg-white/80 px-6"
                      onClick={() => (window.location.href = "/signin")}
              >
                Log in
              </Button>
            </div>


          </div>

          <div className="grid gap-4 lg:grid-cols-2">
         

            <div className="rounded-[2rem] border border-violet-200/70 p-6 text-slate-950 lg:col-span-2" style={{ backgroundColor: "#8f68ff" }}>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/40 p-3">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-800">
                  Segmented promotions
                </p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold">Create segmented promotions</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-800">
                Build campaigns for new, loyal, or inactive customers and launch more relevant
                messages to drive repeat visits and more purchases.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 text-slate-900 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">Growth tracking</p>
              </div>
              <p className="mt-4 text-3xl font-semibold">+28%</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Track returning customers, redeemed rewards, and the campaigns driving the best results.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-slate-800 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <CreditCard className="h-5 w-5 text-violet-300" />
                </div>
                <p className="text-sm font-medium text-slate-300">Digital loyalty cards</p>
              </div>
              <p className="mt-4 text-3xl font-semibold">Easy setup</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Launch digital cards and rewards without complex processes or extra tools.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 text-slate-900 backdrop-blur lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-900 p-3 text-white">
                  <Gift className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">Customer retention</p>
              </div>
              <p className="mt-4 text-xl font-semibold">Reward the right customers at the right time</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Turn occasional visits into repeat habits with benefits that are easy to understand and redeem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Why choose Loyalt?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-violet-600">Easy to use</CardTitle>
              <CardDescription>
                Launch a loyalty program in minutes without adding complexity to your daily operation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Designed for local businesses that need a practical way to keep customers coming back.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-violet-600">Built for growth</CardTitle>
              <CardDescription>
                Track returning customers, campaign performance, and reward activity in one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Make better decisions with a clear view of what is helping your business grow.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-violet-600">Real customer loyalty</CardTitle>
              <CardDescription>
                Give customers a reason to come back with digital cards, points, and easy-to-understand rewards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Turn repeat purchases into a habit and build stronger relationships with every visit.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-violet-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Start building customer loyalty today
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Grow your business with a loyalty experience that is simple for you and valuable for your customers.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-violet-600 hover:bg-slate-100"
            onClick={() => (window.location.href = "/signup")}
          >
            Create free account
          </Button>
        </div>
      </section>

      <footer className="bg-slate-900 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Loyalt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
