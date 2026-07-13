export default function VideoBand() {
  return (
    <section className="video-band">
      <div className="wrap">
        <div className="eyebrow">Now Playing</div>
        <h2 className="serif">The Aura That <em>Hits Different</em></h2>
        <p>Pure. Bold. Made for a generation that chooses better.</p>
        <div className="video-frame" style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube.com/embed/DZA7jvFvr_Q?autoplay=1&mute=1&loop=1&playlist=DZA7jvFvr_Q&controls=0&showinfo=0&rel=0&playsinline=1&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0"
            title="Aura Premium Tea Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              transform: 'translate(-50%, -50%) scale(1.35)',
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
