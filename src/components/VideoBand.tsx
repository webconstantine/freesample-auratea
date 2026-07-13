export default function VideoBand() {
  return (
    <section className="video-band">
      <div className="wrap">
        <div className="eyebrow">Now Playing</div>
        <h2 className="serif">The Aura That <em>Hits Different</em></h2>
        <p>Pure. Bold. Made for a generation that chooses better.</p>
        <div className="video-frame">
          <iframe
            src="https://www.youtube.com/embed/DZA7jvFvr_Q?autoplay=1&mute=1&loop=1&playlist=DZA7jvFvr_Q&controls=0&showinfo=0&rel=0&playsinline=1&iv_load_policy=3"
            title="Aura Premium Tea Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              width: '100%',
              display: 'block',
              aspectRatio: '16/7',
              border: 'none',
              pointerEvents: 'none',
              background: '#000',
            }}
          />
        </div>
      </div>
    </section>
  )
}
