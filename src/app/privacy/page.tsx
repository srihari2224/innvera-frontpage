"use client"

export default function PrivacyPage() {
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
          Privacy Policy
          <div className="h-1 w-24 bg-[#ff6b47] mt-6" />
        </h1>

        <div className="space-y-12 text-[#a3a3a3] text-sm md:text-base leading-relaxed">
          <section>
            <p className="font-mono text-xs mb-4 text-[#ff6b47]">Last updated: March 2025</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">1. Information We Collect</h2>
            <p className="mb-4">When you use PRINTIT, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Files you upload for printing — stored temporarily and deleted within 24 hours.</li>
              <li>Transaction data including payment ID, amount, kiosk ID, and timestamp.</li>
              <li>Contact details (phone/email) you provide during payment, used solely for OTP delivery and support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">2. How We Use Your Information</h2>
            <p>
              We use collected information strictly to: process print jobs, verify payments, send OTP codes, resolve support tickets, and improve our service. We do not sell, rent, or share your personal data with third parties except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">3. Data Retention</h2>
            <p>
              Uploaded files are deleted within 24 hours. Transaction records are retained for 90 days for audit purposes. Support ticket information is retained for 6 months. You may request deletion of your data by contacting privacy@innvera.in.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">4. Security</h2>
            <p>
              All data is transmitted over HTTPS. Payments are processed by Razorpay under PCI-DSS compliance. We employ industry-standard security measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">5. Cookies</h2>
            <p>
              We use only functional cookies necessary for the service to operate (e.g., theme preference). No advertising or tracking cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. To exercise these rights, please contact privacy@innvera.in with your request.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">7. Contact</h2>
            <p>
              For privacy concerns, contact: <a href="mailto:privacy@innvera.in" className="text-[#ff6b47] hover:underline">privacy@innvera.in</a> | Innvera Technologies Pvt. Ltd., India.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
