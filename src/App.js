import './App.css';
import { useState } from 'react';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  const handleLangChange = (e) => {
    const value = e.target.value;
    setLang(value);
    try { localStorage.setItem('lang', value); } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = process.env.REACT_APP_FORMSPREE_ENDPOINT || '';
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
      message: form.get('message'),
    };

    if (endpoint) {
      try {
        setFormState({ status: 'submitting', message: '' });
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setFormState({ status: 'success', message: 'Thanks — we will get back shortly.' });
          e.currentTarget.reset();
          return;
        }
        const text = await res.text();
        throw new Error(text || 'Submission failed');
      } catch (err) {
        setFormState({ status: 'error', message: 'Could not submit. You can email us directly.' });
      }
    } else {
      const subject = encodeURIComponent('Project inquiry — Trochlear');
      const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\nCompany: ${payload.company}\n\n${payload.message}`);
      window.location.href = `mailto:hello@trochlear.ai?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="site">
      <header className="nav">
        <div className="nav-brand">Trochlear</div>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#contact" className="btn btn-outline">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <h1>
              AI Software Development, Crafted for Luxury-Grade Outcomes..
            </h1>
            <p className="subtitle">
              We design, engineer, and ship AI-powered products and automations that drive measurable ROI for global brands.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href="https://www.linkedin.com/company/trochlear/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
              <a className="btn btn-ghost" href="#services">Explore Services</a>
            </div>
          </div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>Strategy</span>
            <span>Vision</span>
            <span>Design</span>
            <span>Engineering</span>
            <span>Automation</span>
            <span>Analytics</span>
            <span>Strategy</span>
            <span>Vision</span>
            <span>Design</span>
            <span>Engineering</span>
            <span>Automation</span>
            <span>Analytics</span>
          </div>
        </section>

        <section className="section" id="services">
          <h2>Services</h2>
          <div className="cards">
            <div className="card">
              <h3>AI Product Development</h3>
              <p>Custom AI apps, copilots, and agents—from concept to launch.</p>
            </div>
            <div className="card">
              <h3>Automation & Ops</h3>
              <p>Streamline workflows with robust, observable automations.</p>
            </div>
            <div className="card">
              <h3>Data & Integrations</h3>
              <p>ETL, vector search, and secure integrations across your stack.</p>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <h2>Case Studies</h2>
          <div className="studies">
            <article className="study">
              <div className="study-head">
                <h3>Luxury Retail — AI Styling Copilot</h3>
                <span className="badge">+18% AOV</span>
              </div>
              <p>
                Conversational product assistant that personalizes looks and bundles across catalog and inventory signals.
              </p>
            </article>
            <article className="study">
              <div className="study-head">
                <h3>Global Logistics — Ops Automation</h3>
                <span className="badge">-42% TTR</span>
              </div>
              <p>
                Automated exception handling with human-in-the-loop review, observability, and audit trails.
              </p>
            </article>
            <article className="study">
              <div className="study-head">
                <h3>Financial Services — Risk Copilot</h3>
                <span className="badge">99.9% SLA</span>
              </div>
              <p>
                Document intelligence and decision support integrated with internal policy and third-party data.
              </p>
            </article>
          </div>
        </section>

        <section className="section" id="approach">
          <h2>Approach</h2>
          <ul className="steps">
            <li>
              <span className="step-index">01</span>
              <div>
                <h4>Diagnostic</h4>
                <p>Define ROI targets, constraints, and success metrics.</p>
              </div>
            </li>
            <li>
              <span className="step-index">02</span>
              <div>
                <h4>Design</h4>
                <p>Experience, systems, and data design for clarity and speed.</p>
              </div>
            </li>
            <li>
              <span className="step-index">03</span>
              <div>
                <h4>Delivery</h4>
                <p>Ship iteratively with tight quality and observability.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="cta" id="contact">
          <h2>Start a conversation</h2>
          <p>Tell us your goals. We’ll propose a clear, high-ROI path.</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="grid">
              <input name="name" type="text" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Work email" required />
            </div>
            <input name="company" type="text" placeholder="Company (optional)" />
            <textarea name="message" rows="5" placeholder="What are you looking to build or automate?" required />
            <button type="submit" className="btn btn-primary" disabled={formState.status === 'submitting'}>
              {formState.status === 'submitting' ? 'Sending…' : 'Send inquiry'}
            </button>
            {formState.status === 'success' && (
              <div className="form-note success">{formState.message}</div>
            )}
            {formState.status === 'error' && (
              <div className="form-note error">{formState.message}</div>
            )}
          </form>
          <div className="small-note">
            Prefer LinkedIn? <a
              href="https://www.linkedin.com/company/trochlear/about/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >Connect here</a>.
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© {new Date().getFullYear()} Trochlear</div>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-lang">
          <label htmlFor="lang" className="sr-only">Language</label>
          <select id="lang" value={lang} onChange={handleLangChange} className="lang-select">
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="hi">हिंदी</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

export default App;
