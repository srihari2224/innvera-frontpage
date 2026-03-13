"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { generateInvoicePDF } from "@/utils/generateInvoicePDF"
import { QRCodeSVG } from "qrcode.react"

const KIOSK_BACKEND = "https://kiosk-backend-t1mi.onrender.com"
const FILE_UPLOADER_API = "https://printing-pixel-1.onrender.com"

interface Kiosk {
  kioskId: string
  kioskType?: string
  serviceType?: string
  ipAddress?: string
  ownerName?: string
  ownerPhone?: string
  ownerEmail?: string
  address?: string
  locationName?: string
  geo?: { lat: number; lng: number }
  status: string
  createdAt?: string
  bankDetails?: {
    accountName: string
    accountNumber: string
    ifscCode: string
    bankName: string
  }
  settlements?: {
    _id: string
    amount: number
    transactionId: string
    proofImage?: string
    fromDate: string
    toDate: string
    status: string
    createdAt: string
  }[]
}

export default function RegisteredKiosks() {
  const [kiosks, setKiosks] = useState<Kiosk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selected, setSelected] = useState<Kiosk | null>(null)
  const [dlLoading, setDlLoading] = useState<string | null>(null)
  
  const [kioskToDelete, setKioskToDelete] = useState<Kiosk | null>(null)
  const [deleteInput, setDeleteInput] = useState("")

  const [editingBank, setEditingBank] = useState(false)
  const [bankForm, setBankForm] = useState({ accountName: "", accountNumber: "", ifscCode: "", bankName: "" })
  const [bankSaving, setBankSaving] = useState(false)

  // QR / Certificate / Delete / Invoice states
  const [qrCopied, setQrCopied] = useState(false)
  const [viewCert, setViewCert] = useState(false)
  const [certBlobUrl, setCertBlobUrl] = useState<string | null>(null)
  const [certLoading, setCertLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [invoicePdfUrl, setInvoicePdfUrl] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const isDark = typeof window !== "undefined" ? localStorage.getItem("pp-theme") !== "light" : true
  const borderMuted = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"
  const borderStrong = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)"
  const surfaceBg = isDark ? "#050505" : "#ffffff"
  const labelColor = isDark ? "#4a4a4a" : "#6b7280"
  const textColor = isDark ? "#ffffff" : "#111111"
  const subBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"

  // Settlement States
  const [showSettlementForm, setShowSettlementForm] = useState(false)
  const [settlementForm, setSettlementForm] = useState({
    amount: "",
    transactionId: "",
    fromDate: "",
    toDate: "",
    proofImage: "" // base64
  })
  const [settlementSaving, setSettlementSaving] = useState(false)

  useEffect(() => {
    if (selected) {
      setBankForm(selected.bankDetails || { accountName: "", accountNumber: "", ifscCode: "", bankName: "" })
      setEditingBank(false)
      setViewCert(false)
      setCertBlobUrl(null)
      setShowSettlementForm(false)
      setSettlementForm({ amount: "", transactionId: "", fromDate: "", toDate: "", proofImage: "" })
    }
  }, [selected])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setSettlementForm(prev => ({ ...prev, proofImage: event.target?.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleSaveSettlement = async () => {
    if (!selected) return
    if (!settlementForm.amount || !settlementForm.transactionId || !settlementForm.fromDate || !settlementForm.toDate) {
      alert("Please fill all required settlement fields.")
      return
    }
    setSettlementSaving(true)
    try {
      const res = await fetch(`${KIOSK_BACKEND}/api/kiosk/${selected.kioskId}/settlement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settlementForm)
      })
      const data = await res.json()
      if (data.success) {
        setSelected(prev => prev ? { ...prev, settlements: data.settlements } : prev)
        setKiosks(prev => prev.map(k => k.kioskId === selected.kioskId ? { ...k, settlements: data.settlements } : k))
        setShowSettlementForm(false)
        setSettlementForm({ amount: "", transactionId: "", fromDate: "", toDate: "", proofImage: "" })
        alert("Settlement added and sent for approval!")
      } else {
        alert("Failed to add settlement: " + data.error)
      }
    } catch {
      alert("Network error saving settlement")
    } finally {
      setSettlementSaving(false)
    }
  }

  const handleSaveBank = async () => {
    if (!selected) return
    setBankSaving(true)
    try {
      const res = await fetch(`${KIOSK_BACKEND}/api/kiosk/${selected.kioskId}/bank`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankDetails: bankForm })
      })
      const data = await res.json()
      if (data.success) {
        setSelected(prev => prev ? { ...prev, bankDetails: bankForm } : prev)
        setKiosks(prev => prev.map(k => k.kioskId === selected.kioskId ? { ...k, bankDetails: bankForm } : k))
        setEditingBank(false)
      } else {
        alert("Failed to save: " + data.error)
      }
    } catch {
      alert("Network error saving bank details")
    } finally {
      setBankSaving(false)
    }
  }

  useEffect(() => {
    fetch(`${KIOSK_BACKEND}/api/kiosk/list`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setKiosks(d.kiosks)
        else setError("Failed to load kiosks")
      })
      .catch(() => setError("Network error — cannot reach kiosk backend"))
      .finally(() => setLoading(false))
  }, [])

  const downloadCertificate = async (kioskId: string) => {
    setDlLoading(kioskId)
    try {
      const res = await fetch(`${KIOSK_BACKEND}/api/kiosk/${kioskId}/certificate`)
      if (!res.ok) throw new Error("Failed")
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `innvera-kiosk-${kioskId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("Certificate download failed")
    } finally {
      setDlLoading(null)
    }
  }

  const statusColor = (s: string) =>
    s === "ACTIVE" ? "#22c55e" : s === "PENDING" ? "#ff6b47" : s === "DELETE_PENDING" ? "#ef4444" : "#4a4a4a"

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: "#4a4a4a" }}>
          Loading kiosks...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 border-l-4" style={{ background: "#0a0a0a", borderColor: "#ff6b47" }}>
        <p className="text-[0.75rem]" style={{ color: "#ff6b47" }}>{error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Count badge */}
      <div className="flex items-baseline gap-3 mb-8">
        <span className="text-[3rem] font-black leading-none">{kiosks.length}</span>
        <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "#a3a3a3" }}>
          Registered Kiosks
        </span>
      </div>

      {kiosks.length === 0 ? (
        <p className="text-[0.8rem]" style={{ color: "#4a4a4a" }}>No kiosks registered yet.</p>
      ) : (
        <div className="border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {/* Table header */}
          <div
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b text-[0.55rem] uppercase tracking-[0.2em]"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "#4a4a4a" }}
          >
            <span>Kiosk ID</span>
            <span>Type</span>
            <span>Service</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {kiosks.map((kiosk) => (
            <div
              key={kiosk.kioskId}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-4 py-4 border-b hover:bg-white hover:bg-opacity-[0.02] transition-colors items-center cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
              onClick={() => setSelected(kiosk)}
            >
              <span className="text-[0.85rem] font-bold uppercase" style={{ letterSpacing: "-0.01em" }}>
                {kiosk.kioskId}
              </span>
              <span className="text-[0.75rem]" style={{ color: "#a3a3a3" }}>
                {kiosk.kioskType || "—"}
              </span>
              <span className="text-[0.75rem]" style={{ color: "#a3a3a3" }}>
                {kiosk.serviceType || "—"}
              </span>
              <span className="text-[0.75rem]" style={{ color: "#a3a3a3" }}>
                {kiosk.ownerName || "—"}
              </span>
              <span
                className="text-[0.6rem] font-bold uppercase tracking-[0.1em]"
                style={{ color: statusColor(kiosk.status) }}
              >
                {kiosk.status}
              </span>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => downloadCertificate(kiosk.kioskId)}
                  disabled={dlLoading === kiosk.kioskId}
                  className="px-3 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ background: "#ff6b47", color: "#000" }}
                >
                  {dlLoading === kiosk.kioskId ? "..." : "PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Right-side Detail Panel */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.6)" }}
              onClick={() => setSelected(null)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative h-full w-[85vw] max-w-[1300px] min-w-[600px] flex flex-col shadow-2xl z-10"
              style={{ background: surfaceBg, borderColor: borderStrong, borderLeftWidth: "1px" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b shrink-0" style={{ borderColor: borderMuted }}>
                <div>
                  <p className="text-[0.5rem] uppercase tracking-[0.25em] mb-0.5" style={{ color: labelColor }}>Kiosk Details</p>
                  <h3 className="text-[1.5rem] font-black uppercase leading-none" style={{ letterSpacing: "-0.02em", color: textColor }}>
                    {selected.kioskId}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {/* Hidden delete — small discrete icon */}
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={selected.status === "DELETE_PENDING"}
                    title={selected.status === "DELETE_PENDING" ? "Deletion pending" : "Delete kiosk"}
                    className="w-8 h-8 flex items-center justify-center border transition-all hover:border-red-500/50 hover:text-red-400 disabled:opacity-30"
                    style={{ borderColor: borderMuted, color: labelColor }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 flex items-center justify-center border transition-colors hover:bg-white/10"
                    style={{ borderColor: borderMuted, color: labelColor }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Body — 2 column grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[1fr_1fr] h-full divide-x" style={{ borderColor: borderMuted, borderRightWidth: 0 }}>

                  {/* ── LEFT COLUMN ── */}
                  <div className="p-6 flex flex-col gap-6 overflow-y-auto">

                    {/* OVERVIEW */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-4 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>Overview</p>
                      <div className="grid grid-cols-2 gap-0">
                        {[
                          ["Status", selected.status],
                          ["Type", selected.kioskType || "—"],
                          ["Service", selected.serviceType === "KSS" ? "Kiosk Sale Services" : selected.serviceType === "MKS" ? "Managed Services" : "—"],
                          ["Owner", selected.ownerName || "—"],
                          ["Phone", selected.ownerPhone || "—"],
                          ["Email", selected.ownerEmail || "—"],
                          ["Location", selected.locationName || "—"],
                          ["Registered", selected.createdAt ? new Date(selected.createdAt).toLocaleDateString("en-IN") : "—"],
                        ].map(([label, value], i) => (
                          <div key={label} className="py-3 px-2 border-b flex flex-col gap-0.5" style={{ borderColor: borderMuted, background: i % 4 < 2 ? subBg : "transparent" }}>
                            <span className="text-[0.5rem] uppercase tracking-[0.15em]" style={{ color: labelColor }}>{label}</span>
                            <span className="text-[0.8rem] font-semibold truncate" style={{ color: textColor }} title={value as string}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* SSH ACCESS */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-3 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>SSH Access</p>
                      <div className="flex items-center justify-between p-3 border" style={{ borderColor: borderMuted, background: subBg }}>
                        <code className="text-[0.65rem] font-mono" style={{ color: "#ff6b47" }}>
                          ssh {(selected as any).username || `innvera-${selected.kioskId}`}@{selected.ipAddress || "0.0.0.0"}
                        </code>
                        <button
                          onClick={() => { navigator.clipboard.writeText(`ssh ${(selected as any).username || `innvera-${selected.kioskId}`}@${selected.ipAddress || "0.0.0.0"}`); alert("Copied!") }}
                          className="text-[0.5rem] font-bold uppercase tracking-[0.15em] border px-3 py-1 hover:bg-white hover:text-black transition-colors ml-3 shrink-0"
                          style={{ borderColor: borderStrong, color: labelColor }}
                        >Copy</button>
                      </div>
                    </section>

                    {/* QR CODE */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-3 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>Kiosk QR Code</p>
                      <div className="flex items-start gap-4 p-4 border" style={{ borderColor: borderMuted, background: subBg }}>
                        <div className="p-2 bg-white shrink-0">
                          <QRCodeSVG value={`https://pixel-livid-two.vercel.app/?kiosk_id=${selected.kioskId}`} size={80} bgColor="#fff" fgColor="#000" level="M" />
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                          <p className="text-[0.5rem] uppercase tracking-[0.15em]" style={{ color: labelColor }}>Kiosk URL</p>
                          <code className="text-[0.65rem] font-mono break-all" style={{ color: "#ff6b47" }}>
                            https://pixel-livid-two.vercel.app/?kiosk_id={selected.kioskId}
                          </code>
                          <button
                            onClick={() => { navigator.clipboard.writeText(`https://pixel-livid-two.vercel.app/?kiosk_id=${selected.kioskId}`); setQrCopied(true); setTimeout(() => setQrCopied(false), 2000) }}
                            className="self-start text-[0.5rem] font-bold uppercase tracking-[0.15em] border px-3 py-1.5 transition-all hover:bg-black hover:text-white"
                            style={{ borderColor: borderStrong, color: qrCopied ? "#22c55e" : labelColor }}
                          >{qrCopied ? "Copied!" : "Copy URL"}</button>
                        </div>
                      </div>
                    </section>

                    {/* BANK DETAILS */}
                    <section>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: borderMuted }}>
                        <p className="text-[0.5rem] uppercase tracking-[0.3em] font-bold" style={{ color: labelColor }}>Bank Details</p>
                        {!editingBank ? (
                          <button onClick={() => setEditingBank(true)} className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#ff6b47] hover:opacity-70 transition-opacity">Edit</button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button onClick={() => setEditingBank(false)} className="text-[0.5rem] font-bold uppercase tracking-[0.1em]" style={{ color: labelColor }}>Cancel</button>
                            <button onClick={handleSaveBank} disabled={bankSaving} className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#22c55e]">{bankSaving ? "Saving..." : "Save"}</button>
                          </div>
                        )}
                      </div>
                      {editingBank ? (
                        <div className="grid grid-cols-2 gap-3">
                          {([
                            ["Account Name", "accountName"],
                            ["Account Number", "accountNumber"],
                            ["IFSC Code", "ifscCode"],
                            ["Bank Name", "bankName"],
                          ] as [string, keyof typeof bankForm][]).map(([label, key]) => (
                            <div key={key} className="flex flex-col gap-1">
                              <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>{label}</label>
                              <input
                                value={bankForm[key]}
                                onChange={e => setBankForm({ ...bankForm, [key]: e.target.value })}
                                className="bg-transparent border-b px-0 py-2 text-[0.75rem] outline-none transition-all duration-200 focus:border-[#ff6b47]"
                                style={{ borderColor: borderStrong, color: textColor, caretColor: "#ff6b47" }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-0">
                          {[
                            ["Account Name", selected.bankDetails?.accountName || "—"],
                            ["Account No.", selected.bankDetails?.accountNumber || "—"],
                            ["IFSC", selected.bankDetails?.ifscCode || "—"],
                            ["Bank", selected.bankDetails?.bankName || "—"],
                          ].map(([label, value]) => (
                            <div key={label} className="py-2 px-2 border-b flex flex-col gap-0.5" style={{ borderColor: borderMuted }}>
                              <span className="text-[0.5rem] uppercase tracking-[0.15em]" style={{ color: labelColor }}>{label}</span>
                              <span className="text-[0.75rem] font-medium" style={{ color: textColor }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>

                    {/* SETTLEMENTS */}
                    <section>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b" style={{ borderColor: borderMuted }}>
                        <p className="text-[0.5rem] uppercase tracking-[0.3em] font-bold" style={{ color: labelColor }}>Settlements</p>
                        {!showSettlementForm ? (
                          <button onClick={() => setShowSettlementForm(true)} className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#ff6b47] hover:opacity-70 transition-opacity">Add New</button>
                        ) : (
                          <div className="flex items-center gap-3">
                            <button onClick={() => setShowSettlementForm(false)} className="text-[0.5rem] font-bold uppercase tracking-[0.1em]" style={{ color: labelColor }}>Cancel</button>
                            <button onClick={handleSaveSettlement} disabled={settlementSaving} className="text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#22c55e]">{settlementSaving ? "Saving..." : "Submit"}</button>
                          </div>
                        )}
                      </div>
                      {showSettlementForm ? (
                        <div className="flex flex-col gap-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1">
                              <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>Amount (₹) *</label>
                              <input type="number" value={settlementForm.amount} onChange={e => setSettlementForm({ ...settlementForm, amount: e.target.value })}
                                className="bg-transparent border-b px-0 py-2 text-[0.75rem] outline-none transition-all duration-200 focus:border-[#ff6b47]"
                                style={{ borderColor: borderStrong, color: textColor, caretColor: "#ff6b47" }} placeholder="0.00" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>Transaction ID *</label>
                              <input value={settlementForm.transactionId} onChange={e => setSettlementForm({ ...settlementForm, transactionId: e.target.value })}
                                className="bg-transparent border-b px-0 py-2 text-[0.75rem] outline-none transition-all duration-200 focus:border-[#ff6b47]"
                                style={{ borderColor: borderStrong, color: textColor, caretColor: "#ff6b47" }} placeholder="TX ID" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>From Date *</label>
                              <input type="date" value={settlementForm.fromDate} onChange={e => setSettlementForm({ ...settlementForm, fromDate: e.target.value })}
                                className="bg-transparent border-b px-0 py-2 text-[0.75rem] outline-none transition-all duration-200 focus:border-[#ff6b47]"
                                style={{ borderColor: borderStrong, color: textColor }} />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>To Date *</label>
                              <input type="date" value={settlementForm.toDate} onChange={e => setSettlementForm({ ...settlementForm, toDate: e.target.value })}
                                className="bg-transparent border-b px-0 py-2 text-[0.75rem] outline-none transition-all duration-200 focus:border-[#ff6b47]"
                                style={{ borderColor: borderStrong, color: textColor }} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>Proof Image (Optional)</label>
                            <input type="file" accept="image/*" onChange={handleFileUpload}
                              className="text-[0.65rem] file:mr-3 file:py-1.5 file:px-3 file:border-0 file:text-[0.55rem] file:uppercase file:tracking-[0.1em] file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors"
                              style={{ color: textColor }} />
                            {settlementForm.proofImage && <span className="text-[0.6rem] text-[#22c55e]">Image attached</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto">
                          {(!selected.settlements || selected.settlements.length === 0) ? (
                            <p className="text-[0.7rem] italic" style={{ color: labelColor }}>No settlements found.</p>
                          ) : (
                            selected.settlements.map((s, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 border" style={{ borderColor: borderMuted, background: subBg }}>
                                <div>
                                  <span className="text-[0.85rem] font-bold" style={{ color: textColor }}>₹{s.amount}</span>
                                  <span className="text-[0.55rem] ml-2 uppercase" style={{ color: labelColor }}>Tx: {s.transactionId}</span>
                                </div>
                                <span className="text-[0.5rem] uppercase tracking-[0.15em] font-bold px-2 py-0.5 border"
                                  style={{ borderColor: s.status === "APPROVED" ? "#22c55e" : s.status === "REJECTED" ? "#ef4444" : "#ff6b47", color: s.status === "APPROVED" ? "#22c55e" : s.status === "REJECTED" ? "#ef4444" : "#ff6b47" }}>
                                  {s.status}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </section>

                    {/* CERTIFICATE */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-3 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>Certificate</p>
                      <button
                        onClick={async () => {
                          if (viewCert) { setViewCert(false); return }
                          setCertLoading(true)
                          try {
                            const res = await fetch(`${KIOSK_BACKEND}/api/kiosk/${selected.kioskId}/certificate`)
                            if (!res.ok) throw new Error("Failed")
                            const blob = await res.blob()
                            const url = URL.createObjectURL(blob)
                            setCertBlobUrl(url)
                            setViewCert(true)
                          } catch { alert("Could not load certificate") }
                          finally { setCertLoading(false) }
                        }}
                        className="w-full py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-all border hover:bg-[#ff6b47] hover:text-black hover:border-[#ff6b47]"
                        style={{ borderColor: borderStrong, color: certLoading ? labelColor : "#ff6b47" }}
                      >
                        {certLoading ? "Loading..." : viewCert ? "Hide Certificate" : "View Certificate"}
                      </button>
                      <AnimatePresence>
                        {viewCert && certBlobUrl && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 340, opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden mt-3 border" style={{ borderColor: borderMuted }}
                          >
                            <iframe src={certBlobUrl} className="w-full" style={{ height: "340px", background: "#fff" }} title={`Certificate — ${selected.kioskId}`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                  </div>

                  {/* ── RIGHT COLUMN ── */}
                  <div className="p-6 flex flex-col gap-6 border-l overflow-y-auto" style={{ borderColor: borderMuted }}>

                    {/* RECENT TRANSACTIONS */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-4 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>Recent Transactions</p>
                      <KioskTransactions kioskId={selected.kioskId} isDark={isDark} borderMuted={borderMuted} labelColor={labelColor} textColor={textColor} subBg={subBg} onInvoicePdf={setInvoicePdfUrl} />
                    </section>

                    {/* ANALYTICS */}
                    <section>
                      <p className="text-[0.5rem] uppercase tracking-[0.3em] mb-4 pb-2 border-b font-bold" style={{ color: labelColor, borderColor: borderMuted }}>Analytics Overview</p>
                      <KioskAnalytics kioskId={selected.kioskId} />
                    </section>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {showDeleteConfirm && selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-[400px] border shadow-2xl p-6 flex flex-col gap-5"
              style={{ background: surfaceBg, borderColor: borderStrong }}
              onClick={e => e.stopPropagation()}
            >
              <div>
                <h3 className="text-[1.1rem] font-black uppercase mb-1" style={{ color: textColor, letterSpacing: "-0.01em" }}>Confirm Deletion</h3>
                <p className="text-[0.7rem]" style={{ color: labelColor }}>
                  This will send a deletion request for <strong style={{ color: textColor }}>{selected.kioskId}</strong> and initiate an approval flow.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.5rem] uppercase tracking-[0.1em]" style={{ color: labelColor }}>Type DELETE to confirm</label>
                <input
                  value={deleteInput}
                  onChange={e => setDeleteInput(e.target.value)}
                  className="bg-transparent border-b px-0 py-2 text-[0.8rem] outline-none w-full uppercase"
                  style={{ borderColor: "rgba(239,68,68,0.5)", color: textColor, caretColor: "#ef4444" }}
                  placeholder="DELETE"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] transition-all border"
                  style={{ borderColor: borderStrong, color: labelColor }}
                >Cancel</button>
                <button
                  onClick={async () => {
                    if (deleteInput === "DELETE" && selected) {
                      setDeleteLoading(true)
                      try {
                        await fetch(`${KIOSK_BACKEND}/api/kiosk/${selected.kioskId}/request-delete`, { method: "POST", headers: { "Content-Type": "application/json" } })
                      } catch {}
                      finally {
                        setKiosks(prev => prev.map(k => k.kioskId === selected.kioskId ? { ...k, status: "DELETE_PENDING" } : k))
                        setSelected(prev => prev && prev.kioskId === selected.kioskId ? { ...prev, status: "DELETE_PENDING" } : prev)
                        setDeleteLoading(false)
                        setShowDeleteConfirm(false)
                      }
                    }
                  }}
                  disabled={deleteInput !== "DELETE" || deleteLoading}
                  className="flex-1 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] transition-all bg-red-500 text-white disabled:opacity-40"
                >{deleteLoading ? "Sending..." : "Confirm Delete"}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice PDF fullscreen overlay */}
      <AnimatePresence>
        {invoicePdfUrl && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex flex-col"
            style={{ background: "rgba(0,0,0,0.95)" }}
          >
            <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <p className="text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "#a3a3a3" }}>Invoice PDF</p>
              <button
                onClick={() => setInvoicePdfUrl(null)}
                className="w-8 h-8 flex items-center justify-center border hover:bg-white/10 transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "#a3a3a3" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              <iframe src={invoicePdfUrl} className="w-full h-full" style={{ background: "#fff" }} title="Invoice" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
// ── Kiosk Transactions Sub-Component ──────────────────────────────────────────
function KioskTransactions({ kioskId, isDark, borderMuted, labelColor, textColor, subBg, onInvoicePdf }: {
  kioskId: string
  isDark: boolean
  borderMuted: string
  labelColor: string
  textColor: string
  subBg: string
  onInvoicePdf: (url: string) => void
}) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [generatingInvoice, setGeneratingInvoice] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${FILE_UPLOADER_API}/api/transactions/kiosk/${kioskId}?limit=50`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.success && data.transactions) setTransactions(data.transactions) })
      .finally(() => setLoading(false))
  }, [kioskId])

  const handleInvoice = async (tx: any) => {
    setGeneratingInvoice(tx.transactionId || tx._id)
    try {
      const { generateInvoicePDF } = await import("@/utils/generateInvoicePDF")
      await generateInvoicePDF({
        otp: tx.otp,
        kioskId: tx.kioskId,
        customerPhone: tx.customerPhone || "N/A",
        totalAmount: (tx.amount || 0) / 100,
        queue: (tx.printDetails || []).map((p: any) => ({
          fileName: p.fileName || "Document",
          pagesToPrint: p.pageCount || 1,
          printSettings: { copies: p.copies || 1, colorMode: p.colorMode || "bw", doubleSided: "one-side" },
          cost: ((p.pageCount || 1) * (p.copies || 1) * (p.colorMode === "color" ? 10 : 2))
        }))
      })
    } catch (e) {
      alert("Could not generate invoice PDF")
    } finally {
      setGeneratingInvoice(null)
    }
  }

  if (loading) return <p className="text-[0.7rem] italic" style={{ color: labelColor }}>Loading transactions...</p>
  if (transactions.length === 0) return <p className="text-[0.7rem] italic" style={{ color: labelColor }}>No transactions found.</p>

  return (
    <div className="flex flex-col">
      {/* Header row */}
      <div className="grid grid-cols-[1fr_80px_60px_60px_60px] gap-2 px-2 py-2 border-b text-[0.45rem] uppercase tracking-[0.15em]" style={{ borderColor: borderMuted, color: labelColor }}>
        <span>Tx ID</span>
        <span>Date</span>
        <span>Pages</span>
        <span>Amount</span>
        <span>Action</span>
      </div>
      <div className="flex flex-col max-h-[400px] overflow-y-auto">
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_80px_60px_60px_60px] gap-2 px-2 py-2.5 border-b items-center transition-colors hover:bg-black/5"
            style={{ borderColor: borderMuted, background: idx % 2 === 0 ? subBg : "transparent" }}
          >
            <span className="text-[0.6rem] font-mono font-bold truncate" style={{ color: textColor }}>{(tx.transactionId || tx._id || "").slice(0, 10).toUpperCase()}</span>
            <span className="text-[0.55rem]" style={{ color: labelColor }}>
              {new Date(tx.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </span>
            <span className="text-[0.6rem] font-medium" style={{ color: textColor }}>{tx.totalPages || "—"}</span>
            <span className="text-[0.65rem] font-bold" style={{ color: "#ff6b47" }}>₹{((tx.amount || 0) / 100).toFixed(0)}</span>
            <button
              onClick={() => handleInvoice(tx)}
              disabled={generatingInvoice === (tx.transactionId || tx._id)}
              className="text-[0.5rem] font-bold uppercase tracking-[0.1em] border px-1.5 py-1 transition-all hover:bg-[#ff6b47] hover:text-black hover:border-[#ff6b47] disabled:opacity-40"
              style={{ borderColor: "#ff6b47", color: "#ff6b47" }}
            >
              {generatingInvoice === (tx.transactionId || tx._id) ? "..." : "Invoice"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Kiosk Analytics Sub-Component ─────────────────────────────────────────────
function KioskAnalytics({ kioskId }: { kioskId: string }) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTx, setSelectedTx] = useState<any>(null)
  const [period, setPeriod] = useState<"today" | "week" | "month">("week")
  const [weekOffset, setWeekOffset] = useState(0) // 0 = current, 1 = prev week, etc.

  useEffect(() => {
    setLoading(true)
    fetch(`${FILE_UPLOADER_API}/api/transactions/kiosk/${kioskId}?limit=200`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.success && data.transactions) setTransactions(data.transactions) })
      .finally(() => setLoading(false))
  }, [kioskId])

  // Filter transactions by period + weekOffset
  const filtered = (() => {
    const now = new Date()
    return transactions.filter(tx => {
      const d = new Date(tx.createdAt)
      if (period === "today") {
        const target = new Date(now)
        target.setDate(now.getDate() - weekOffset)
        return d.toDateString() === target.toDateString()
      } else if (period === "week") {
        const start = new Date(now)
        start.setDate(now.getDate() - weekOffset * 7 - 6)
        start.setHours(0, 0, 0, 0)
        const end = new Date(now)
        end.setDate(now.getDate() - weekOffset * 7)
        end.setHours(23, 59, 59, 999)
        return d >= start && d <= end
      } else {
        const start = new Date(now.getFullYear(), now.getMonth() - weekOffset, 1)
        const end = new Date(now.getFullYear(), now.getMonth() - weekOffset + 1, 0, 23, 59, 59)
        return d >= start && d <= end
      }
    })
  })()

  const totalRevenue = filtered.reduce((s, t) => s + (t.amount || 0), 0) / 100
  const txCount = filtered.length

  // Period label for the date nav
  const periodLabel = (() => {
    const now = new Date()
    if (period === "today") {
      const d = new Date(now)
      d.setDate(now.getDate() - weekOffset)
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    } else if (period === "week") {
      const end = new Date(now); end.setDate(now.getDate() - weekOffset * 7)
      const start = new Date(now); start.setDate(now.getDate() - weekOffset * 7 - 6)
      return `${start.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${end.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
    } else {
      const d = new Date(now.getFullYear(), now.getMonth() - weekOffset, 1)
      return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    }
  })()

  // Chart data (daily buckets within filtered period)
  const chartData = (() => {
    const days: Record<string, { date: string; revenue: number; count: number }> = {}
    filtered.forEach(tx => {
      const day = new Date(tx.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
      if (!days[day]) days[day] = { date: day, revenue: 0, count: 0 }
      days[day].revenue += (tx.amount || 0) / 100
      days[day].count += 1
    })
    return Object.values(days)
  })()

  if (loading) return <p className="text-[0.75rem] opacity-50 italic">Loading analytics...</p>

  return (
    <div className="flex flex-col gap-5">
      {/* Period tabs */}
      <div className="flex gap-0 border" style={{ borderColor: "rgba(255,255,255,0.1)", display: "inline-flex" }}>
        {(["today", "week", "month"] as const).map(p => (
          <button
            key={p}
            onClick={() => { setPeriod(p); setWeekOffset(0) }}
            className="px-4 py-2 text-[0.55rem] font-bold uppercase tracking-[0.15em] transition-all duration-200"
            style={{
              background: period === p ? "#ff6b47" : "transparent",
              color: period === p ? "#000" : "#a3a3a3",
              borderRight: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {p === "today" ? "Day" : p === "week" ? "Week" : "Month"}
          </button>
        ))}
      </div>

      {/* Revenue summary + date nav */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.5rem] uppercase tracking-[0.2em] mb-1" style={{ color: "#4a4a4a" }}>Revenue</p>
          <p className="text-[1.4rem] font-black leading-none" style={{ letterSpacing: "-0.02em" }}>
            ₹{totalRevenue.toFixed(0)}
            <span className="text-[0.65rem] font-normal ml-2" style={{ color: "#4a4a4a" }}>{txCount} txns</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset(o => o + 1)}
            className="w-7 h-7 flex items-center justify-center border transition-all hover:bg-white hover:text-black"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#a3a3a3" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <span className="text-[0.55rem] uppercase tracking-[0.1em]" style={{ color: "#4a4a4a", minWidth: "8rem", textAlign: "center" }}>{periodLabel}</span>
          <button
            onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
            disabled={weekOffset === 0}
            className="w-7 h-7 flex items-center justify-center border transition-all hover:bg-white hover:text-black disabled:opacity-30"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "#a3a3a3" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

      {/* Bar chart */}
      <div className="h-[120px] w-full">
        {chartData.length === 0 ? (
          <div className="h-full border border-dashed flex items-center justify-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <span className="text-[0.6rem]" style={{ color: "#4a4a4a" }}>No data for this period</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip
                contentStyle={{ background: "#050505", border: "1px solid #333", fontSize: "10px" }}
                labelStyle={{ color: "#a3a3a3" }}
                itemStyle={{ color: "#fff" }}
                formatter={(val: any) => [`₹${Number(val).toFixed(0)}`, "Revenue"]}
              />
              <Bar dataKey="revenue" name="Revenue" fill="#ff6b47" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 border bg-black/50" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-[0.5rem] uppercase tracking-[0.2em] mb-1" style={{ color: "#4a4a4a" }}>Revenue (Period)</p>
          <p className="text-[1rem] font-bold text-white">₹{totalRevenue.toFixed(0)}</p>
        </div>
        <div className="p-3 border bg-black/50" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-[0.5rem] uppercase tracking-[0.2em] mb-1" style={{ color: "#4a4a4a" }}>Transactions</p>
          <p className="text-[1rem] font-bold" style={{ color: "#22c55e" }}>{txCount}</p>
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <p className="text-[0.55rem] uppercase tracking-[0.2em] mb-3" style={{ color: "#4a4a4a" }}>Recent Transactions</p>
        {filtered.length === 0 ? (
          <p className="text-[0.7rem]" style={{ color: "#4a4a4a" }}>No transactions for this period</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
            {filtered.slice(0, 8).map((tx, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div>
                  <p className="text-[0.7rem] font-bold text-white">₹{((tx.amount || 0) / 100).toFixed(0)}</p>
                  <p className="text-[0.55rem] uppercase" style={{ color: "#a3a3a3" }}>
                    {new Date(tx.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {new Date(tx.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[0.5rem] font-bold uppercase px-1.5 py-0.5 border"
                    style={{
                      borderColor: tx.status === "CAPTURED" ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)",
                      color: tx.status === "CAPTURED" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {tx.status}
                  </span>
                  <button onClick={() => setSelectedTx(tx)} className="text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[#ff6b47] hover:text-white transition-colors">
                    Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedTx && (
          <InvoiceModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Invoice Modal ─────────────────────────────────────────────────────────────
function InvoiceModal({ tx, onClose }: { tx: any; onClose: () => void }) {
  const handleDownload = async () => {
    try {
      await generateInvoicePDF({
        otp: tx.otp, // In case tx happens to have an otp
        kioskId: tx.kioskId,
        customerPhone: tx.customerPhone || "N/A",
        totalAmount: (tx.amount || 0) / 100,
        queue: (tx.printDetails || []).map((p: any) => ({
          fileName: p.fileName || "Document",
          pagesToPrint: p.pageCount || 1,
          printSettings: {
            copies: p.copies || 1,
            colorMode: p.colorMode || "bw",
            doubleSided: "one-side"
          },
          cost: ((p.pageCount || 1) * (p.copies || 1) * (p.colorMode === "color" ? 10 : 2))
        }))
      })
    } catch (e) {
      console.error("PDF generation failed", e)
      alert("Could not generate PDF invoice")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="w-full max-w-[400px] border shadow-2xl"
        style={{ background: "#050505", borderColor: "rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.2em] mb-1" style={{ color: "#4a4a4a" }}>Invoice</p>
            <h3 className="text-[0.85rem] font-bold uppercase leading-none" style={{ color: "#fff" }}>
              {tx.transactionId}
            </h3>
          </div>
          <button onClick={onClose} className="text-[0.65rem] uppercase tracking-[0.15em] hover:text-white transition-colors" style={{ color: "#4a4a4a" }}>Close</button>
        </div>
        <div className="p-6 text-[0.7rem]" style={{ color: "#a3a3a3" }}>
          <div className="flex justify-between mb-2"><span>Date</span> <span className="text-white">{new Date(tx.createdAt).toLocaleString()}</span></div>
          <div className="flex justify-between mb-2"><span>Amount</span> <span className="text-[#ff6b47] font-bold">₹{((tx.amount || 0) / 100).toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span>Status</span> <span className="text-white">{tx.status}</span></div>
          <div className="flex justify-between mb-4"><span>Pages</span> <span className="text-white">{tx.totalPages}</span></div>
          
          <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <button onClick={handleDownload} className="w-full py-2 bg-[#ff6b47] text-black font-bold uppercase tracking-[0.1em] text-[0.6rem] hover:opacity-80 transition-all">Download Receipt</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
