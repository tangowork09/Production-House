import "./Clients.css";

// Swap logo SVGs with <img src="..." /> once you have actual brand assets

export default function Clients() {
  const displayClients = [
    { name: "Client 1", logo: "/logo/client-1.svg" },
    { name: "Client 2", logo: "/logo/client-2.png" },
    { name: "Client 3", logo: "/logo/client-3.png" },
    { name: "Client 4", logo: "/logo/client-4.png" },
    { name: "Client 5", logo: "/logo/client-5.png" },
    { name: "Client 6", logo: "/logo/client-6.png" },
    { name: "Client 7", logo: "/logo/client-7.png" },
    { name: "Client 8", logo: "/logo/client-8.png" },
  ];

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
