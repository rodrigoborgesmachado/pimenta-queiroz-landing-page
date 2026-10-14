import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { site } from '../services/content'
import { Seo } from '../components/common/Seo'
import { PageIntro } from '../components/common/PageIntro'
export default function NotFound() {
  return (
    <>
      <Seo
        title={`404 | ${site.brand}`}
        description={site.labels.notFoundText}
        noindex
      />
      <PageIntro
        title={site.labels.notFoundTitle}
        description={site.labels.notFoundText}
        eyebrow="404"
      />
      <Container className="section">
        <Link className="button button-primary" to="/">
          {site.labels.backHome}
        </Link>
      </Container>
    </>
  )
}
