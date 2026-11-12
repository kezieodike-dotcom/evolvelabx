import { ArrowRight, ArrowUpRight, Compass, Code2, Workflow, GraduationCap, ShoppingBag, BriefcaseBusiness, HeartHandshake, BookOpen } from 'lucide-react';
import { Content, images, solutions } from '../content';
import type { EnquiryOptions } from './Enquiry';
import { SiteLink as Link } from './SiteLink';
import { ApproachExplorer } from './ApproachExplorer';
import { useReveal } from './useReveal';

const serviceIcons = { consulting: Compass, software: Code2, automation: Workflow, training: GraduationCap };
const industryIcons = [ShoppingBag, BriefcaseBusiness, HeartHandshake, BookOpen];

export function HomePage({ open, content }: { open: (options?: EnquiryOptions) => void; content: Content[] }) {
  const services = content.filter(item => item.kind === 'service' && Object.hasOwn(serviceIcons, item.slug));
  const reveal = useReveal(services.map(item => item.slug).join('|'));
  return <div className="refined-home" ref={reveal}>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><span className="tiny-line" />YOUR BUSINESS. READY FOR WHAT’S NEXT.</span>
          <h1>Build a smarter<br />business with<br /><span>technology.</span></h1>
          <p>We help you build connected systems, automate everyday work and give your team the confidence to move forward.</p>
          <div className="hero-actions">
            <button className="button primary" onClick={() => open()}>Book a Consultation <ArrowUpRight size={18} /></button>
            <Link to="/services" className="text-link">Explore our services <ArrowRight size={17} /></Link>
          </div>
        </div>
        <div className="connection-scene">
          <div className="scene-heading"><span className="eyebrow">ONE CONNECTED APPROACH</span></div>
          <div className="journey-stack">
            <Link to="/services/consulting" className="journey-card strategy-card"><span className="journey-icon"><Compass size={25} strokeWidth={1.6} /></span><div><span>ADVISE</span><h3>Find the right direction.</h3><p>Clear thinking. A practical plan.</p></div><ArrowUpRight size={18} /></Link>
            <span className="journey-connector" aria-hidden="true" />
            <Link to="/services/software" className="journey-card build-card"><span className="journey-icon"><Code2 size={25} strokeWidth={1.6} /></span><div><span>BUILD & AUTOMATE</span><h3>Make better work possible.</h3><p>Connected tools. Less busywork.</p></div><ArrowUpRight size={20} /></Link>
            <span className="journey-connector" aria-hidden="true" />
            <Link to="/services/training" className="journey-card people-card"><span className="journey-icon"><GraduationCap size={25} strokeWidth={1.6} /></span><div><span>ENABLE</span><h3>Bring your people along.</h3><p>Skills and support that stay useful.</p></div><ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section container home-services" id="capabilities">
      <div className="section-top" data-reveal><div className="section-title"><span className="eyebrow">WHAT WE DO</span><h2>The right support.<br />From idea to everyday impact.</h2><p>Strategy, software, automation and training. Everything starts with what your business needs.</p></div><Link to="/services" className="text-link">All services <ArrowUpRight size={18} /></Link></div>
      <div className="home-service-grid">{services.map(service => {
        const Icon = serviceIcons[service.slug as keyof typeof serviceIcons];
        return <Link key={service.slug} to={`/services/${service.slug}`} className={`capability-card tone-${service.slug}`} data-reveal><span className="capability-icon"><Icon size={26} strokeWidth={1.6} /></span><div><h3>{service.title}</h3><p>{service.summary}</p><span className="capability-link">Explore service <ArrowRight size={16} /></span></div><span className="capability-arrow"><ArrowUpRight size={20} /></span></Link>;
      })}</div>
    </section>

    <section className="home-solutions section"><div className="container">
      <div className="section-top" data-reveal><div className="section-title"><span className="eyebrow">BUILT AROUND YOUR WORLD</span><h2>Your industry.<br />A more connected future.</h2><p>Practical solutions shaped around the way you work.</p></div><Link to="/solutions" className="text-link">All solutions <ArrowUpRight size={18} /></Link></div>
      <div className="solution-showcase">
        <Link to="/solutions/hospitality" className="hospitality-feature" data-reveal><div className="hospitality-image"><img src={images.hospitality} width={1200} height={670} loading="lazy" alt="Illustrative concept for connected hospitality systems" /><span>ILLUSTRATIVE CONCEPT</span></div><div className="hospitality-summary"><div><span className="eyebrow">HOSPITALITY</span><h3>A better journey.<br />For guests and your team.</h3><p>Explore direct booking experiences, guest records and connections to your existing systems.</p></div><span className="capability-arrow"><ArrowUpRight size={21} /></span></div></Link>
        <div className="industry-tiles">{solutions.slice(1).map((solution, index) => {
          const Icon = industryIcons[index];
          return <Link to={`/solutions/${solution.slug}`} key={solution.slug} className={`industry-tile industry-${solution.slug}`} data-reveal><span className="capability-icon"><Icon size={25} strokeWidth={1.6} /></span><h3>{solution.title}</h3><p>{solution.summary}</p><ArrowUpRight className="tile-arrow" size={19} /></Link>;
        })}</div>
      </div>
    </div></section>

    <section className="home-process section container"><div className="section-top" data-reveal><div className="section-title"><span className="eyebrow">HOW WE WORK</span><h2>A clear path.<br />From idea to impact.</h2></div><p>Select a step to see how we help your business move forward.</p></div><ApproachExplorer /></section>

    <section className="home-cta container"><div><span className="eyebrow">LET’S MOVE FORWARD</span><h2>What could work better<br />in your business?</h2><p>Let’s find the right next step together.</p></div><button className="button white-button" onClick={() => open()}>Book a Consultation <ArrowUpRight size={18} /></button></section>
  </div>;
}
