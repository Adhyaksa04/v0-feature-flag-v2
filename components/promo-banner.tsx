"use client"

import { lazy, Suspense } from "react"
import { useFeatureFlag } from "@/hooks/use-feature-flag"
import { useTenant } from "@/hooks/use-tenant"

// Lazy load the actual banner component to prevent loading for countries that don't need it
const PromoBannerContent = lazy(() => import("./promo-banner-content"))

export default function PromoBanner() {
  const isPromoEnabled = useFeatureFlag("promoBanner")
  const { tenant } = useTenant()

  // Don't render anything if feature is disabled
  if (!isPromoEnabled) {
    return null
  }

  return (
    <Suspense fallback={<div className="h-16 bg-gradient-to-r from-orange-400 to-red-500 animate-pulse rounded-lg" />}>
      <PromoBannerContent tenant={tenant} />
    </Suspense>
  )
}
