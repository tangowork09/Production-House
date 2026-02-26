import './Clients.css'

// Swap logo SVGs with <img src="..." /> once you have actual brand assets
const clients = [
  { name: 'Hamdard', initials: 'H', bg: '#1b5e20', fg: '#ffffff' },
  { name: 'Tetrapack', initials: 'TP', bg: '#0d47a1', fg: '#ffffff' },
  { name: 'Sokudo', initials: 'SK', bg: '#e65100', fg: '#ffffff' },
  { name: 'Shree Cement', initials: 'SC', bg: '#4e342e', fg: '#ffffff' },
  { name: 'Meta', initials: 'M', bg: '#1877f2', fg: '#ffffff' },
  { name: 'Delhi Police', initials: 'DP', bg: '#1a237e', fg: '#ffffff' },
  { name: 'Safe Shop', initials: 'SS', bg: '#00695c', fg: '#ffffff' },
  { name: 'Realme', initials: 'Re', bg: '#ffd600', fg: '#1a1a1a' },
  { name: 'Odhni', initials: 'O', bg: '#6a1b9a', fg: '#ffffff' },
  { name: 'Gulshan Homz', initials: 'GH', bg: '#bf360c', fg: '#ffffff' },
  { name: "Hong's Kitchen", initials: 'HK', bg: '#b71c1c', fg: '#ffffff' },
  { name: 'Welt Hunger Hilfe', initials: 'W', bg: '#c62828', fg: '#ffffff' },
  { name: 'Ajnara', initials: 'Aj', bg: '#b8922a', fg: '#ffffff' },
  { name: 'Prega News', initials: 'PN', bg: '#880e4f', fg: '#ffffff' },
  { name: 'Namaste India', initials: 'NI', bg: '#e65100', fg: '#ffffff' },
  { name: 'Art of Living', initials: 'AOL', bg: '#f57f17', fg: '#ffffff' },
  { name: 'Bada Business', initials: 'BB', bg: '#006064', fg: '#ffffff' },
  { name: 'Bajaj', initials: 'B', bg: '#1565c0', fg: '#ffffff' },
  { name: 'Livespace', initials: 'LS', bg: '#2e7d32', fg: '#ffffff' },
  { name: 'Mastercard', initials: 'MC', bg: '#eb001b', fg: '#ffffff' },
  { name: 'Maruti Suzuki', initials: 'MS', bg: '#283593', fg: '#ffffff' },
]

function LogoIcon({ initials, bg, fg }) {
  const size = initials.length > 2 ? 13 : initials.length === 2 ? 18 : 22
  return (
    <svg viewBox="0 0 64 64" className="clients__logo-svg" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill={bg} />
      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontWeight="800"
        fill={fg}
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {initials}
      </text>
    </svg>
  )
}

export default function Clients() {
  // Use a smaller array for the marquee data, as it is duplicated for the infinite loop
  const displayClients = Array(10).fill({ name: 'Breeze', logo: '/logo/breeze.svg' })

  return (
    <section className="clients">
      <div className="clients__header container">
        <span className="clients__label">Trusted By</span>
        <h2 className="clients__title">Some of our Clients</h2>
      </div>

      {/* Infinite marquee — list duplicated for seamless loop */}
      <div className="clients__marquee-wrap">
        <div className="clients__track">
          {[...displayClients, ...displayClients].map((c, i) => (
            <div className="clients__card" key={i}>
              <div className="clients__logo-box">
                <img src={c.logo} alt={c.name} className="clients__logo-img" />
              </div>
              <span className="clients__card-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
