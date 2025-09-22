import React from 'react';
import CosmicBackground from '../components/CosmicBackground';

function Team() {
  const members = [
    {
      name: 'Abdullah Memon',
      initials: 'AM',
      role: 'AI Developer',
      summary:
        'Leads model integration and agentic capabilities. Designs evaluation loops to ensure reliability and ROI.',
      focus: ['LLM apps', 'RAG', 'Tool use', 'Evaluation'],
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com', type: 'primary' },
      ],
    },
    {
      name: 'Saad Bin Wasi',
      initials: 'SW',
      role: 'Full‑stack & AI Engineer',
      summary:
        'Owns end‑to‑end delivery across frontend, backend, and automations. Builds observable, secure systems.',
      focus: ['Product engineering', 'Orchestration', 'Reliability', 'Automation'],
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
                      <span>{m.initials}</span>
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