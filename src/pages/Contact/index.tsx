import { useState } from 'react'
import type { FormEvent } from 'react'
import { Container, Form } from 'react-bootstrap'
import { site } from '../../services/content'
import { Seo } from '../../components/common/Seo'
import { PageIntro } from '../../components/common/PageIntro'
import { ContactDetails } from '../../components/sections/ContactDetails'
import { whatsappLink } from '../../utils/links'
import { Icon } from '../../components/common/Icon'
export default function Contact() {
 const [name, setName] = useState(''); const [phone, setPhone] = useState(''); const [message, setMessage] = useState(''); const [error, setError] = useState(false); const enabled = !!whatsappLink(site.contact.whatsapp)
 function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const digits = phone.replace(/\D/g, ''); if (name.trim().length < 2 || !/^(55)?[1-9]\d{9,10}$/.test(digits) || message.trim().length < 10) { setError(true); return } const url = whatsappLink(site.contact.whatsapp, `Nome: ${name.trim()}\nWhatsApp: ${phone.trim()}\n\n${message.trim()}`); if (url) { setError(false); window.open(url, '_blank', 'noopener,noreferrer') } }
 return <><Seo title={`${site.labels.contact} | ${site.brand}`} description={site.labels.contactIntro} /><PageIntro title={site.labels.contact} description={site.labels.contactIntro} /><section className="section"><Container><div className="contact-page-layout"><div><h2>{site.labels.office}</h2><ContactDetails /></div><Form className="contact-form" onSubmit={submit}><h2>{site.labels.formTitle}</h2>{!enabled && <p className="notice">{site.labels.formUnavailable}</p>}<fieldset disabled={!enabled}><Form.Group className="mb-4" controlId="contact-name"><Form.Label>{site.labels.name}</Form.Label><Form.Control required minLength={2} maxLength={120} autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></Form.Group><Form.Group className="mb-4" controlId="contact-phone"><Form.Label>{site.labels.phone}</Form.Label><Form.Control type="tel" required maxLength={20} autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} /></Form.Group><Form.Group className="mb-4" controlId="contact-message"><Form.Label>{site.labels.message}</Form.Label><Form.Control as="textarea" rows={5} required minLength={10} maxLength={3000} value={message} onChange={e => setMessage(e.target.value)} /></Form.Group><p id="form-notice" className="form-notice">{site.labels.formNotice}</p>{error && <p role="alert" className="form-error">{site.labels.formError}</p>}<button type="submit" className="button button-primary" aria-describedby="form-notice">{site.labels.formSubmit}<Icon name="arrow" size={18} /></button></fieldset></Form></div></Container></section></>
}
