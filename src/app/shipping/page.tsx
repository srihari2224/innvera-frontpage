import React from "react"
import Link from "next/link"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="max-w-[800px] mx-auto px-6 py-24 pb-32 relative z-10">
        <Link href="/" className="inline-block mb-12 text-[0.65rem] uppercase tracking-[0.2em] hover:text-[#ff6b47] transition-colors" style={{ color: "#a3a3a3" }}>
          ← Back to INNVERA
        </Link>
        <h1 className="text-[3rem] md:text-[4rem] font-black uppercase leading-[0.9] mb-12" style={{ letterSpacing: "-0.03em" }}>
          Shipping Policy
        </h1>
        <div className="space-y-8 text-[0.95rem] leading-[1.6]" style={{ color: "#a3a3a3" }}>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">1. Digital & On-Demand Delivery</h2>
            <p>Our printing platform is an on-demand, localized service. There is no physical "shipping" of printed documents through mail or courier. All prints are delivered instantly at the respective kiosk location chosen by the user.</p>
          </section>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">2. Kiosk Products (SX & DX Series)</h2>
            <p>For organizations purchasing our physical kiosks (SX-Series, DX-Series), hardware shipping, installation, and deployment timelines are detailed in the specific commercial contract and Service Level Agreement (SLA). Delivery typically ranges from 14 to 30 business days from the date of order confirmation.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
