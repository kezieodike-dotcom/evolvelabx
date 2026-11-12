import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { services } from '../content';
export type EnquiryOptions = { interest?: string; intent?: string };
export function track(name: string) {
  try { if (localStorage.getItem('evx-analytics') !== 'accepted') return; } catch { return; }
  void fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,path:location.pathname,campaign:new URLSearchParams(location.search).get('utm_campaign') || '',consent:true})}).catch(()=>{});
}
export function Enquiry({ options = {}, onClose }: { options?: EnquiryOptions; onClose?:()=>void }) {
  const titleId = useId();
  const form = useRef<HTMLFormElement>(null);
  const requestId = useRef(crypto.randomUUID());
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [fields,setFields] = useState<Record<string,string>>({});
  const [receipt,setReceipt] = useState<{id:string;bookingStatus:string}|null>(null);
  const [booking,setBooking] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(()=> {
    if (!onClose) return;
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    const original = document.body.style.overflow;
    document.body.style.overflow='hidden';
    return ()=> { document.body.style.overflow=original; previous?.focus(); };
  },[onClose]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); setFields({});
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...data, consent:data.consent==='on', requestId:requestId.current, source:location.pathname, campaign:new URLSearchParams(location.search).get('utm_campaign') || '', intent:options.intent || 'consultation' };
    try {
      const response = await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
      const result = await response.json().catch(()=>({error:'The service is temporarily unavailable. Your request has not been confirmed. Please try again.'}));
      if (!response.ok) { setFields(result.fields || {}); throw new Error(result.error || 'Unable to submit. Please try again.'); }
      if (typeof result.id !== 'string' || !result.id.startsWith('EVX-')) throw new Error('Your request could not be verified. Please try again.');
      setReceipt(result); track('lead_submitted');
    } catch (e) { setError(e instanceof Error && e.name==='Error' ? e.message : 'Connection failed or timed out. Your request has not been confirmed. Please try again.'); }
    finally { setBusy(false); }
  }
  const input = (name:string,label:string,type='text',required=true) => <label className="field">{label}{!required && <span className="optional">Optional</span>}<input name={name} type={type} required={required} maxLength={200} autoComplete={name==='name'?'name':name==='email'?'email':name==='company'?'organization':'off'} aria-invalid={!!fields[name]} aria-describedby={fields[name]?`error-${name}`:undefined}/>{fields[name] && <span className="field-error" id={`error-${name}`}>{fields[name]}</span>}</label>;
  const contents = <>
    <div className="enquiry-heading"><div><span className="eyebrow">LET’S MOVE FORWARD</span><h2 id={titleId}>{options.intent==='proposal'?'Tell us about your project.':options.interest==='training'?'Build your team’s confidence.':'A conversation is a good start.'}</h2></div>{onClose && <button type="button" className="icon-button" onClick={onClose} aria-label="Close consultation"><X/></button>}</div>
    {receipt ? <div className="receipt" role="status"><CheckCircle2 size={42}/><h3>Your request is recorded.</h3><p>Reference <strong>{receipt.id}</strong></p><p>{receipt.bookingStatus==='requested'?'Your preferred meeting time has been requested. An appointment is only confirmed after the team agrees availability with you.':'The team can review your brief and follow up using the email you provided.'}</p><p>Please keep your reference for follow-up.</p>{onClose && <button className="button primary" onClick={onClose}>Done <ArrowRight size={16}/></button>}</div> : <form ref={form} onSubmit={submit} className="enquiry-form">
      <p>Share the challenge behind your next technology project. We’ll use these details to understand your needs and follow up.</p>
      <div className="form-grid">{input('name','Full name')}{input('email','Business email','email')}{input('company','Company name')}{input('country','Country')}
      <label className="field">Service of interest<select name="interest" defaultValue={options.interest || ''} required aria-invalid={!!fields.interest}><option value="" disabled>Select a service</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.title}</option>)}<option value="hospitality">Hospitality technology</option><option value="partnership">Partnership enquiry</option><option value="other">Help me find the right fit</option></select></label>
      <label className="field">Budget range <span className="optional">Optional</span><select name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>Under $5,000</option><option>$5,000–$15,000</option><option>$15,000–$50,000</option><option>$50,000+</option></select></label></div>
      <label className="field">What would you like to improve?<textarea name="message" rows={4} minLength={20} maxLength={5000} required placeholder="Tell us about your goals, current challenges and any timelines." aria-invalid={!!fields.message}/>{fields.message && <span className="field-error">{fields.message}</span>}</label>
      <label className="check"><input type="checkbox" checked={booking} onChange={e=>setBooking(e.target.checked)}/>Suggest a time for a consultation</label>
      {booking && <div className="booking-fields"><p>This is a meeting request, subject to availability.</p><div className="form-grid"><label className="field">Preferred date<input name="date" type="date" min={new Date().toISOString().slice(0,10)} required/>{fields.date && <span className="field-error">{fields.date}</span>}</label><label className="field">Preferred time<input type="time" name="time" required/></label><label className="field full">Your time zone<select name="timezone" defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone}>{Array.from(new Set([Intl.DateTimeFormat().resolvedOptions().timeZone,'Africa/Lagos','Africa/Accra','Europe/London','America/New_York','America/Los_Angeles','Asia/Dubai','Asia/Kolkata','Australia/Sydney'])).map(z=><option key={z}>{z}</option>)}</select></label></div></div>}
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="check"><input type="checkbox" name="consent" required/> <span>I agree that EVOLVELABX may use this information to respond to my enquiry, as described in the <a href="/privacy" target="_blank" rel="noreferrer">privacy notice</a>.</span></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary" type="submit" disabled={busy}>{busy?'Sending your request…':'Send your request'}<ArrowRight size={17}/></button><small>Please avoid sharing passwords, financial records or other sensitive information.</small>
    </form>}
  </>;
  return onClose ? <dialog ref={dialog} className="enquiry-dialog" aria-labelledby={titleId} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===dialog.current)onClose();}}>{contents}</dialog> : <div className="contact-form">{contents}</div>;
}
