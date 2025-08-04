"use client"

import { Globe } from "lucide-react"
import { useTenant } from "@/hooks/use-tenant"
import type { CountryCode } from "@/types/tenant"
import { TENANT_CONFIGS } from "@/config/tenants"

export default function CountrySwitcher() {
  const { tenant, switchTenant } = useTenant()

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg">
      <Globe className="h-4 w-4 text-gray-600" />
      <span className="text-sm text-gray-600">Country:</span>
      <select
        value={tenant || ""}
        onChange={(e) => switchTenant(e.target.value as CountryCode)}
        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
      >
        {Object.entries(TENANT_CONFIGS).map(([code, config]) => (
          <option key={code} value={code}>
            {config.countryName} ({code})
          </option>
        ))}
      </select>
    </div>
  )
}
