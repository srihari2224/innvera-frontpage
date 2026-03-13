"use client"

import { useState } from "react"

const KIOSK_BACKEND = "https://kiosk-backend-t1mi.onrender.com"

interface FormData {
  serviceType: "KSS" | "MKS" | ""
  kioskType: "SX-Series" | "DX-Series" | ""
  ipAddress: string
  cpuUsername: string
  cpuPassword: string
  printer1Capacity: string
  printer2Capacity: string
  kioskId: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  address: string
  lat: string
  lng: string
  password: string
  confirmPassword: string
}

const STEPS = ["Service Type", "Kiosk Hardware", "Owner Details", "Confirm"]

const emptyForm = (): FormData => ({
  serviceType: "",
  kioskType: "",
  ipAddress: "",
  cpuUsername: "",
  cpuPassword: "",
  printer1Capacity: "",
  printer2Capacity: "",
  kioskId: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  address: "",
  lat: "",
  lng: "",
  password: "",
  confirmPassword: "",
})

export default function KioskRegistration() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState<FormData>(emptyForm())

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const validateStep = (): string => {
    if (step === 1) {
      if (!form.serviceType) return "Please select a service type."
    }
    if (step === 2) {
      if (!form.kioskType) return "Please select a kiosk type."
      if (!form.ipAddress.trim()) return "IP Address is required."
      if (!form.cpuUsername.trim()) return "CPU Username is required."
      if (!form.cpuPassword.trim()) return "CPU Password is required."
      if (!form.printer1Capacity) return "Printer 1 paper capacity is required."
      if (form.kioskType === "DX-Series" && !form.printer2Capacity)
        return "Printer 2 paper capacity is required for DX-Series."
    }
    if (step === 3) {
      if (!form.kioskId.trim()) return "Kiosk ID is required."
      if (!/^[a-zA-Z0-9_-]+$/.test(form.kioskId))
        return "Kiosk ID: letters, numbers, dash and underscore only."
      if (!form.ownerName.trim()) return "Owner name is required."
      if (!form.ownerPhone.trim()) return "Phone number is required."
      if (!form.ownerEmail.trim() || !form.ownerEmail.includes("@"))
        return "Enter a valid Gmail address."
      if (!form.address.trim()) return "Address is required."
      if (!form.lat.trim() || !form.lng.trim()) return "Latitude and longitude are required."
      if (isNaN(parseFloat(form.lat)) || isNaN(parseFloat(form.lng)))
        return "Latitude and longitude must be valid numbers."
      if (!form.password || form.password.length < 6)
        return "Password must be at least 6 characters."
      if (form.password !== form.confirmPassword) return "Passwords do not match."
    }
    return ""
  }

  const goNext = () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setError("")
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setError("")
    setStep((s) => s - 1)
  }

  const resetForm = () => {
    setForm(emptyForm())
    setStep(1)
    setError("")
    setSuccess(false)
  }

  const handleSubmit = async () => {
    const err = validateStep()
    if (err) { setError(err); return }
    setLoading(true)
    setError("")

    try {
      const body = {
        username: form.kioskId.trim(),
        password: form.password,
        kioskType: form.kioskType,
        serviceType: form.serviceType,
        ipAddress: form.ipAddress.trim(),
        cpuUsername: form.cpuUsername.trim(),
        cpuPassword: form.cpuPassword,
        printer1Capacity: form.printer1Capacity,
        printer2Capacity: form.kioskType === "DX-Series" ? form.printer2Capacity : undefined,
        ownerName: form.ownerName.trim(),
        ownerPhone: form.ownerPhone.trim(),
        ownerEmail: form.ownerEmail.trim(),
        address: form.address.trim(),
        lat: form.lat.trim(),
        lng: form.lng.trim(),
      }

      const res = await fetch(`${KIOSK_BACKEND}/api/kiosk/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || "Registration failed")
      setSuccess(true)
    } catch (e: any) {
      setError(e.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /* ── Reusable Input Field ── */
  const Field = ({
    label, value, onChange, placeholder = "", type = "text", hint,
  }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; hint?: string;
  }) => (
    <div className="border-t border-white/10 pt-4 pb-3">
      <label className="block text-[0.6rem] uppercase tracking-[0.2em] font-semibold text-[#a3a3a3] mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={type === "password" ? "new-password" : "off"}
        className="w-full bg-transparent text-white text-[1rem] font-medium outline-none placeholder:text-[#333]"
        style={{ caretColor: "#ff6b47" }}
      />
      {hint && <p className="text-[#555] text-[0.6rem] mt-1 uppercase tracking-wider">{hint}</p>}
    </div>
  )

  /* ── Success panel ── */
  if (success) {
    return (
      <div className="max-w-[680px]" style={{ fontFamily: '"Inter", sans-serif' }}>
        <div className="border border-white/10 p-10 text-center" style={{ background: "#050505" }}>
          <div
            className="w-14 h-14 mx-auto mb-6 flex items-center justify-center text-2xl font-black"
            style={{ background: "#ff6b47", color: "#000" }}
          >
            ✓
          </div>
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-[#ff6b47] mb-3">
            Registration Submitted
          </p>
          <h2 className="text-[2rem] font-black uppercase tracking-tighter leading-none mb-4">
            Waiting for<br />Approval
          </h2>
          <p className="text-[#a3a3a3] text-[0.85rem] leading-relaxed max-w-[360px] mx-auto">
            An approval request has been dispatched to <strong className="text-white">msrihari2224@gmail.com</strong>. Once approved, the owner will receive their registration certificate at <strong className="text-[#ff6b47]">{form.ownerEmail}</strong>.
          </p>
          <button
            onClick={resetForm}
            className="mt-8 px-6 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all hover:opacity-80"
            style={{ background: "#ff6b47", color: "#000" }}
          >
            Register Another Kiosk
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[680px]" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* ── Header ── */}
      <div className="mb-1">
        <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#ff6b47] mb-1">Admin Panel</p>
        <h1 className="text-[2rem] font-black uppercase tracking-tighter leading-none mb-6">
          Register Kiosk
        </h1>
      </div>

      <div className="border border-white/10" style={{ background: "#050505" }}>
        {/* ── Step indicator ── */}
        <div className="flex border-b border-white/10">
          {STEPS.map((label, i) => {
            const num = i + 1
            const active = step === num
            const done = step > num
            return (
              <div
                key={label}
                className="flex-1 px-3 py-3 text-center"
                style={{
                  borderRight: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                  background: active ? "rgba(255,107,71,0.06)" : "transparent",
                }}
              >
                <div
                  className="text-[0.5rem] font-black uppercase tracking-[0.2em]"
                  style={{ color: active ? "#ff6b47" : done ? "#4a4a4a" : "#2a2a2a" }}
                >
                  {String(num).padStart(2, "0")}
                </div>
                <div
                  className="text-[0.55rem] uppercase tracking-[0.08em] mt-0.5 hidden sm:block"
                  style={{ color: active ? "#ffffff" : done ? "#555" : "#2a2a2a" }}
                >
                  {label}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Form body ── */}
        <div className="px-8 py-7">

          {/* STEP 1 — Service Type */}
          {step === 1 && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-6">
                Select the service model for this kiosk.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {(["KSS", "MKS"] as const).map((type) => {
                  const labels: Record<string, string> = {
                    KSS: "Kiosk Sale Services",
                    MKS: "Managed Kiosk Services",
                  }
                  const selected = form.serviceType === type
                  return (
                    <button
                      key={type}
                      onClick={() => set("serviceType", type)}
                      className="p-6 text-left transition-all border"
                      style={{
                        borderColor: selected ? "#ff6b47" : "rgba(255,255,255,0.08)",
                        background: selected ? "rgba(255,107,71,0.08)" : "transparent",
                      }}
                    >
                      <div className="text-[0.55rem] uppercase tracking-[0.25em] mb-2 font-black"
                        style={{ color: selected ? "#ff6b47" : "#555" }}>
                        {type}
                      </div>
                      <div className="text-[1rem] font-black uppercase tracking-tight leading-tight"
                        style={{ color: selected ? "#ffffff" : "#a3a3a3" }}>
                        {labels[type]}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 2 — Kiosk Type + Hardware */}
          {step === 2 && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-6">
                Select hardware type and enter access details.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-2">
                {(["SX-Series", "DX-Series"] as const).map((type) => {
                  const selected = form.kioskType === type
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        set("kioskType", type)
                        if (type === "SX-Series") set("printer2Capacity", "")
                      }}
                      className="p-5 text-left border transition-all"
                      style={{
                        borderColor: selected ? "#ff6b47" : "rgba(255,255,255,0.08)",
                        background: selected ? "rgba(255,107,71,0.08)" : "transparent",
                      }}
                    >
                      <div className="text-[0.55rem] uppercase tracking-[0.25em] mb-1 font-black"
                        style={{ color: selected ? "#ff6b47" : "#555" }}>
                        {type === "SX-Series" ? "Single Printer" : "Dual Printer"}
                      </div>
                      <div className="text-[1.1rem] font-black uppercase tracking-tight"
                        style={{ color: selected ? "#fff" : "#a3a3a3" }}>
                        {type}
                      </div>
                    </button>
                  )
                })}
              </div>

              <Field label="IP Address" value={form.ipAddress} onChange={(v) => set("ipAddress", v)} placeholder="192.168.1.100" hint="SSH IP of the kiosk device" />
              <Field label="CPU Username" value={form.cpuUsername} onChange={(v) => set("cpuUsername", v)} placeholder="innvera-printit-01" />
              <Field label="CPU Password" value={form.cpuPassword} onChange={(v) => set("cpuPassword", v)} placeholder="device password" hint="Plain text — used to frame the SSH command" />

              {form.kioskType && (
                <>
                  <Field
                    label="Printer 1 Paper Capacity"
                    type="number"
                    value={form.printer1Capacity}
                    onChange={(v) => set("printer1Capacity", v)}
                    placeholder="e.g. 250"
                    hint="Total sheet capacity of Printer 1"
                  />
                  {form.kioskType === "DX-Series" && (
                    <Field
                      label="Printer 2 Paper Capacity"
                      type="number"
                      value={form.printer2Capacity}
                      onChange={(v) => set("printer2Capacity", v)}
                      placeholder="e.g. 250"
                      hint="Total sheet capacity of Printer 2"
                    />
                  )}
                </>
              )}

              {form.cpuUsername && form.ipAddress && (
                <div className="mt-4 p-3 border border-white/10 flex items-center gap-3" style={{ background: "#0a0a0a" }}>
                  <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#555]">SSH Preview</span>
                  <code className="text-[0.75rem] text-[#ff6b47] font-mono">
                    ssh {form.cpuUsername}@{form.ipAddress}
                  </code>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Owner Details */}
          {step === 3 && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-4">
                Enter owner and location information.
              </p>
              <Field label="Kiosk ID (Login Username)" value={form.kioskId} onChange={(v) => set("kioskId", v)} placeholder="america" hint="Alphanumeric only — used as login ID and kiosk identifier" />
              <Field label="Owner Name" value={form.ownerName} onChange={(v) => set("ownerName", v)} placeholder="Full name" />
              <Field label="Phone Number" value={form.ownerPhone} onChange={(v) => set("ownerPhone", v)} placeholder="+91 9000000000" type="tel" />
              <Field label="Gmail" value={form.ownerEmail} onChange={(v) => set("ownerEmail", v)} placeholder="owner@gmail.com" type="email" hint="Certificate and approval emails will be sent here" />
              <Field label="Address" value={form.address} onChange={(v) => set("address", v)} placeholder="Full physical address" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Latitude" value={form.lat} onChange={(v) => set("lat", v)} placeholder="17.3850" type="number" />
                <Field label="Longitude" value={form.lng} onChange={(v) => set("lng", v)} placeholder="78.4867" type="number" />
              </div>
              <Field label="Password" value={form.password} onChange={(v) => set("password", v)} placeholder="Min. 6 characters" type="password" />
              <Field label="Confirm Password" value={form.confirmPassword} onChange={(v) => set("confirmPassword", v)} placeholder="Re-enter password" type="password" />
            </div>
          )}

          {/* STEP 4 — Confirmation Summary */}
          {step === 4 && (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-[#a3a3a3] mb-6">
                Review all details before submitting.
              </p>

              {[
                { label: "Service Type", value: form.serviceType },
                { label: "Kiosk Type", value: form.kioskType },
                { label: "IP Address", value: form.ipAddress },
                { label: "CPU Username", value: form.cpuUsername },
                { label: "CPU Password", value: "*".repeat(form.cpuPassword.length) },
                { label: "Printer 1 Capacity", value: `${form.printer1Capacity} sheets` },
                ...(form.kioskType === "DX-Series" ? [{ label: "Printer 2 Capacity", value: `${form.printer2Capacity} sheets` }] : []),
                { label: "Kiosk ID", value: form.kioskId },
                { label: "Owner Name", value: form.ownerName },
                { label: "Phone", value: form.ownerPhone },
                { label: "Gmail", value: form.ownerEmail },
                { label: "Address", value: form.address },
                { label: "Location", value: `${form.lat}, ${form.lng}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#555]">{label}</span>
                  <span className="text-[0.8rem] text-[#a3a3a3] font-medium text-right max-w-[60%] truncate">{value || "-"}</span>
                </div>
              ))}

              <div className="mt-6 p-4 border border-white/10" style={{ background: "#0a0a0a" }}>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#555] mb-1">SSH Command</p>
                <code className="text-[0.75rem] text-[#ff6b47] font-mono">
                  ssh {form.cpuUsername}@{form.ipAddress}
                </code>
              </div>

              <div className="mt-4 p-4 border-l-2 border-[#ff6b47]" style={{ background: "rgba(255,107,71,0.05)" }}>
                <p className="text-[0.65rem] text-[#a3a3a3] leading-relaxed">
                  Submitting will send an approval request + PDF certificate to{" "}
                  <strong className="text-white">msrihari2224@gmail.com</strong>.{" "}
                  Once approved, the owner gets their certificate at{" "}
                  <strong className="text-[#ff6b47]">{form.ownerEmail}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 p-3 border border-[rgba(255,107,71,0.3)]" style={{ background: "rgba(255,107,71,0.05)" }}>
              <p className="text-[0.7rem] text-[#ff6b47] uppercase tracking-[0.15em]">{error}</p>
            </div>
          )}
        </div>

        {/* ── Footer navigation ── */}
        <div className="flex justify-between items-center px-8 py-5 border-t border-white/10" style={{ background: "#030303" }}>
          {step > 1 ? (
            <button
              onClick={goBack}
              className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-[#555] hover:text-white transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={goNext}
              className="px-7 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all hover:opacity-80"
              style={{ background: "#ff6b47", color: "#000" }}
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: loading ? "#555" : "#ff6b47", color: "#000" }}
            >
              {loading ? "Submitting..." : "Confirm Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
