export default function RitualReviews() {
  return (
    <section id="shopify-section-template--25022321197343__custom_html_RAf8Dk" className="shopify-section t4s-section t4s-section-all t4s_tp_cdt t4s-custom-html">
      <div className="t4s-section-inner t4s_nt_se_template--25022321197343__custom_html_RAf8Dk t4s-container-fluid" style={{}}>
        <div className="t4s-code__html">
          <div className="custom-tea-section" style={{ marginTop: -40 }}>
            <div className="tea-text-column">
              <div className="tea-content-wrapper">
                <span className="tea-subtitle">THE AURA EXPERIENCE</span>
                <h2 className="tea-title">Sip the Ritual.</h2>
                <p className="tea-description">Discover our premium loose-leaf blends, crafted for unrivaled depth, exceptional aroma, and a truly calming daily ritual.</p>
                <a href="/collections/all" className="tea-button">EXPLORE PREMIUM PACKAGES</a>
              </div>
            </div>

            <div className="tea-slider-column">
              <div className="slider-loved-label">LOVED ACROSS PAKISTAN</div>
              <div className="slider-wrapper">
                <div className="slider-fade-left" />
                <div className="slider-fade-right" />

                <div className="slider-track-wrap">
                  <div className="slider-track" id="aura-row1">
                    {set1.map((r, i) => (
                      <div className="t-card" key={i}>
                        <div className="t-stars">★★★★★</div>
                        <p className="t-quote">&ldquo;{r.t}&rdquo;</p>
                        <div className="t-footer">
                          <div className="t-avatar" style={{ background: r.bg, color: r.fg }}>{r.i}</div>
                          <div><p className="t-name">{r.n}</p><p className="t-city">{r.c}</p></div>
                        </div>
                      </div>
                    ))}
                    {set1.map((r, i) => (
                      <div className="t-card" key={`dup-${i}`}>
                        <div className="t-stars">★★★★★</div>
                        <p className="t-quote">&ldquo;{r.t}&rdquo;</p>
                        <div className="t-footer">
                          <div className="t-avatar" style={{ background: r.bg, color: r.fg }}>{r.i}</div>
                          <div><p className="t-name">{r.n}</p><p className="t-city">{r.c}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="slider-track-wrap">
                  <div className="slider-track slider-track-reverse" id="aura-row2">
                    {set2.map((r, i) => (
                      <div className="t-card" key={i}>
                        <div className="t-stars">★★★★★</div>
                        <p className="t-quote">&ldquo;{r.t}&rdquo;</p>
                        <div className="t-footer">
                          <div className="t-avatar" style={{ background: r.bg, color: r.fg }}>{r.i}</div>
                          <div><p className="t-name">{r.n}</p><p className="t-city">{r.c}</p></div>
                        </div>
                      </div>
                    ))}
                    {set2.map((r, i) => (
                      <div className="t-card" key={`dup-${i}`}>
                        <div className="t-stars">★★★★★</div>
                        <p className="t-quote">&ldquo;{r.t}&rdquo;</p>
                        <div className="t-footer">
                          <div className="t-avatar" style={{ background: r.bg, color: r.fg }}>{r.i}</div>
                          <div><p className="t-name">{r.n}</p><p className="t-city">{r.c}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            .custom-tea-section{display:flex;flex-direction:column;width:100%;background:transparent;box-sizing:border-box;font-family:inherit;overflow:hidden}
            .tea-text-column{flex:1;display:flex;justify-content:center;align-items:center;text-align:center;padding:80px 20px;box-sizing:border-box}
            .tea-content-wrapper{max-width:500px;display:flex;flex-direction:column;align-items:center}
            .tea-subtitle{font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#888;margin-bottom:18px;font-weight:600}
            .tea-title{font-size:clamp(32px,5vw,50px);font-family:Georgia,'Times New Roman',serif;color:#1a1a1a;margin:0 0 18px 0;font-weight:400;line-height:1.2}
            .tea-description{font-size:15px;line-height:1.65;color:#555;margin:0 0 32px 0}
            .tea-button{display:inline-block;background-color:#510A0B;color:#fff;text-decoration:none;padding:14px 36px;font-size:11px;letter-spacing:0.15em;font-weight:600;text-transform:uppercase;transition:opacity 0.3s ease}
            .tea-button:hover{opacity:0.88}
            .tea-slider-column{flex:1.2;overflow:hidden;position:relative;display:flex;flex-direction:column;justify-content:center;padding:50px 0;min-height:380px}
            .slider-loved-label{text-align:center;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#888;font-weight:600;margin-bottom:22px}
            .slider-wrapper{position:relative;width:100%}
            .slider-fade-left,.slider-fade-right{position:absolute;top:0;height:100%;width:60px;z-index:2;pointer-events:none}
            .slider-fade-left{left:0;background:linear-gradient(to right,#f5f1eb,transparent)}
            .slider-fade-right{right:0;background:linear-gradient(to left,#f5f1eb,transparent)}
            .slider-track-wrap{overflow:hidden;width:100%}
            .slider-track{display:flex;gap:14px;width:max-content;animation:aura-scroll 38s linear infinite}
            .slider-track:hover{animation-play-state:paused}
            .slider-track-reverse{animation-direction:reverse;margin-top:14px}
            @keyframes aura-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
            .t-card{background:#fff;border:1px solid #ebebeb;border-radius:12px;padding:18px 20px;width:240px;flex-shrink:0;box-sizing:border-box}
            .t-stars{color:#510A0B;font-size:13px;margin-bottom:10px;letter-spacing:1px}
            .t-quote{font-size:13px;line-height:1.65;color:#333;margin:0 0 14px;font-style:italic}
            .t-footer{display:flex;align-items:center;gap:10px}
            .t-avatar{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0}
            .t-name{font-size:12px;font-weight:600;color:#1a1a1a;margin:0;line-height:1.4}
            .t-city{font-size:11px;color:#888;margin:0;line-height:1.4}
            @media(min-width:768px){
              .custom-tea-section{flex-direction:row;min-height:85vh;align-items:stretch}
              .tea-text-column{padding:100px 60px}
              .tea-slider-column{padding:80px 0}
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}

const set1 = [
  { t: "Aura chai has completely replaced my morning routine. The aroma alone is something extraordinary — pure and rich.", i: "FM", n: "Fatima Malik", c: "Lahore", bg: "#FAECE7", fg: "#7B2D2D" },
  { t: "Maine kabhi aisi chai nahi pi. Sach mein yeh premium quality hai, har ghoot mein fark nazar aata hai.", i: "AR", n: "Ahmed Raza", c: "Karachi", bg: "#F5C4B3", fg: "#510A0B" },
  { t: "We serve Aura to our guests and they always ask for the brand. It has become a staple in our home, Alhamdulillah.", i: "ZS", n: "Zainab Siddiqui", c: "Islamabad", bg: "#FAECE7", fg: "#3C1A1A" },
  { t: "Doodh patti banaiye Aura ki pattiyon se — bas phir daikhtay jaiye. Every cup is a blessing.", i: "UC", n: "Usman Chaudhry", c: "Faisalabad", bg: "#F5C4B3", fg: "#7B2D2D" },
  { t: "The fragrance when the tea steeps is unlike anything I have experienced. Genuinely world-class quality in Pakistan.", i: "HB", n: "Hina Baig", c: "Multan", bg: "#FAECE7", fg: "#510A0B" },
  { t: "Aura ki khushboo ghar mein phailti hai toh sab samajh jaate hain chai tayyar ho rahi hai. Perfect blend!", i: "BH", n: "Bilal Hussain", c: "Rawalpindi", bg: "#F5C4B3", fg: "#3C1A1A" },
  { t: "Meri saas ne bola yeh chai Kenya se aati hai — jab mujhe pata chala quality samajh aayi. Mashallah itni achi hai.", i: "AT", n: "Asma Tariq", c: "Gujranwala", bg: "#FAECE7", fg: "#7B2D2D" },
  { t: "I bought a gift pack for Eid and everyone loved it. Premium packaging, premium taste — Aura delivers on every promise.", i: "HS", n: "Hamza Sheikh", c: "Lahore", bg: "#F5C4B3", fg: "#510A0B" },
  { t: "Subah ki chai Aura ke baghair ab adhoori lagti hai. Ghar walon ne bhi yahi pasand kiya hai ab.", i: "RB", n: "Rukhsana Begum", c: "Peshawar", bg: "#FAECE7", fg: "#3C1A1A" },
]

const set2 = [
  { t: "The color, strength, and taste — everything is perfectly balanced. No artificial taste whatsoever. 100% recommended.", i: "TM", n: "Tariq Mehmood", c: "Sialkot", bg: "#F5C4B3", fg: "#7B2D2D" },
  { t: "Aura Tea ne meri chai ki definition badal di. Ab koi aur brand achha hi nahi lagta — yeh ek khas cheez hai.", i: "NI", n: "Nadia Iqbal", c: "Hyderabad", bg: "#FAECE7", fg: "#510A0B" },
  { t: "Daftar mein sab log poochte hain kaunsi chai bana rahe ho — yahi Aura wali. Sab ko pasand aati hai.", i: "SH", n: "Saad ul Haq", c: "Quetta", bg: "#F5C4B3", fg: "#3C1A1A" },
  { t: "Premium loose-leaf at a fair price. The Kenya origin makes all the difference — you can actually taste the freshness.", i: "SN", n: "Sobia Nawaz", c: "Lahore", bg: "#FAECE7", fg: "#7B2D2D" },
  { t: "Yeh chai waqai royalty wali feel deti hai. Ghar mein mehman aa jaye toh Aura serve karo — sab impressed ho jaate hain.", i: "IB", n: "Imran Butt", c: "Karachi", bg: "#F5C4B3", fg: "#510A0B" },
  { t: "I was skeptical at first but one cup and I was convinced. No bitterness, only smooth richness — Aura is my forever brand.", i: "MR", n: "Madiha Rehman", c: "Abbottabad", bg: "#FAECE7", fg: "#3C1A1A" },
  { t: "Bhai ne gift kiya tha — ab mai khud khareedta hoon. Quality itni achi hai ke doosri chai pehle jaise achhi nahi lagti.", i: "KA", n: "Kashif Ali", c: "Multan", bg: "#F5C4B3", fg: "#7B2D2D" },
  { t: "The story of Aura — 1960, Kenya, no additives — shows in every sip. You feel the authenticity and care behind it.", i: "AZ", n: "Ambreen Zahid", c: "Islamabad", bg: "#FAECE7", fg: "#510A0B" },
  { t: "Honestly the best chai I've had in Pakistan. The leaves are proper quality and the brew is outstanding every single time.", i: "JH", n: "Jawad Hassan", c: "Lahore", bg: "#F5C4B3", fg: "#3C1A1A" },
]
