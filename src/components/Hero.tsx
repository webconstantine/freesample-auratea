"use client";

export default function Hero() {
  return (
    <section className="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
        <iframe
          className="hero-bg"
          src="https://www.youtube.com/embed/SwNnjjCHJZI?autoplay=1&mute=1&loop=1&playlist=SwNnjjCHJZI&controls=0&showinfo=0&rel=0&playsinline=1&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
          title="Hero Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', /* 16:9 ratio */
            minHeight: '100vh',
            minWidth: '177.77vh', /* 16:9 ratio */
            transform: 'translate(-50%, -50%) scale(1.35)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div className="wrap hero-inner" />
    </section>
  )
}
