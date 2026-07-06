// @ts-nocheck
"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    (function () {
      var drawer = document.getElementById("drawer");
      var overlay = document.getElementById("overlay");
      var closeBtn = document.getElementById("drawerClose");
      var form = document.getElementById("sampleForm");
      var successBox = document.getElementById("successBox");
      var packSelect = document.getElementById("inPack");
      var header = document.getElementById("siteHeader");
      var floatBtn = document.getElementById("floatBtn");
      var lastFocused = null;

      /* ---- drawer open / close ---- */
      function openDrawer(pack) {
        if (pack) {
          for (var i = 0; i < packSelect.options.length; i++) {
            if (packSelect.options[i].text === pack) {
              packSelect.selectedIndex = i;
              break;
            }
          }
        }
        lastFocused = document.activeElement;
        drawer.classList.add("open");
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        setTimeout(function () {
          document.getElementById("inName").focus();
        }, 450);
      }
      function closeDrawer() {
        drawer.classList.remove("open");
        overlay.classList.remove("open");
        document.body.style.overflow = "";
        if (lastFocused) {
          lastFocused.focus();
        }
      }

      var openers = document.querySelectorAll("[data-open-drawer]");
      for (var i = 0; i < openers.length; i++) {
        openers[i].addEventListener("click", function () {
          openDrawer(this.getAttribute("data-pack"));
        });
      }
      closeBtn.addEventListener("click", closeDrawer);
      overlay.addEventListener("click", closeDrawer);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("open")) {
          closeDrawer();
        }
      });

      /* ---- validation helpers ---- */
      function setInvalid(id, bad) {
        var el = document.getElementById(id);
        if (bad) {
          el.classList.add("invalid");
        } else {
          el.classList.remove("invalid");
        }
        return !bad;
      }
      var phoneRe = /^(\+?92|0)?3\d{2}[\s-]?\d{7}$/;
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      /* ---- submit ---- */
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("inName").value.trim();
        var phone = document.getElementById("inPhone").value.trim();
        var email = document.getElementById("inEmail").value.trim();
        var city = document.getElementById("inCity").value;
        var address = document.getElementById("inAddress").value.trim();
        var consent1 = document.getElementById("inConsent1").checked;
        var consent2 = document.getElementById("inConsent2").checked;
        var pack = packSelect.value;

        var buyFromRadios = document.getElementsByName("buyFrom");
        var buyFrom = "";
        for (var i = 0; i < buyFromRadios.length; i++) {
          if (buyFromRadios[i].checked) buyFrom = buyFromRadios[i].value;
        }

        var currentBrand = document.getElementById("inCurrentBrand").value.trim();

        var mattersCheckboxes = document.getElementsByName("mattersMost");
        var mattersMost = [];
        for (var i = 0; i < mattersCheckboxes.length; i++) {
          if (mattersCheckboxes[i].checked) mattersMost.push(mattersCheckboxes[i].value);
        }

        var ok = true;
        ok = setInvalid("f-name", name.length < 3) && ok;
        ok =
          setInvalid("f-phone", !phoneRe.test(phone.replace(/\s/g, ""))) && ok;
        ok = setInvalid("f-email", email !== "" && !emailRe.test(email)) && ok;
        ok = setInvalid("f-city", city === "") && ok;
        ok = setInvalid("f-address", address.length < 10) && ok;
        ok = setInvalid("f-buyFrom", buyFrom === "") && ok;
        ok = setInvalid("f-currentBrand", currentBrand === "") && ok;
        ok = setInvalid("f-mattersMost", mattersMost.length === 0 || mattersMost.length > 2) && ok;
        ok = setInvalid("f-consent1", !consent1) && ok;
        ok = setInvalid("f-consent2", !consent2) && ok;

        if (!ok) {
          var firstBad = document.querySelector(
            ".field.invalid input, .field.invalid select, .field.invalid textarea, .consent-wrap.invalid input",
          );
          if (firstBad) {
            firstBad.focus();
          }
          return;
        }

        /* reference code */
        var ref = "AT-" + Math.floor(1000 + Math.random() * 9000);
        document.getElementById("refCode").textContent = "Ref: " + ref;

        /* WhatsApp confirmation link with prefilled details */
        var msg =
          "Assalam o Alaikum Aura Tea team! I would like to reserve my free sample." +
          "\nReference: " +
          ref +
          "\nName: " +
          name +
          "\nWhatsApp: " +
          phone +
          (email ? "\nEmail: " + email : "") +
          "\nCity: " +
          city +
          "\nAddress: " +
          address +
          "\nPack: " +
          pack +
          "\nBuy From: " + buyFrom +
          "\nCurrent Brand: " + currentBrand +
          "\nMatters Most: " + mattersMost.join(", ");
        document.getElementById("waConfirm").href =
          "https://wa.me/923098665556?text=" + encodeURIComponent(msg);

        // Submit to Google Sheet via Apps Script Webhook
        var scriptUrl = "https://script.google.com/macros/s/AKfycbw_mrPK_svRYMaNcbxhZXe9CUxHpRF3DpF_Zy4fElDJOFyciDW1RvCQeftqKhr7WQCLog/exec";
        if (scriptUrl) {
          var formData = new URLSearchParams();
          formData.append("Reference", ref);
          formData.append("Name", name);
          formData.append("Phone", phone);
          formData.append("Email", email);
          formData.append("City", city);
          formData.append("Pack", pack);
          formData.append("Address", address);
          formData.append("BuyFrom", buyFrom);
          formData.append("5. Which tea brand do you currently use ? *", currentBrand);
          formData.append("MatterMost", mattersMost.join(", "));

          fetch(scriptUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors"
          }).catch(function (e) {
            console.error("Error submitting to sheet", e);
          });
        }

        form.style.display = "none";
        successBox.classList.add("show");
        drawer.querySelector(".drawer-body").scrollTop = 0;
      });

      document
        .getElementById("resetForm")
        .addEventListener("click", function () {
          form.reset();
          successBox.classList.remove("show");
          form.style.display = "block";
        });

      /* ---- header shadow + floating button ---- */
      window.addEventListener(
        "scroll",
        function () {
          if (window.scrollY > 10) {
            header.classList.add("scrolled");
          } else {
            header.classList.remove("scrolled");
          }
          if (window.scrollY > 650 && !drawer.classList.contains("open")) {
            floatBtn.classList.add("show");
          } else {
            floatBtn.classList.remove("show");
          }
        },
        { passive: true },
      );

      /* ---- scroll reveal ---- */
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(
          function (entries) {
            for (var j = 0; j < entries.length; j++) {
              if (entries[j].isIntersecting) {
                entries[j].target.classList.add("in");
                io.unobserve(entries[j].target);
              }
            }
          },
          { threshold: 0.12 },
        );
        var reveals = document.querySelectorAll(".reveal");
        for (var k = 0; k < reveals.length; k++) {
          io.observe(reveals[k]);
        }
      } else {
        var all = document.querySelectorAll(".reveal");
        for (var m = 0; m < all.length; m++) {
          all[m].classList.add("in");
        }
      }
    })();
  }, []);

  return (
    <>
      <div className="announce" aria-hidden="true">
        <div className="announce-track">
          <span>
            Free sampling is now open across Pakistan{" "}
            <i className="dot-sep"></i>
          </span>
          <span>
            Unblended A-Grade leaves from the highlands of Kenya{" "}
            <i className="dot-sep"></i>
          </span>
          <span>
            No payment required, reserve your complimentary pack today{" "}
            <i className="dot-sep"></i>
          </span>
          <span>
            Free sampling is now open across Pakistan{" "}
            <i className="dot-sep"></i>
          </span>
          <span>
            Unblended A-Grade leaves from the highlands of Kenya{" "}
            <i className="dot-sep"></i>
          </span>
          <span>
            No payment required, reserve your complimentary pack today{" "}
            <i className="dot-sep"></i>
          </span>
        </div>
      </div>

      <header className="site-header" id="siteHeader">
        <div className="container header-inner">
          <nav className="nav-group left" aria-label="Primary">
            <a
              className="nav-link"
              href="https://aurapremiumtea.com/"
              target="_blank"
              rel="noopener"
            >
              Aura Tea
            </a>
            <a className="nav-link" href="https://aurapremiumtea.com/">
              Our Story
            </a>
            <a className="nav-link" href="https://aurapremiumtea.com/">
              Packages
            </a>
          </nav>
          <a
            className="brand-logo"
            href="#top"
            aria-label="Aura Premium Tea home"
          >
            <img
              src="https://aurapremiumtea.com/cdn/shop/files/AURA_TEA_LOGO_WEB_1.png?v=1779098823&amp;width=300"
              alt="Aura Premium Tea logo"
            />
          </a>
          <div className="nav-group right">
            <a className="nav-link" href="https://aurapremiumtea.com/">
              Reviews
            </a>
            <a className="nav-link" href="https://aurapremiumtea.com/">
              FAQ
            </a>
            <button className="btn btn-gold header-cta" data-open-drawer>
              Free Sample
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-mark">
                <img
                  src="https://aurapremiumtea.com/cdn/shop/files/AURA_TEA_LOGO_WEB_1.png?v=1779098823&amp;width=300"
                  alt="Aura Tea gold monogram"
                />
                <span className="since">Since 1960</span>
              </div>
              <h1 className="display-xl">
                <span>Aura Tea</span>
                <span>Free Sampling</span>
              </h1>
              <p className="lede">
                Taste the highlands of Kenya before you buy. Reserve a
                complimentary sample of our unblended premium tea and we will
                deliver it to eligible areas across Pakistan.
              </p>
              <div className="hero-actions">
                <button className="btn btn-gold" data-open-drawer>
                  Reserve My Free Sample
                </button>
                <a className="btn btn-ghost" href="#packages">
                  View Packages
                </a>
              </div>
              <p className="hero-note">No payment. No card. Just pure chai.</p>
            </div>
            <div className="hero-visual">
              <div className="arch">
                <img
                  src="/products/sample.jpeg"
                  alt="Aura Premium Tea Free Sample"
                  loading="eager"
                />
                <div className="arch-caption">Unblended Premium Tea</div>
              </div>
              <div className="stamp" aria-hidden="true">
                <svg viewBox="0 0 128 128">
                  <defs>
                    <path
                      id="stampCircle"
                      d="M64,64 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                    />
                  </defs>
                  <circle cx="64" cy="64" r="62" fill="#6E1E28" />
                  <circle
                    cx="64"
                    cy="64"
                    r="55"
                    fill="none"
                    stroke="#E9C05C"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="34"
                    fill="none"
                    stroke="#E9C05C"
                    strokeWidth="1"
                  />
                  <text
                    fill="#E9C05C"
                    fontFamily="Jost, sans-serif"
                    fontSize="12.5"
                    fontWeight="600"
                    letterSpacing="3.4"
                  >
                    <textPath href="#stampCircle">
                      FREE SAMPLE * RESERVE TODAY *{" "}
                    </textPath>
                  </text>
                  <path
                    d="M64 50 C57 57 57 68 64 78 C71 68 71 57 64 50 Z"
                    fill="#E9C05C"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <div className="ribbon" aria-hidden="true">
          <div className="ribbon-track">
            <span>
              Est. 1960 <i className="dot-sep"></i>
            </span>
            <span>
              Kenya Highlands <i className="dot-sep"></i>
            </span>
            <span>
              Unblended A-Grade Leaves <i className="dot-sep"></i>
            </span>
            <span>
              No Additives <i className="dot-sep"></i>
            </span>
            <span>
              A Gift of Royalty in Every Cup <i className="dot-sep"></i>
            </span>
            <span>
              Est. 1960 <i className="dot-sep"></i>
            </span>
            <span>
              Kenya Highlands <i className="dot-sep"></i>
            </span>
            <span>
              Unblended A-Grade Leaves <i className="dot-sep"></i>
            </span>
            <span>
              No Additives <i className="dot-sep"></i>
            </span>
            <span>
              A Gift of Royalty in Every Cup <i className="dot-sep"></i>
            </span>
          </div>
        </div>

        <section className="section steps" id="how">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">How It Works</span>
              <h2 className="display-lg">
                Three Steps to Your{" "}
                <span className="italic-accent">First Cup</span>
              </h2>
              <p className="lede">
                Reserving your complimentary Aura sample takes less than a
                minute.
              </p>
            </div>
            <div className="steps-grid">
              <article className="step-card reveal">
                <span className="step-num">1</span>
                <h3>Reserve Your Sample</h3>
                <p>
                  Fill in the short reservation form with your name, WhatsApp
                  number and delivery address. It takes under a minute.
                </p>
              </article>
              <article className="step-card reveal">
                <span className="step-num">2</span>
                <h3>We Confirm on WhatsApp</h3>
                <p>
                  Our team checks eligibility for your area and confirms your
                  reservation on WhatsApp within 48 hours.
                </p>
              </article>
              <article className="step-card reveal">
                <span className="step-num">3</span>
                <h3>Brew and Enjoy</h3>
                <p>
                  Your complimentary Aura pack arrives at your door. Doodh
                  patti, karak or black, the choice is yours.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section packages" id="packages">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Premium Packages</span>
              <h2 className="display-lg">
                The Packs You Can <span className="italic-accent">Sample</span>
              </h2>
              <p className="lede">
                Every pack holds the same handpicked, unblended A-grade leaves.
                Choose the one you would like to try first.
              </p>
            </div>
            <div
              className="pack-grid"
              style={{
                gridTemplateColumns: "1fr",
                maxWidth: "320px",
                margin: "0 auto",
              }}
            >
              <article className="pack-card reveal">
                <div className="pack-img">
                  <img
                    src="/products/sample.jpeg"
                    alt="Daily Aura 85 gram pack"
                    loading="lazy"
                  />
                </div>
                <div className="pack-body">
                  <h3>Daily Aura</h3>
                  <div className="pack-price">
                    <span className="price-now">Free Sample</span>
                  </div>
                  <button
                    className="btn btn-dark"
                    data-open-drawer
                    data-pack="Daily Aura"
                  >
                    Sample This Pack
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section story" id="story">
          <div className="container story-grid">
            <div className="story-copy reveal">
              <span className="eyebrow left-only">Our Story</span>
              <h2 className="display-lg">
                Handpicked. Unblended.{" "}
                <span className="italic-accent">Unforgettable.</span>
              </h2>
              <p>
                From the lush highlands of Kenya, our premium leaves are
                handpicked with care, unblended, and free from artificial
                additives. Every batch carries the natural strength, rich aroma,
                and timeless tradition of the farms where it begins.
              </p>
              <p>
                Today, Aura Tea proudly arrives in Pakistan, a place where tea
                is more than a drink. It is culture, comfort, and connection.
                With each sip, Aura brings the warmth of heritage and the purity
                of nature into your cup.
              </p>
              <blockquote className="story-quote">
                Aura Premium Tea is not just tea. It is a story of passion,
                purity, and perfection. A gift of royalty in every cup.
              </blockquote>
              <a
                className="btn btn-gold"
                href="https://aurapremiumtea.com/pages/about-us"
                target="_blank"
                rel="noopener"
              >
                Read Our Full Story
              </a>
            </div>
            <div className="story-visual reveal">
              <img
                src="https://cdn.shopify.com/s/files/1/0900/3158/7615/files/702659075_18101546195103527_9080362627445793966_n.jpg?v=1781199930"
                alt="Tea pickers in the highlands of Kenya"
                loading="lazy"
              />
              <div className="story-badge">
                <strong>1960</strong>
                <small>Kenya</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="container section-head reveal">
            <span className="eyebrow">Loved Across Pakistan</span>
            <h2 className="display-lg">
              What Chai Lovers <span className="italic-accent">Are Saying</span>
            </h2>
            <p className="lede">
              Real words from homes in Lahore, Karachi, Islamabad, Rawalpindi
              and beyond.
            </p>
          </div>

          <div className="rev-lane">
            <div className="rev-track">
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura chai has completely replaced my morning routine. The
                  aroma alone is something extraordinary, pure and rich."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">FM</span>
                  <span>
                    <strong>Fatima Malik</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Maine kabhi aisi chai nahi pi. Sach mein yeh premium quality
                  hai, har ghoot mein fark nazar aata hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">AR</span>
                  <span>
                    <strong>Ahmed Raza</strong>
                    <small>Karachi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "We serve Aura to our guests and they always ask for the
                  brand. It has become a staple in our home, Alhamdulillah."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">ZS</span>
                  <span>
                    <strong>Zainab Siddiqui</strong>
                    <small>Islamabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Doodh patti banaiye Aura ki pattiyon se, bas phir daikhtay
                  jaiye. Every cup is a blessing."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">UC</span>
                  <span>
                    <strong>Usman Chaudhry</strong>
                    <small>Faisalabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "The fragrance when the tea steeps is unlike anything I have
                  experienced. Genuinely world-class quality in Pakistan."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">HB</span>
                  <span>
                    <strong>Hina Baig</strong>
                    <small>Multan</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura ki khushboo ghar mein phailti hai toh sab samajh jaate
                  hain chai tayyar ho rahi hai. Perfect blend!"
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">BH</span>
                  <span>
                    <strong>Bilal Hussain</strong>
                    <small>Rawalpindi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "I bought a gift pack for Eid and everyone loved it. Premium
                  packaging, premium taste. Aura delivers on every promise."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">HS</span>
                  <span>
                    <strong>Hamza Sheikh</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Subah ki chai Aura ke baghair ab adhoori lagti hai. Ghar
                  walon ne bhi yahi pasand kiya hai ab."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">RB</span>
                  <span>
                    <strong>Rukhsana Begum</strong>
                    <small>Peshawar</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura chai has completely replaced my morning routine. The
                  aroma alone is something extraordinary, pure and rich."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">FM</span>
                  <span>
                    <strong>Fatima Malik</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Maine kabhi aisi chai nahi pi. Sach mein yeh premium quality
                  hai, har ghoot mein fark nazar aata hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">AR</span>
                  <span>
                    <strong>Ahmed Raza</strong>
                    <small>Karachi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "We serve Aura to our guests and they always ask for the
                  brand. It has become a staple in our home, Alhamdulillah."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">ZS</span>
                  <span>
                    <strong>Zainab Siddiqui</strong>
                    <small>Islamabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Doodh patti banaiye Aura ki pattiyon se, bas phir daikhtay
                  jaiye. Every cup is a blessing."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">UC</span>
                  <span>
                    <strong>Usman Chaudhry</strong>
                    <small>Faisalabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "The fragrance when the tea steeps is unlike anything I have
                  experienced. Genuinely world-class quality in Pakistan."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">HB</span>
                  <span>
                    <strong>Hina Baig</strong>
                    <small>Multan</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura ki khushboo ghar mein phailti hai toh sab samajh jaate
                  hain chai tayyar ho rahi hai. Perfect blend!"
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">BH</span>
                  <span>
                    <strong>Bilal Hussain</strong>
                    <small>Rawalpindi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "I bought a gift pack for Eid and everyone loved it. Premium
                  packaging, premium taste. Aura delivers on every promise."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">HS</span>
                  <span>
                    <strong>Hamza Sheikh</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Subah ki chai Aura ke baghair ab adhoori lagti hai. Ghar
                  walon ne bhi yahi pasand kiya hai ab."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">RB</span>
                  <span>
                    <strong>Rukhsana Begum</strong>
                    <small>Peshawar</small>
                  </span>
                </div>
              </article>
            </div>
          </div>

          <div className="rev-lane">
            <div className="rev-track reverse">
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "The color, strength, and taste, everything is perfectly
                  balanced. No artificial taste whatsoever. 100% recommended."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">TM</span>
                  <span>
                    <strong>Tariq Mehmood</strong>
                    <small>Sialkot</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura Tea ne meri chai ki definition badal di. Ab koi aur
                  brand achha hi nahi lagta. Yeh ek khas cheez hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">NI</span>
                  <span>
                    <strong>Nadia Iqbal</strong>
                    <small>Hyderabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Daftar mein sab log poochte hain kaunsi chai bana rahe ho.
                  Yahi Aura wali. Sab ko pasand aati hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">SH</span>
                  <span>
                    <strong>Saad ul Haq</strong>
                    <small>Quetta</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Premium loose-leaf at a fair price. The Kenya origin makes
                  all the difference. You can actually taste the freshness."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">SN</span>
                  <span>
                    <strong>Sobia Nawaz</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Yeh chai waqai royalty wali feel deti hai. Ghar mein mehman
                  aa jaye toh Aura serve karo. Sab impressed ho jaate hain."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">IB</span>
                  <span>
                    <strong>Imran Butt</strong>
                    <small>Karachi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "I was skeptical at first but one cup and I was convinced. No
                  bitterness, only smooth richness. Aura is my forever brand."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">MR</span>
                  <span>
                    <strong>Madiha Rehman</strong>
                    <small>Abbottabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Bhai ne gift kiya tha. Ab mai khud khareedta hoon. Quality
                  itni achi hai ke doosri chai pehle jaisi achhi nahi lagti."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">KA</span>
                  <span>
                    <strong>Kashif Ali</strong>
                    <small>Multan</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Honestly the best chai I have had in Pakistan. The leaves are
                  proper quality and the brew is outstanding every single time."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">JH</span>
                  <span>
                    <strong>Jawad Hassan</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "The color, strength, and taste, everything is perfectly
                  balanced. No artificial taste whatsoever. 100% recommended."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">TM</span>
                  <span>
                    <strong>Tariq Mehmood</strong>
                    <small>Sialkot</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Aura Tea ne meri chai ki definition badal di. Ab koi aur
                  brand achha hi nahi lagta. Yeh ek khas cheez hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">NI</span>
                  <span>
                    <strong>Nadia Iqbal</strong>
                    <small>Hyderabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Daftar mein sab log poochte hain kaunsi chai bana rahe ho.
                  Yahi Aura wali. Sab ko pasand aati hai."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">SH</span>
                  <span>
                    <strong>Saad ul Haq</strong>
                    <small>Quetta</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Premium loose-leaf at a fair price. The Kenya origin makes
                  all the difference. You can actually taste the freshness."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">SN</span>
                  <span>
                    <strong>Sobia Nawaz</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Yeh chai waqai royalty wali feel deti hai. Ghar mein mehman
                  aa jaye toh Aura serve karo. Sab impressed ho jaate hain."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">IB</span>
                  <span>
                    <strong>Imran Butt</strong>
                    <small>Karachi</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "I was skeptical at first but one cup and I was convinced. No
                  bitterness, only smooth richness. Aura is my forever brand."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">MR</span>
                  <span>
                    <strong>Madiha Rehman</strong>
                    <small>Abbottabad</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Bhai ne gift kiya tha. Ab mai khud khareedta hoon. Quality
                  itni achi hai ke doosri chai pehle jaisi achhi nahi lagti."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">KA</span>
                  <span>
                    <strong>Kashif Ali</strong>
                    <small>Multan</small>
                  </span>
                </div>
              </article>
              <article className="rev-card">
                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>
                  "Honestly the best chai I have had in Pakistan. The leaves are
                  proper quality and the brew is outstanding every single time."
                </blockquote>
                <div className="rev-meta">
                  <span className="rev-avatar">JH</span>
                  <span>
                    <strong>Jawad Hassan</strong>
                    <small>Lahore</small>
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Got Questions</span>
              <h2 className="display-lg">
                Frequently Asked{" "}
                <span className="italic-accent">Questions</span>
              </h2>
              <p className="lede">
                Everything you need to know about the free sampling campaign and
                Aura Premium Tea.
              </p>
            </div>
            <div className="faq-list reveal">
              <details className="faq-item" open>
                <summary>
                  How do I request a free sample?
                  <span className="faq-icon"></span>
                </summary>
                <p>
                  Simply fill out the free sample reservation form on this page.
                  If your area is eligible, our team will confirm your
                  reservation on WhatsApp and send a complimentary sample to
                  your address.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  Is the sample really free?<span className="faq-icon"></span>
                </summary>
                <p>
                  Yes. There is no payment and no card required. The sampling
                  campaign is limited to one free sample per household while
                  stock lasts.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  Which areas are eligible?<span className="faq-icon"></span>
                </summary>
                <p>
                  We are currently sampling in major cities across Pakistan,
                  starting with Islamabad, Rawalpindi, Lahore and Karachi.
                  Submit your address and our team will confirm eligibility for
                  your location.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  What makes Aura Premium Tea different?
                  <span className="faq-icon"></span>
                </summary>
                <p>
                  Aura Premium Tea is made with premium unblended tea leaves
                  sourced from Kenya. Unlike blended teas, every cup delivers a
                  naturally rich taste, strong aroma, and consistent quality.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  What does unblended tea mean?
                  <span className="faq-icon"></span>
                </summary>
                <p>
                  Unblended tea is made from carefully selected tea leaves
                  without mixing different grades or fillers, resulting in a
                  purer, richer, and more authentic tea experience.
                </p>
              </details>
              <details className="faq-item">
                <summary>
                  Does Aura Tea make strong karak chai?
                  <span className="faq-icon"></span>
                </summary>
                <p>
                  Yes. Aura is specially selected to deliver a rich, full-bodied
                  karak chai with a strong aroma. It works beautifully for both
                  milk tea and black tea.
                </p>
              </details>
            </div>
            <p className="faq-fineprint">
              One free sample per household. Subject to area eligibility and
              stock availability.
            </p>
          </div>
        </section>

        <section className="section final-cta">
          <div className="container final-inner reveal">
            <span className="eyebrow">The Aura Experience</span>
            <h2 className="display-lg">Sip the Ritual</h2>
            <p className="italic-accent">
              A gift of royalty in every cup, now at your doorstep.
            </p>
            <button className="btn btn-gold" data-open-drawer>
              Reserve My Free Sample
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img
                src="https://aurapremiumtea.com/cdn/shop/files/AURA_TEA_LOGO_WEB_1.png?v=1779098823&amp;width=300"
                alt="Aura Premium Tea logo"
              />
              <p>A Gift of Royalty in Every Cup</p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li>
                  <a
                    href="https://aurapremiumtea.com/pages/about-us"
                    target="_blank"
                    rel="noopener"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="https://aurapremiumtea.com/collections/all"
                    target="_blank"
                    rel="noopener"
                  >
                    Shop Tea
                  </a>
                </li>
                <li>
                  <a
                    href="https://aurapremiumtea.com/blogs/news"
                    target="_blank"
                    rel="noopener"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://aurapremiumtea.com/pages/contact"
                    target="_blank"
                    rel="noopener"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/aurateaofficial"
                    target="_blank"
                    rel="noopener"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/923098665556"
                    target="_blank"
                    rel="noopener"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get In Touch</h4>
              <p>+92 309 9077880</p>
              <p>Info.auratea@gmail.com</p>
              <p>
                Factory: Plot 96, Street 7, I-10/3, Industrial Area, Islamabad
              </p>
              <p>Monday to Friday, 9:00 AM to 6:00 PM</p>
            </div>
          </div>
          <div className="footer-bottom">
            <small>&copy; 2026 Aura Premium Tea. All rights reserved.</small>
            <small>
              Premium A-Grade Loose-Leaf Tea <i className="dot-sep"></i> Sourced
              from the Highlands of Kenya <i className="dot-sep"></i> Est. 1960
            </small>
          </div>
        </div>
      </footer>

      <button className="btn btn-gold float-btn" id="floatBtn" data-open-drawer>
        Free Sample
      </button>

      <div className="overlay" id="overlay"></div>
      <aside
        className="drawer"
        id="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
      >
        <div className="drawer-head">
          <div>
            <h3 id="drawerTitle">Reserve Your Free Sample</h3>
            <small>No payment required</small>
          </div>
          <button
            className="drawer-close"
            id="drawerClose"
            aria-label="Close reservation panel"
          >
            &#10005;
          </button>
        </div>
        <div className="drawer-body">
          <form id="sampleForm" noValidate>
            <div className="field" id="f-name">
              <label htmlFor="inName">
                Full Name <em>*</em>
              </label>
              <input
                type="text"
                id="inName"
                name="name"
                placeholder="e.g. Ayesha Khan"
                autoComplete="name"
              />
              <span className="err">Please enter your full name.</span>
            </div>

            <div className="field" id="f-phone">
              <label htmlFor="inPhone">
                WhatsApp Number <em>*</em>
              </label>
              <input
                type="tel"
                id="inPhone"
                name="phone"
                placeholder="03XX XXXXXXX"
                autoComplete="tel"
              />
              <span className="err">
                Please enter a valid Pakistani mobile number.
              </span>
            </div>

            <div className="field" id="f-email">
              <label htmlFor="inEmail">Email (Optional)</label>
              <input
                type="email"
                id="inEmail"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
              />
              <span className="err">Please enter a valid email address.</span>
            </div>

            <div className="field-row">
              <div className="field" id="f-city">
                <label htmlFor="inCity">
                  City <em>*</em>
                </label>
                <select id="inCity" name="city" defaultValue="">
                  <option value="" disabled>
                    Select your city
                  </option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </select>
                <span className="err">Please select your city.</span>
              </div>
              <div className="field" id="f-pack">
                <label htmlFor="inPack">Pack to Sample</label>
                <select id="inPack" name="pack">
                  <option>Daily Aura</option>
                </select>
              </div>
            </div>

            <div className="field" id="f-address">
              <label htmlFor="inAddress">
                Delivery Address <em>*</em>
              </label>
              <textarea
                id="inAddress"
                name="address"
                placeholder="House, street, sector or area"
                autoComplete="street-address"
              ></textarea>
              <span className="err">
                Please enter your complete delivery address.
              </span>
            </div>

            <div className="field" id="f-buyFrom">
              <label>
                4. Where do you usually buy tea? <em>*</em>
              </label>
              <div className="chip-group" id="inBuyFrom">
                <input type="radio" id="buyStore" name="buyFrom" value="Local grocery store" />
                <label htmlFor="buyStore">Local grocery store</label>

                <input type="radio" id="buySupermarket" name="buyFrom" value="Supermarket" />
                <label htmlFor="buySupermarket">Supermarket</label>

                <input type="radio" id="buyCash" name="buyFrom" value="Cash & Carry" />
                <label htmlFor="buyCash">Cash & Carry</label>

                <input type="radio" id="buyOnline" name="buyFrom" value="Online" />
                <label htmlFor="buyOnline">Online</label>
              </div>
              <span className="err">Please select an option.</span>
            </div>

            <div className="field" id="f-currentBrand">
              <label htmlFor="inCurrentBrand">
                5. Which tea brand do you currently use ? <em>*</em>
              </label>
              <input
                type="text"
                id="inCurrentBrand"
                name="currentBrand"
                placeholder="e.g. Lipton, Tapal"
              />
              <span className="err">Please enter your current tea brand.</span>
            </div>

            <div className="field" id="f-mattersMost">
              <label>
                6. What matters most when choosing tea? (Select up to 2) <em>*</em>
              </label>
              <div className="chip-group" id="inMattersMost">
                <input type="checkbox" id="matTaste" name="mattersMost" value="Strong taste" />
                <label htmlFor="matTaste">Strong taste</label>

                <input type="checkbox" id="matAroma" name="mattersMost" value="Aroma" />
                <label htmlFor="matAroma">Aroma</label>

                <input type="checkbox" id="matColour" name="mattersMost" value="Colour" />
                <label htmlFor="matColour">Colour</label>

                <input type="checkbox" id="matPrice" name="mattersMost" value="Price" />
                <label htmlFor="matPrice">Price</label>

                <input type="checkbox" id="matBrand" name="mattersMost" value="Brand reputation" />
                <label htmlFor="matBrand">Brand reputation</label>

                <input type="checkbox" id="matPurity" name="mattersMost" value="Purity" />
                <label htmlFor="matPurity">Purity</label>

                <input type="checkbox" id="matHealth" name="mattersMost" value="Health" />
                <label htmlFor="matHealth">Health</label>

                <input type="checkbox" id="matValue" name="mattersMost" value="Value for money" />
                <label htmlFor="matValue">Value for money</label>
              </div>
              <span className="err">Please select 1 or 2 options.</span>
            </div>

            <div className="consent-wrap" id="f-consent1">
              <div className="consent">
                <input type="checkbox" id="inConsent1" />
                <label htmlFor="inConsent1">
                  I understand this offer is limited to one free sample per household/address.
                </label>
              </div>
            </div>

            <div className="consent-wrap" id="f-consent2">
              <div className="consent">
                <input type="checkbox" id="inConsent2" />
                <label htmlFor="inConsent2">
                  I agree that Aura Tea may contact me for feedback about the sample.
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-gold btn-block">
              Reserve My Free Sample
            </button>
            <p className="form-note">
              One sample per household, while stock lasts
            </p>
          </form>

          <div className="success" id="successBox">
            <div className="success-check">
              <svg viewBox="0 0 40 40" fill="none">
                <path
                  d="M8 21l8 8 16-18"
                  stroke="#2B1F14"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>Reservation Received!</h4>
            <span className="ref" id="refCode">
              Ref: AT-0000
            </span>
            <p>
              Shukriya! Our team will confirm your free sample on WhatsApp
              within 48 hours.
            </p>
            <a
              className="btn btn-dark"
              id="waConfirm"
              href="#"
              target="_blank"
              rel="noopener"
            >
              Confirm on WhatsApp Now
            </a>
            <button className="reset-link" id="resetForm">
              Reserve for someone else
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
