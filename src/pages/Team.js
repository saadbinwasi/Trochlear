import React from 'react';
import CosmicBackground from '../components/CosmicBackground';
import waniaPhoto from '../assets/team/wania-adnan.jpg';

function Team() {
  const members = [
    {
      name: 'Saad Bin Wasi',
      initials: 'SW',
      role: 'Co‑Founder',
      summary:
        'Owns end‑to‑end delivery across frontend, backend, and automations. Builds observable, secure systems.',
      focus: ['Product engineering', 'Orchestration', 'Reliability', 'Automation'],
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com', type: 'primary' },
      ],
    },
    {
      name: 'Wania Adnan',
      initials: 'WA',
      photo: waniaPhoto,
      role: 'Founder',
      summary:
        'Sets the vision and direction for Trochlear. Leads strategy, partnerships, and client outcomes.',
      focus: ['Vision', 'Strategy', 'Partnerships', 'Growth'],
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com', type: 'primary' },
      ],
    },
  ];

  return (
    <>
      <div className="fx-fixed">
        <CosmicBackground opacity={0.9} />
      </div>
      <main className="fx-page">
        <section className="section team-hero">
          <div className="section-inner">
            <h2>Our Team</h2>
            <p className="subtitle team-subtitle">
              Senior engineers and designers focused on shipping measurable outcomes. We manage the full lifecycle—from strategy to delivery—and stay accountable to ROI.
            </p>
          </div>
        </section>

        <section className="section" id="team">
          <div className="section-inner">
            <div className="team-grid">
              {members.map((m) => (
                <article className="member-card" key={m.name}>
                  <div className="member-head">
                    <div className="avatar" aria-hidden="true">
                      {m.photo ? (
                        <img src={m.photo} alt="" />
                      ) : (
                        <span>{m.initials}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="member-name">{m.name}</h3>
                      <div className="member-role">{m.role}</div>
                    </div>
                  </div>

                  <p className="member-summary">{m.summary}</p>

                  <div className="member-focus">
                    {m.focus.map((f) => (
                      <span className="pill" key={f}>{f}</span>
                    ))}
                  </div>

                  <div className="member-actions">
                    {m.links.map((l) => (
                      <a
                        key={l.label}
                        className={l.type === 'primary' ? 'btn btn-primary' : 'btn btn-ghost'}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Team; 