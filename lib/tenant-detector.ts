import type { CountryCode } from "@/types/tenant"
import { TENANT_CONFIGS, DEFAULT_TENANT } from "@/config/tenants"

export class TenantDetector {
  private static instance: TenantDetector
  private currentTenant: CountryCode | null = null

  private constructor() {}

  public static getInstance(): TenantDetector {
    if (!TenantDetector.instance) {
      TenantDetector.instance = new TenantDetector()
    }
    return TenantDetector.instance
  }

  public detectTenant(): CountryCode {
    if (this.currentTenant) {
      return this.currentTenant
    }

    // In a real application, you would use window.location.hostname
    // For demo purposes, we'll simulate domain detection
    const hostname = typeof window !== "undefined" ? window.location.hostname : ""

    // Check if hostname matches any tenant domain
    for (const [countryCode, config] of Object.entries(TENANT_CONFIGS)) {
      if (hostname.includes(config.domain) || hostname.includes(countryCode.toLowerCase())) {
        this.currentTenant = countryCode as CountryCode
        return this.currentTenant
      }
    }

    // For demo purposes, allow manual switching via URL params
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const country = urlParams.get("country")?.toUpperCase() as CountryCode
      if (country && TENANT_CONFIGS[country]) {
        this.currentTenant = country
        return this.currentTenant
      }
    }

    this.currentTenant = DEFAULT_TENANT
    return this.currentTenant
  }

  public getCurrentTenant(): CountryCode {
    return this.currentTenant || this.detectTenant()
  }

  public getTenantConfig(tenant?: CountryCode) {
    const targetTenant = tenant || this.getCurrentTenant()
    return TENANT_CONFIGS[targetTenant]
  }
}
