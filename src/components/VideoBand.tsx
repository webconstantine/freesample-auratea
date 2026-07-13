export default function VideoBand() {
  return (
    <section className="video-band">
      <div className="wrap">
        <div className="eyebrow">Now Playing</div>
        <h2 className="serif">The Aura That <em>Hits Different</em></h2>
        <p>Pure. Bold. Made for a generation that chooses better.</p>
        <div className="video-frame">
          <video autoPlay muted loop playsInline poster="/products/freesample.jpeg">
            <source src="https://cdn.shopify.com/videos/c/o/v/1efe0c81495b4f0ab768764ee3e5298c.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
