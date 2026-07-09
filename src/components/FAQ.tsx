'use client'

import { useState, useRef, useEffect } from 'react'

const faqs = [
  { q: "What makes Aura Premium Tea different?", a: "Aura Premium Tea is made with premium unblended tea leaves sourced from Kenya. Unlike blended teas, every cup delivers a naturally rich taste, strong aroma, and consistent quality." },
  { q: "What does \"unblended tea\" mean?", a: "Unblended tea is made from carefully selected tea leaves without mixing different grades or fillers, resulting in a purer, richer, and more authentic tea experience." },
  { q: "Is Aura Tea suitable for everyday use?", a: "Yes. It's crafted to make every daily cup taste premium while maintaining consistent quality." },
  { q: "Does Aura Tea make strong karak chai?", a: "Yes. Aura is specially selected to deliver a rich, full-bodied karak chai with a strong aroma." },
  { q: "Can I make both milk tea and black tea with Aura?", a: "Absolutely. Aura works beautifully for both milk tea (chai) and black tea." },
  { q: "Where do you deliver?", a: "We currently deliver across Pakistan. Delivery timelines may vary by location." },
  { q: "How can I place an order?", a: "You can order directly through our website." },
  { q: "How do I request a free sample?", a: "Simply fill out the Free Sample form on our website. If your area is eligible, we'll send a complimentary sample." },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggle = (i: number) => {
    const isActive = openIndex === i
    setOpenIndex(isActive ? null : i)
  }

  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return
      if (openIndex === i) {
        el.style.maxHeight = el.scrollHeight + 'px'
      } else {
        el.style.maxHeight = '0px'
      }
    })
  }, [openIndex])

  return (
    <section id="shopify-section-template--25022321197343__custom_html_HG9zyz" className="shopify-section t4s-section t4s-section-all t4s_tp_cdt t4s-custom-html">
      <div className="t4s-section-inner t4s_nt_se_template--25022321197343__custom_html_HG9zyz t4s-container-fluid" style={{}}>
        <div className="t4s-code__html">
          <div className="aura-faq-section">
            <div className="faq-header">
              <span className="faq-subtitle">GOT QUESTIONS?</span>
              <h2 className="faq-title">Frequently Asked Questions</h2>
              <p className="faq-description">Everything you need to know about Aura Premium Tea, our delivery, and how to get started.</p>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <div className={`faq-item${openIndex === i ? ' active' : ''}`} key={i}>
                  <button className="faq-question" aria-expanded={openIndex === i} onClick={() => toggle(i)}>
                    <span>{f.q}</span>
                    <span className="faq-icon" />
                  </button>
                  <div className="faq-answer" ref={(el) => { answerRefs.current[i] = el }}>
                    <div className="faq-answer-inner">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .aura-faq-section{width:100%;background:transparent;box-sizing:border-box;font-family:inherit;padding:70px 20px}
            .faq-header{max-width:640px;margin:0 auto 40px;text-align:center;display:flex;flex-direction:column;align-items:center}
            .faq-subtitle{font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:18px;font-weight:600}
            .faq-title{font-size:clamp(28px,5vw,42px);font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;margin:0 0 16px 0;font-weight:400;line-height:1.2}
            .faq-description{font-size:15px;line-height:1.65;color:#555;margin:0}
            .faq-list{max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
            .faq-item{background:#fff;border:1px solid #ebebeb;border-radius:12px;overflow:hidden;transition:border-color 0.3s ease}
            .faq-item.active{border-color:#F5C4B3}
            .faq-question{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;background:none;border:none;outline:none;cursor:pointer;padding:20px 22px;text-align:left;font-family:inherit;font-size:15px;font-weight:600;color:#1a1a1a;-webkit-tap-highlight-color:transparent}
            .faq-icon{position:relative;flex-shrink:0;width:20px;height:20px}
            .faq-icon::before,.faq-icon::after{content:'';position:absolute;top:50%;left:50%;background-color:#510A0B;transform:translate(-50%,-50%);transition:transform 0.3s ease,opacity 0.3s ease}
            .faq-icon::before{width:14px;height:2px}
            .faq-icon::after{width:2px;height:14px}
            .faq-item.active .faq-icon::after{transform:translate(-50%,-50%) rotate(90deg);opacity:0}
            .faq-answer{max-height:0;overflow:hidden;transition:max-height 0.35s ease}
            .faq-answer-inner{padding:0 22px 20px}
            .faq-answer-inner p{margin:0;font-size:14px;line-height:1.7;color:#555}
            @media(min-width:768px){.aura-faq-section{padding:100px 60px}}
          `}</style>
        </div>
      </div>
    </section>
  )
}
