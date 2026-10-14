import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { site } from '../../services/content'
export function PageIntro({ title, description, eyebrow }: { title: string; description?: string; eyebrow?: string }) { return <section className="page-intro"><Container><Link className="breadcrumb-link" to="/">{site.labels.backHome}</Link>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}</Container></section> }
