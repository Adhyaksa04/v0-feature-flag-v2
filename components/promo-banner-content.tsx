import { Gift, Sparkles } from "lucide-react"
import type { CountryCode } from "@/types/tenant"

interface PromoBannerContentProps {
  tenant: CountryCode | null
}

export default function PromoBannerContent({ tenant }: PromoBannerContentProps) {
  const getPromoContent = () => {
    switch (tenant) {
      case "ID":
        return {
          title: "Promo Spesial Indonesia! 🎉",
          description: "Dapatkan diskon 800% untuk pengguna baru!",
          cta: "Klaim Sekarang",
          bgColor: "from-red-500 to-orange-600",
        }
      default:
        return {
          title: "Special Promotion! 🎉",
          description: "Get 50% off for new users!",
          cta: "Claim Now",
          bgColor: "from-blue-500 to-purple-600",
        }
    }
  }

  const promo = getPromoContent()

  return (
    <div className={`bg-gradient-to-r ${promo.bgColor} text-white p-4 rounded-lg shadow-lg mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6" />
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{promo.title}</h3>
            <p className="text-sm opacity-90">{promo.description}</p>
          </div>
        </div>
        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {promo.cta}
        </button>
      </div>
    </div>
  )
}
