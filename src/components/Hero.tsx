"use client";

export default function Hero() {
  return (
    <section className="hero">
      <iframe
        className="hero-bg"
        src="https://www.youtube.com/embed/SwNnjjCHJZI?autoplay=1&mute=1&loop=1&playlist=SwNnjjCHJZI&controls=0&showinfo=0&rel=0&playsinline=1&iv_load_policy=3"
        title="Hero Background Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        style={{
          border: 'none',
          pointerEvents: 'none',
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
        }}
      />
      <div className="wrap hero-inner" />
    </section>
  )
}
