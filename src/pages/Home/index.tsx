import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  home,
  office,
  site,
  visibleAreas,
  publishedArticles,
} from '../../services/content'
import { Seo } from '../../components/common/Seo'
import { Icon } from '../../components/common/Icon'
import { Artwork } from '../../components/common/Artwork'
import { AreaCard, ArticleCard } from '../../components/common/Cards'
import { ContactDetails } from '../../components/sections/ContactDetails'
import { whatsappLink } from '../../utils/links'
export default function Home() {
  const whatsapp = whatsappLink(site.contact.whatsapp)
  return (
    <>
      <Seo {...site.seo} />
      {home.hero.enabled && (
        <section className="hero-section">
          <Container>
            <div className="hero-layout">
              <div className="hero-copy">
                <span className="eyebrow">{home.hero.eyebrow}</span>
                <h1>{home.hero.title}</h1>
                <p>{home.hero.description}</p>
                <div className="button-row">
                  {whatsapp && (
                    <a
                      className="button button-gold"
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.labels.whatsapp}
                      <Icon name="arrow" size={18} />
                    </a>
                  )}
                  <Link className="button button-gold" to="/o-escritorio">
                    {home.hero.button}
                    <Icon name="arrow" size={19} />
                  </Link>
                </div>
                <div className="hero-footnote">
                  <span />
                  {home.hero.footnote}
                </div>
              </div>
              <div className="hero-art">
                {home.hero.image ? (
                  <img
                    className="hero-photo"
                    src={home.hero.image}
                    alt={home.hero.imageAlt ?? site.name}
                    fetchPriority="high"
                  />
                ) : (
                  <Artwork />
                )}
                <div className="art-caption">
                  <span>{home.hero.artCaption}</span>
                  <p>{home.hero.artLabel}</p>
                </div>
              </div>
            </div>
            <a
              className="hero-scroll"
              href="#publicos"
              aria-label={home.audience.eyebrow}
            >
              <Icon name="down" size={17} />
            </a>
          </Container>
        </section>
      )}
      {home.audience.enabled && (
        <section className="audience-section" id="publicos">
          <Container>
            <div className="audience-heading">
              <span className="eyebrow">{home.audience.eyebrow}</span>
              <h2>{home.audience.title}</h2>
            </div>
            <div className="audience-grid">
              {home.audience.items
                .filter((i) => i.enabled)
                .map((item) => (
                  <div className="audience-item" key={item.title}>
                    <Icon name={item.icon} size={30} />
                    <h3>{item.title}</h3>
                  </div>
                ))}
            </div>
          </Container>
        </section>
      )}
      {home.areas.enabled && (
        <section className="section areas-section" id="areas">
          <Container>
            <div className="section-heading">
              <div>
                <span className="eyebrow">{home.areas.eyebrow}</span>
                <h2>{home.areas.title}</h2>
              </div>
              <p>{home.areas.description}</p>
            </div>
            <div className="areas-grid">
              {visibleAreas.map((area, index) => (
                <div id={`area-${area.slug}`} key={area.id}>
                  <AreaCard area={area} index={index} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
      {home.steps.enabled && (
        <section className="section steps-section">
          <Container>
            <div className="section-heading">
              <div>
                <span className="eyebrow">{home.steps.eyebrow}</span>
                <h2>{home.steps.title}</h2>
              </div>
              <p>{home.steps.description}</p>
            </div>
            <div className="steps-grid">
              {home.steps.items.map((step, i) => (
                <article key={step.title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}
      {home.office.enabled && (
        <section className="section office-section">
          <Container>
            <div className="office-layout">
              <div className="office-visual">
                {office.image ? (
                  <img
                    src={office.image}
                    alt={office.imageAlt ?? office.title}
                    loading="lazy"
                  />
                ) : (
                  <Artwork compact />
                )}
              </div>
              <div className="office-copy">
                <span className="eyebrow">{office.eyebrow}</span>
                <h2>{office.title}</h2>
                <p>{office.summary}</p>
                <Link className="text-link" to="/o-escritorio">
                  {home.office.button}
                  <Icon name="arrow" size={19} />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
      {home.articles.enabled && publishedArticles.length > 0 && (
        <section className="section">
          <Container>
            <div className="section-heading">
              <div>
                <span className="eyebrow">{home.articles.eyebrow}</span>
                <h2>{home.articles.title}</h2>
              </div>
              <Link className="text-link" to="/conteudo">
                {home.articles.button}
                <Icon name="arrow" />
              </Link>
            </div>
            <div className="content-grid">
              {publishedArticles
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 3)
                .map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
            </div>
          </Container>
        </section>
      )}
      {home.contact.enabled && (
        <section className="section contact-section">
          <Container>
            <div className="contact-layout">
              <div>
                <span className="eyebrow">{home.contact.eyebrow}</span>
                <h2>{home.contact.title}</h2>
                <Link className="text-link" to="/contato">
                  {home.contact.button}
                  <Icon name="arrow" size={19} />
                </Link>
              </div>
              <ContactDetails />
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
