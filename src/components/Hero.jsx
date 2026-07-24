export default function Hero() {
  return (
    <section id="top" className="relative">
      <img
        src="/trade-hero.jpg"
        alt="HAWEE International Trade Fair"
        className="w-full h-auto block"
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
    </section>
  )
}
