"use client"

import { Suspense } from "react"
import { useTenant } from "@/hooks/use-tenant"
import PromoBanner from "@/components/promo-banner"
import CountrySwitcher from "@/components/country-switcher"
import FeatureDebug from "@/components/feature-debug"
import { MapPin, Users, Zap } from "lucide-react"

export default function HomePage() {
  const { config, isLoading } = useTenant()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unable to detect country</h1>
          <p className="text-gray-600">Please check your domain configuration.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MyApp</h1>
          </div>
          <CountrySwitcher />
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          {/* Country-specific Promo Banner */}
          <Suspense fallback={null}>
            <PromoBanner />
          </Suspense>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{config.greeting}</h2>
            <p className="text-xl text-gray-600 mb-8">Experience our platform tailored for {config.countryName}</p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Local Experience</h3>
                <p className="text-gray-600">
                  Customized for {config.countryName} with local currency ({config.currency})
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Multi-Tenant</h3>
                <p className="text-gray-600">Seamless experience across different regions</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Feature Flags</h3>
                <p className="text-gray-600">Dynamic features controlled per country</p>
              </div>
            </div>
          </div>

          {/* Debug Information */}
          <FeatureDebug />
        </main>
      </div>
    </div>
  )
}
