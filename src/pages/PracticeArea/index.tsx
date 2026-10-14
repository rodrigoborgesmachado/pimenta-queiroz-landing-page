import { Container, Accordion } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { visibleAreas } from '../../services/content'
import { PageIntro } from '../../components/common/PageIntro'
import { Seo } from '../../components/common/Seo'
import { Blocks } from '../../components/common/Blocks'
import { ContactDetails } from '../../components/sections/ContactDetails'
import NotFound from '../NotFound'
export default function PracticeArea() { const { slug } = useParams(); const area = visibleAreas.find(a => a.slug === slug && a.published && a.reviewed); if (!area) return <NotFound />; return <><Seo {...area.seo} /><PageIntro title={area.pageTitle} description={area.introduction} /><Container className="section prose"><Blocks blocks={area.blocks} />{area.faq.length > 0 && <Accordion>{area.faq.map((item, i) => <Accordion.Item eventKey={String(i)} key={item.question}><Accordion.Header>{item.question}</Accordion.Header><Accordion.Body>{item.answer}</Accordion.Body></Accordion.Item>)}</Accordion>}<aside className="notice">{area.disclaimer}</aside><ContactDetails /></Container></> }
