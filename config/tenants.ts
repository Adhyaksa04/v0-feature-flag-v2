import type { TenantConfig, CountryCode } from "@/types/tenant"

export const TENANT_CONFIGS: Record<CountryCode, TenantConfig> = {
  SG: {
    countryCode: "SG",
    countryName: "Singapore",
    domain: "myapp.sg",
    greeting: "Welcome to MyApp Singapore! 🇸🇬",
    currency: "SGD",
    features: {
      promoBanner: false, // Disabled for Singapore
      advancedAnalytics: true,
      premiumSupport: true,
    },
  },
  ID: {
    countryCode: "ID",
    countryName: "Indonesia",
    domain: "myapp.id",
    greeting: "Selamat datang di MyApp Indonesia! 🇮🇩",
    currency: "IDR",
    features: {
      promoBanner: true, // Enabled for Indonesia
      advancedAnalytics: false,
      premiumSupport: false,
    },
  },
}

export const DEFAULT_TENANT: CountryCode = "SG"
