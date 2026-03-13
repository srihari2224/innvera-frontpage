"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="noise-overlay" />
      <div className="vertical-grid-line" style={{ left: "16.6%" }} />
      <div className="vertical-grid-line" style={{ left: "50%" }} />
      <div className="vertical-grid-line" style={{ left: "83.3%" }} />

      <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-start px-[2rem] pt-[1.1rem] mix-blend-difference">
        <a href="/" className="group relative block overflow-hidden">
          <div className="flex flex-col text-[1.8rem] leading-[0.9] font-black uppercase tracking-tighter">
            <div className="relative overflow-hidden h-[0.9em]">
              <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-full flex">
                {"Innvera".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
              <div className="absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 flex">
                {"Innvera".split("").map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </header>

      <main className="pt-[140px] px-6 lg:px-24 pb-32 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">
          Terms of Service
          <div className="h-1 w-24 bg-[#ff6b47] mt-6" />
        </h1>

        <div className="space-y-12 text-[#a3a3a3] text-sm md:text-base leading-relaxed">
          <section>
            <p className="font-mono text-xs mb-4 text-[#ff6b47]">Last updated: March 2025</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the PRINTIT kiosk service ("Service") operated by Innvera Technologies Pvt. Ltd. ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">2. Use of Service</h2>
            <p>
              PRINTIT is a self-service document printing kiosk. Users may upload PDF and image files for printing. You agree to use the Service only for lawful purposes. You must not upload content that is obscene, defamatory, infringing, or otherwise unlawful.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">3. Payment</h2>
            <p>
              Payments are processed securely via Razorpay. All transactions are in Indian Rupees (INR). Once a payment is made and confirmed, an OTP is issued for document retrieval. The Company is not responsible for payment failures caused by third-party payment gateways.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">4. File Handling</h2>
            <p>
              Uploaded files are temporarily stored for processing and printing only. Files are automatically deleted within 24 hours of upload. The Company does not access, copy, or distribute your uploaded files.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">5. Limitation of Liability</h2>
            <p>
              The Company shall not be liable for any indirect, incidental, or consequential damages arising out of use of the Service or inability to use the Service. Our maximum liability is limited to the amount paid by you for the specific transaction.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the Service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">7. Contact</h2>
            <p>
              For questions about these Terms, contact us at <a href="mailto:legal@innvera.in" className="text-[#ff6b47] hover:underline">legal@innvera.in</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
