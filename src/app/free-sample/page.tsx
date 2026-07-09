'use client'

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useState, FormEvent } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const cities = ["Islamabad", "Rawalpindi"]
const packs = ["Daily Aura"]

const buyOptions = [
  "Local grocery store",
  "Supermarket",
  "Cash & Carry",
  "Online",
]

const matterOptions = [
  "Strong taste",
  "Aroma",
  "Colour",
  "Price",
  "Brand reputation",
  "Purity",
  "Health",
  "Value for money",
]

type Errors = Record<string, string>

export default function FreeSample() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [pack, setPack] = useState("Daily Aura")
  const [address, setAddress] = useState("")
  const [buyFrom, setBuyFrom] = useState("")
  const [currentBrand, setCurrentBrand] = useState("")
  const [mattersMost, setMattersMost] = useState<string[]>([])
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const toggleMatter = (val: string) => {
    setMattersMost((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : prev.length < 2 ? [...prev, val] : prev
    )
  }

  const validate = (): boolean => {
    const errs: Errors = {}
    if (!name.trim()) errs.name = "Please enter your full name."
    if (!phone.trim()) errs.phone = "Please enter a valid Pakistani mobile number."
    else if (!/^0?3[0-9]{9}$/.test(phone.replace(/\s/g, ""))) errs.phone = "Please enter a valid Pakistani mobile number."
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address."
    if (!city) errs.city = "Please select your city."
    if (!address.trim()) errs.address = "Please enter your complete delivery address."
    if (!buyFrom) errs.buyFrom = "Please select an option."
    if (!currentBrand.trim()) errs.currentBrand = "Please enter your current tea brand."
    if (mattersMost.length === 0) errs.mattersMost = "Please select 1 or 2 options."
    if (!consent1) errs.consent1 = "You must agree to proceed."
    if (!consent2) errs.consent2 = "You must agree to proceed."
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const ref = "FS-" + Date.now().toString(36).toUpperCase()

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city,
      pack,
      address: address.trim(),
      buyFrom,
      currentBrand: currentBrand.trim(),
      mattersMost,
      createdAt: serverTimestamp(),
    }

    try {
      await addDoc(collection(db, "samples"), payload)
    } catch (err) {
      console.error("Firestore save error:", err)
    }

    try {
      const params = new URLSearchParams()
      params.set("Reference", ref)
      params.set("Name", name.trim())
      params.set("Phone", phone.trim())
      params.set("Email", email.trim())
      params.set("City", city)
      params.set("Pack", pack)
      params.set("Address", address.trim())
      params.set("BuyFrom", buyFrom)
      params.set("Brand", currentBrand.trim())
      params.set("MatterMost", mattersMost.join(", "))
      await fetch("https://script.google.com/macros/s/AKfycbw_mrPK_svRYMaNcbxhZXe9CUxHpRF3DpF_Zy4fElDJOFyciDW1RvCQeftqKhr7WQCLog/exec", {
        method: "POST",
        body: params,
      })
    } catch (err) {
      console.error("Google Sheets save error:", err)
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <Header />
        <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontFamily: "Georgia,serif", color: "#1a1a1a", marginBottom: 16 }}>Thank You!</h2>
            <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, maxWidth: 480 }}>
              Your free sample request has been received. We&apos;ll get back to you via WhatsApp within 24 hours.
            </p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <section className="sample-form-section">
        <div className="sample-form-wrap">
          <div className="sample-form-header">
            <p className="sample-form-eyebrow">AURA PREMIUM TEA</p>
            <h1>Reserve Your Free Sample</h1>
            <p className="sample-form-desc">Try Aura Premium Tea on us. Fill in the details below and we&apos;ll deliver a free sample to your doorstep.</p>
          </div>

          <form id="sampleForm" noValidate onSubmit={handleSubmit}>
            <div className={`field${errors.name ? " has-error" : ""}`} id="f-name">
              <label htmlFor="inName">Full Name <em>*</em></label>
              <input type="text" id="inName" placeholder="e.g. Ayesha Khan" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              <span className="err">{errors.name}</span>
            </div>

            <div className={`field${errors.phone ? " has-error" : ""}`} id="f-phone">
              <label htmlFor="inPhone">WhatsApp Number <em>*</em></label>
              <input type="tel" id="inPhone" placeholder="03XX XXXXXXX" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <span className="err">{errors.phone}</span>
            </div>

            <div className={`field${errors.email ? " has-error" : ""}`} id="f-email">
              <label htmlFor="inEmail">Email (Optional)</label>
              <input type="email" id="inEmail" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className="err">{errors.email}</span>
            </div>

            <div className="field-row">
              <div className={`field${errors.city ? " has-error" : ""}`} id="f-city">
                <label htmlFor="inCity">City <em>*</em></label>
                <select id="inCity" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="" disabled>Select your city</option>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
                <span className="err">{errors.city}</span>
              </div>
              <div className="field" id="f-pack">
                <label htmlFor="inPack">Pack to Sample</label>
                <select id="inPack" value={pack} onChange={(e) => setPack(e.target.value)}>
                  {packs.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className={`field${errors.address ? " has-error" : ""}`} id="f-address">
              <label htmlFor="inAddress">Delivery Address <em>*</em></label>
              <textarea id="inAddress" placeholder="House, street, sector or area" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <span className="err">{errors.address}</span>
            </div>

            <div className={`field${errors.buyFrom ? " has-error" : ""}`} id="f-buyFrom">
              <label>Where do you usually buy tea? <em>*</em></label>
              <div className="chip-group">
                {buyOptions.map((opt) => (
                  <label key={opt} className={`chip${buyFrom === opt ? " active" : ""}`}>
                    <input type="radio" name="buyFrom" value={opt} checked={buyFrom === opt} onChange={() => setBuyFrom(opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <span className="err">{errors.buyFrom}</span>
            </div>

            <div className={`field${errors.currentBrand ? " has-error" : ""}`} id="f-currentBrand">
              <label htmlFor="inCurrentBrand">Which tea brand do you currently use? <em>*</em></label>
              <input type="text" id="inCurrentBrand" placeholder="e.g. Lipton, Tapal" value={currentBrand} onChange={(e) => setCurrentBrand(e.target.value)} />
              <span className="err">{errors.currentBrand}</span>
            </div>

            <div className={`field${errors.mattersMost ? " has-error" : ""}`} id="f-mattersMost">
              <label>What matters most when choosing tea? (Select up to 2) <em>*</em></label>
              <div className="chip-group">
                {matterOptions.map((opt) => (
                  <label key={opt} className={`chip${mattersMost.includes(opt) ? " active" : ""}`}>
                    <input type="checkbox" checked={mattersMost.includes(opt)} onChange={() => toggleMatter(opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <span className="err">{errors.mattersMost}</span>
            </div>

            <div className={`consent-wrap${errors.consent1 ? " has-error" : ""}`} id="f-consent1">
              <label className="consent">
                <input type="checkbox" checked={consent1} onChange={(e) => setConsent1(e.target.checked)} />
                <span>I understand this offer is limited to one free sample per household/address.</span>
              </label>
            </div>

            <div className={`consent-wrap${errors.consent2 ? " has-error" : ""}`} id="f-consent2">
              <label className="consent">
                <input type="checkbox" checked={consent2} onChange={(e) => setConsent2(e.target.checked)} />
                <span>I agree that Aura Tea may contact me for feedback about the sample.</span>
              </label>
            </div>

            <button type="submit" className="btn btn-gold btn-block">Reserve My Free Sample</button>
            <p className="form-note">One sample per household, while stock lasts</p>
          </form>
        </div>
      </section>
      <Footer />

      <style>{`
        .sample-form-section {
          padding: 140px 24px 100px;
          background: #f5f1eb;
          min-height: 100vh;
        }
        .sample-form-wrap {
          max-width: 640px;
          margin: 0 auto;
        }
        .sample-form-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .sample-form-eyebrow {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #b48f42;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .sample-form-header h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(30px,4vw,46px);
          color: #1a1a1a;
          font-weight: 400;
          margin: 0 0 14px;
          line-height: 1.15;
        }
        .sample-form-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto;
        }
        .field {
          margin-bottom: 22px;
        }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }
        .field label em {
          color: #b0201d;
          font-style: normal;
        }
        .field input[type="text"],
        .field input[type="tel"],
        .field input[type="email"],
        .field select,
        .field textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          background: #fff;
          color: #333;
          outline: none;
          transition: border-color 0.25s;
          box-sizing: border-box;
        }
        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #b48f42;
        }
        .field textarea {
          min-height: 80px;
          resize: vertical;
        }
        .field.has-error input,
        .field.has-error select,
        .field.has-error textarea {
          border-color: #b0201d;
        }
        .err {
          display: block;
          font-size: 12px;
          color: #b0201d;
          margin-top: 4px;
          min-height: 0;
          overflow: hidden;
          transition: all 0.2s;
        }
        .field:not(.has-error) .err,
        .consent-wrap:not(.has-error) .err {
          display: none;
        }
        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          padding: 9px 18px;
          border: 1px solid #ddd;
          border-radius: 40px;
          font-size: 13px;
          color: #555;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
          user-select: none;
        }
        .chip input {
          display: none;
        }
        .chip.active {
          border-color: #510A0B;
          background: #510A0B;
          color: #fff;
        }
        .chip:hover {
          border-color: #b48f42;
        }
        .consent-wrap {
          margin-bottom: 16px;
        }
        .consent {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          font-size: 13px;
          color: #555;
          line-height: 1.5;
        }
        .consent input[type="checkbox"] {
          margin-top: 2px;
          width: 16px;
          height: 16px;
          accent-color: #510A0B;
          flex-shrink: 0;
        }
        .btn-gold {
          background: #510A0B;
          color: #fff;
          border: 1px solid #510A0B;
        }
        .btn-gold:hover {
          background: #6e1a19;
          border-color: #6e1a19;
        }
        .btn-block {
          width: 100%;
          justify-content: center;
        }
        .form-note {
          text-align: center;
          font-size: 12px;
          color: #999;
          margin-top: 16px;
        }
        @media (max-width: 600px) {
          .sample-form-section { padding: 120px 16px 70px; }
          .field-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
