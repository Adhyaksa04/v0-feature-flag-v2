"use client"

import { useState, useEffect } from "react"
import type { FeatureFlags } from "@/types/tenant"
import { FeatureFlagManager } from "@/lib/feature-flags"
import { useTenant } from "./use-tenant"

export function useFeatureFlag(featureName: keyof FeatureFlags) {
  const { tenant } = useTenant()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (tenant) {
      const flagManager = FeatureFlagManager.getInstance()
      setIsEnabled(flagManager.isFeatureEnabled(featureName, tenant))
    }
  }, [featureName, tenant])

  return isEnabled
}

export function useFeatureFlags() {
  const { tenant } = useTenant()
  const [enabledFeatures, setEnabledFeatures] = useState<Partial<FeatureFlags>>({})

  useEffect(() => {
    if (tenant) {
      const flagManager = FeatureFlagManager.getInstance()
      setEnabledFeatures(flagManager.getEnabledFeatures(tenant))
    }
  }, [tenant])

  return enabledFeatures
}
