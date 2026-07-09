export default function Hero() {
  return (
    <section className="hero">
      <video className="hero-bg" autoPlay muted loop playsInline>
        <source src="https://cdn.shopify.com/videos/c/o/v/19a92b93ed0448199f95c74cdd724378.mp4" type="video/mp4" />
      </video>
      <div className="wrap hero-inner" />
    </section>
  )
}
