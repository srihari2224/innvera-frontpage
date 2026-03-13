"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import KioskRegistration from "@/app/dashboard/admin/components/KioskRegistration"
import RegisteredKiosks from "@/app/dashboard/admin/components/RegisteredKiosks"
import AdminAnalytics from "@/app/dashboard/admin/components/AdminAnalytics"

const KIOSK_BACKEND = "https://kiosk-backend-t1mi.onrender.com"

const NAV_ITEMS = [
  { id: "registration", label: "Kiosk Registration", num: "01" },
  { id: "kiosks", label: "Registered Kiosks", num: "02" },
  { id: "analytics", label: "Analytics & Revenue", num: "03" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [active, setActive] = useState("registration")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState("")
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('pp-theme')
    const dark = saved !== 'light'
    setIsDark(dark)
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('pp-theme', next ? 'dark' : 'light')
    document.body.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    try {
      const auth = localStorage.getItem("innvera-auth")
      if (!auth) {
        router.push("/sign-in")
        return
      }
      const parsed = JSON.parse(auth)
      if (parsed.role !== "admin") {
        router.push("/sign-in")
        return
      }
      setAdminEmail(parsed.email || "Admin User")
      setLoading(false)
    } catch {
      router.push("/sign-in")
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("innvera-auth")
    router.push("/sign-in")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: "#4a4a4a" }}>
          Verifying access...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Noise */}
      <div className="noise-overlay" />

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-[260px] min-h-screen border-r"
        style={{ background: "#050505", borderColor: "rgba(255,255,255,0.08)" }}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <a href="/" className="text-[1.4rem] font-black uppercase tracking-tighter">INNVERA</a>
          <p className="text-[0.55rem] uppercase tracking-[0.25em] mt-1" style={{ color: "#a3a3a3" }}>
            Admin Control Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="w-full text-left flex items-center gap-3 px-3 py-3 mb-1 transition-all duration-200 group"
              style={{
                background: active === item.id ? "rgba(255,107,71,0.1)" : "transparent",
                borderLeft: active === item.id ? "2px solid #ff6b47" : "2px solid transparent",
              }}
            >
              <span
                className="text-[0.55rem] font-mono tracking-[0.2em]"
                style={{ color: active === item.id ? "#ff6b47" : "#4a4a4a" }}
              >
                {item.num}
              </span>
              <span
                className="text-[0.75rem] uppercase tracking-[0.1em] font-semibold"
                style={{ color: active === item.id ? "#fff" : "#a3a3a3" }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>


      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 py-4 border-b gap-4 lg:gap-0"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex justify-between w-full lg:w-auto items-center">
            <div>
              <p className="text-[0.55rem] uppercase tracking-[0.25em] mb-0.5" style={{ color: "#4a4a4a" }}>
                Admin Dashboard
              </p>
              <h1 className="text-[1.2rem] font-black uppercase tracking-tight leading-none">
                {NAV_ITEMS.find((i) => i.id === active)?.label}
              </h1>
            </div>
            {/* Mobile nav trigger */}
            <button className="lg:hidden ml-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <div className="flex flex-col gap-1.5">
                <div className="w-5 h-[1px]" style={{ background: isDark ? "#fff" : "#000" }} />
                <div className="w-5 h-[1px]" style={{ background: isDark ? "#fff" : "#000" }} />
              </div>
            </button>
          </div>

          <div className="flex items-center gap-6 self-end lg:self-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-[0.6rem] uppercase tracking-[0.2em] font-bold"
              style={{ color: "#a3a3a3" }}
            >
              Mode: {isDark ? "Dark" : "Light"}
            </button>

            {/* User + Sign Out */}
            <div className="flex items-center gap-4 border-l pl-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="text-right hidden sm:block">
                <p className="text-[0.5rem] uppercase tracking-[0.15em]" style={{ color: "#4a4a4a" }}>Signed in as</p>
                <p className="text-[0.65rem] font-medium" style={{ color: "#a3a3a3" }}>{adminEmail}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] border transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: isDark ? "#fff" : "#000" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            {active === "registration" && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <KioskRegistration />
              </motion.div>
            )}
            {active === "kiosks" && (
              <motion.div
                key="kiosks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <RegisteredKiosks />
              </motion.div>
            )}
            {active === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <AdminAnalytics />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
