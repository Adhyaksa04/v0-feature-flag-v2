import type { FeatureFlags, CountryCode } from "@/types/tenant"
import { TenantDetector } from "./tenant-detector"

export class FeatureFlagManager {
  private static instance: FeatureFlagManager
  private tenantDetector: TenantDetector

  private constructor() {
    this.tenantDetector = TenantDetector.getInstance()
  }

  public static getInstance(): FeatureFlagManager {
    if (!FeatureFlagManager.instance) {
      FeatureFlagManager.instance = new FeatureFlagManager()
    }
    return FeatureFlagManager.instance
  }

  public isFeatureEnabled(featureName: keyof FeatureFlags, tenant?: CountryCode): boolean {
    const config = this.tenantDetector.getTenantConfig(tenant)
    return config.features[featureName] || false
  }

  public getEnabledFeatures(tenant?: CountryCode): Partial<FeatureFlags> {
    const config = this.tenantDetector.getTenantConfig(tenant)
    const enabledFeatures: Partial<FeatureFlags> = {}

    Object.entries(config.features).forEach(([key, value]) => {
      if (value) {
        enabledFeatures[key as keyof FeatureFlags] = value
      }
    })

    return enabledFeatures
  }
}
