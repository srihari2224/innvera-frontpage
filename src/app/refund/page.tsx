import React from "react"
import Link from "next/link"

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="max-w-[800px] mx-auto px-6 py-24 pb-32 relative z-10">
        <Link href="/" className="inline-block mb-12 text-[0.65rem] uppercase tracking-[0.2em] hover:text-[#ff6b47] transition-colors" style={{ color: "#a3a3a3" }}>
          ← Back to INNVERA
        </Link>
        <h1 className="text-[3rem] md:text-[4rem] font-black uppercase leading-[0.9] mb-12" style={{ letterSpacing: "-0.03em" }}>
          Refund Policy
        </h1>
        <div className="space-y-8 text-[0.95rem] leading-[1.6]" style={{ color: "#a3a3a3" }}>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">1. Print Quality Issues</h2>
            <p>If a document fails to print correctly due to a kiosk malfunction (e.g., ink smudges, paper jams, blank pages), the user is entitled to a full refund or a free reprint. Users must report the issue within 24 hours of the original transaction by contacting support.</p>
          </section>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">2. User Errors</h2>
            <p>We do not offer refunds for mistakes made by the user, such as printing the wrong document, selecting the wrong color mode, or choosing an incorrect number of copies.</p>
          </section>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">3. Payment Failures</h2>
            <p>If money is deducted from your account but the transaction fails to complete and no OTP is generated, an automatic refund will be initiated by our payment partner (Razorpay) within 5-7 business days.</p>
          </section>
          <section>
            <h2 className="text-[1.2rem] font-bold text-white uppercase tracking-tight mb-4">4. Contacting Support</h2>
            <p>To request a refund, please email support@innvera.co with your Transaction ID, Kiosk ID, and a brief description of the issue.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
