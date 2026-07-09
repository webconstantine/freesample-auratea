'use client'

import { useEffect } from 'react'

export default function Header() {
  useEffect(() => {
    const hdr = document.getElementById('hdr')
    const onScroll = () => hdr?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    onScroll()

    const burgerBtn = document.getElementById('burgerBtn')
    const drawerClose = document.getElementById('drawerClose')
    const drawerOverlay = document.getElementById('drawerOverlay')
    const mobileDrawer = document.getElementById('mobileDrawer')

    const openDrawer = () => {
      mobileDrawer?.classList.add('open')
      drawerOverlay?.classList.add('open')
      document.body.style.overflow = 'hidden'
    }
    const closeDrawer = () => {
      mobileDrawer?.classList.remove('open')
      drawerOverlay?.classList.remove('open')
      document.body.style.overflow = ''
    }

    burgerBtn?.addEventListener('click', openDrawer)
    drawerClose?.addEventListener('click', closeDrawer)
    drawerOverlay?.addEventListener('click', closeDrawer)

    return () => {
      window.removeEventListener('scroll', onScroll)
      burgerBtn?.removeEventListener('click', openDrawer)
      drawerClose?.removeEventListener('click', closeDrawer)
      drawerOverlay?.removeEventListener('click', closeDrawer)
    }
  }, [])

  return (
    <>
      <div className="drawer-overlay" id="drawerOverlay" />
      <div className="drawer" id="mobileDrawer">
        <div className="drawer-header">
          <div className="drawer-title">Menu</div>
          <button className="drawer-close" id="drawerClose" aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="drawer-links">
          <a href="https://aurapremiumtea.com/">Aura Tea</a>
          <a href="https://aurapremiumtea.com/pages/about-us">Our Story</a>
          <a href="https://aurapremiumtea.com/collections">Products</a>
          <a href="https://aurapremiumtea.com/pages/get-in-touch">Get In Touch</a>
        </div>
      </div>

      <div className="top-group">
        <div className="topbar">Unblended Premium Tea</div>
        <header className="site" id="hdr">
          <div className="wrap">
            <div className="nav">
              <div className="nav-left">
                <button className="burger mobile-only" id="burgerBtn" aria-label="Menu">
                  <svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
                </button>
                <a className="link desktop-only" href="https://aurapremiumtea.com/">Aura Tea</a>
                <a className="link desktop-only" href="https://aurapremiumtea.com/pages/about-us">Our Story</a>
              </div>
              <div className="brand">
                <a href="https://aurapremiumtea.com/">
                  <img src="https://aurapremiumtea.com/cdn/shop/files/AURA_TEA_LOGO_WEB_1.png?v=1779098823&width=160" alt="AURA PREMIUM TEA" />
                </a>
              </div>
              <div className="nav-right">
                <a className="link desktop-only" href="https://aurapremiumtea.com/collections">Products</a>
                <a className="link desktop-only" href="https://aurapremiumtea.com/pages/get-in-touch">Get In Touch</a>
                <div className="icons" />
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
