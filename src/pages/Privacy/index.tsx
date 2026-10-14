import { Container } from 'react-bootstrap'
import { privacy } from '../../services/content'
import { PageIntro } from '../../components/common/PageIntro'
import { Seo } from '../../components/common/Seo'
import { Blocks } from '../../components/common/Blocks'
export default function Privacy() { return <><Seo {...privacy.seo} noindex={!privacy.approved} /><PageIntro title={privacy.title} /><Container className="section prose">{privacy.approved ? <Blocks blocks={privacy.blocks} /> : <p className="notice">{privacy.notice}</p>}</Container></> }
