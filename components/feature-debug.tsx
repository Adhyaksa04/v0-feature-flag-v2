"use client"

import { useFeatureFlags } from "@/hooks/use-feature-flag"
import { useTenant } from "@/hooks/use-tenant"

export default function FeatureDebug() {
  const { tenant, config } = useTenant()
  const enabledFeatures = useFeatureFlags()

  if (!config) return null

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-semibold text-gray-800 mb-3">Debug Information</h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Current Tenant:</span> {tenant} ({config.countryName})
        </div>
        <div>
          <span className="font-medium">Domain:</span> {config.domain}
        </div>
        <div>
          <span className="font-medium">Currency:</span> {config.currency}
        </div>
        <div>
          <span className="font-medium">Enabled Features:</span>
          <ul className="ml-4 mt-1">
            {Object.entries(enabledFeatures).map(([feature, enabled]) => (
              <li key={feature} className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${enabled ? "bg-green-500" : "bg-red-500"}`} />
                <span>
                  {feature}: {enabled ? "Enabled" : "Disabled"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
