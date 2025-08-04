"use client"

import { useState, useEffect } from "react"
import type { CountryCode, TenantConfig } from "@/types/tenant"
import { TenantDetector } from "@/lib/tenant-detector"

export function useTenant() {
  const [tenant, setTenant] = useState<CountryCode | null>(null)
  const [config, setConfig] = useState<TenantConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detector = TenantDetector.getInstance()
    const currentTenant = detector.detectTenant()
    const tenantConfig = detector.getTenantConfig(currentTenant)

    setTenant(currentTenant)
    setConfig(tenantConfig)
    setIsLoading(false)
  }, [])

  const switchTenant = (newTenant: CountryCode) => {
    const detector = TenantDetector.getInstance()
    const newConfig = detector.getTenantConfig(newTenant)
    setTenant(newTenant)
    setConfig(newConfig)

    // Update URL for demo purposes
    const url = new URL(window.location.href)
    url.searchParams.set("country", newTenant)
    window.history.pushState({}, "", url.toString())
  }

  return {
    tenant,
    config,
    isLoading,
    switchTenant,
  }
}
