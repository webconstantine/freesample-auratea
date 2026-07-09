export default function VideoBand() {
  return (
    <section className="video-band">
      <div className="wrap">
        <div className="eyebrow">Now Playing</div>
        <h2 className="serif">The Aura That <em>Hits Different</em></h2>
        <p>Pure. Bold. Made for a generation that chooses better.</p>
        <div className="video-frame">
          <video autoPlay muted loop playsInline poster="https://cdn.shopify.com/s/files/1/0900/3158/7615/files/702659075_18101546195103527_9080362627445793966_n.jpg?v=1781199930">
            <source src="https://cdn.shopify.com/videos/c/o/v/1efe0c81495b4f0ab768764ee3e5298c.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
