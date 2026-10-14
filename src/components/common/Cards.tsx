import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import { home, site } from '../../services/content'
import { safeUrl } from '../../utils/links'
import type { Article, PracticeArea, Professional } from '../../types/content'
export function AreaCard({ area, index }: { area: PracticeArea; index: number }) {
 const content = <><div className="card-top"><Icon name={area.icon} size={29} /><span className="card-number">0{index + 1}</span></div>{area.featured && <span className="feature-label">{home.areas.featured}</span>}<h3>{area.title}</h3><p>{area.summary}</p><div className="card-bottom"><span>{area.published && area.reviewed ? site.labels.readMore : home.areas.draft}</span>{area.published && area.reviewed && <Icon name="arrow" size={20} />}</div></>
 return area.published && area.reviewed ? <Link className={`area-card ${area.featured ? 'featured' : ''}`} to={`/para-servidores/${area.slug}`}>{content}</Link> : <article className={`area-card ${area.featured ? 'featured' : ''}`}>{content}</article>
}
export function ArticleCard({ article }: { article: Article }) { const external = safeUrl(article.externalUrl); const content = <>{article.image && <img src={article.image} alt={article.imageAlt ?? article.title} loading="lazy" />}<span className="eyebrow">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><time dateTime={article.date}>{new Date(`${article.date}T12:00:00Z`).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</time><span className="text-link">{site.labels.readMore} <Icon name="arrow" size={18} /></span></>; return <article className="article-card">{external ? <a href={external} target="_blank" rel="noopener noreferrer">{content}</a> : <Link to={`/conteudo/${article.slug}`}>{content}</Link>}</article> }
export function TeamCard({ member }: { member: Professional }) { return <article className="team-card">{member.photo && <img src={member.photo} alt={member.name} loading="lazy" />}<h3>{member.name}</h3>{member.oab && <p>{member.oab}</p>}<p>{member.biography}</p><ul>{member.education.map(item => <li key={item}>{item}</li>)}</ul><p>{member.areas.join(' · ')}</p></article> }
