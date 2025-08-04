export interface TenantConfig {
  countryCode: string
  countryName: string
  domain: string
  greeting: string
  currency: string
  features: FeatureFlags
}

export interface FeatureFlags {
  promoBanner: boolean
  advancedAnalytics: boolean
  premiumSupport: boolean
}

export type CountryCode = "SG" | "ID"
