import { useId, useState } from 'react';
import { ArrowRight, Code2, Compass, GraduationCap, Layers, TrendingUp } from 'lucide-react';

const stages = [
  { name: 'Discover', icon: Compass, title: 'Understand the real challenge.', description: 'We map your current workflow, listen to your team and agree what success should look like.', deliverable: 'A focused problem statement and clear priorities.' },
  { name: 'Design', icon: Layers, title: 'Make the next step clear.', description: 'We turn the agreed priorities into a practical solution you can review before implementation.', deliverable: 'A practical blueprint and prototypes to review.' },
  { name: 'Build', icon: Code2, title: 'Bring the plan to life.', description: 'We deliver connected systems in stages, with regular opportunities for your team to give feedback.', deliverable: 'Tested releases, integrations and clear documentation.' },
  { name: 'Train', icon: GraduationCap, title: 'Give your team confidence.', description: 'We use real tasks to help the people who run your business become comfortable with their new tools.', deliverable: 'Role-based training and easy-to-follow operating guides.' },
  { name: 'Improve', icon: TrendingUp, title: 'Keep moving forward.', description: 'We agree how to support the solution and identify improvements based on how your team actually uses it.', deliverable: 'A support plan and improvements guided by actual use.' },
];

export function ApproachExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const stage = stages[active];
  const Icon = stage.icon;
  function move(event: React.KeyboardEvent<HTMLButtonElement>) {
    let next: number;
    if (event.key === 'ArrowRight') next = (active + 1) % stages.length;
    else if (event.key === 'ArrowLeft') next = (active - 1 + stages.length) % stages.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = stages.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }
  return <div className="approach-explorer">
    <div className="approach-tabs" role="tablist" aria-label="Explore our five-step approach">{stages.map((item, index) => <button key={item.name} role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={move}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}<ArrowRight size={15} /></button>)}</div>
    <div className="approach-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / stages.length})` }} /></div>
    <div className="approach-detail" key={active} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
      <div className={`approach-stage-icon stage-${active}`}><Icon size={40} strokeWidth={1.4} /></div>
      <div><span className="eyebrow">STEP {String(active + 1).padStart(2, '0')} / 05</span><h3>{stage.title}</h3><p>{stage.description}</p></div>
      <div className="approach-deliverable"><span>WHAT YOU TAKE FORWARD</span><p>{stage.deliverable}</p></div>
    </div>
  </div>;
}
