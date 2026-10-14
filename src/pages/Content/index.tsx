import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { articles, publishedArticles } from '../../services/content'
import { PageIntro } from '../../components/common/PageIntro'
import { Seo } from '../../components/common/Seo'
import { ArticleCard } from '../../components/common/Cards'
import { Blocks } from '../../components/common/Blocks'
import { Icon } from '../../components/common/Icon'
import NotFound from '../NotFound'
export default function Content() {
  return (
    <>
      <Seo {...articles.seo} />
      <PageIntro title={articles.title} description={articles.description} />
      <section className="section">
        <Container>
          {publishedArticles.length ? (
            <div className="content-grid">
              {publishedArticles
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="education" size={42} />
              <h2>{articles.emptyTitle}</h2>
              <p>{articles.emptyText}</p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
export function ArticlePage() {
  const { slug } = useParams()
  const article = publishedArticles.find(
    (a) => a.slug === slug && !a.externalUrl,
  )
  return article ? (
    <>
      <Seo {...article.seo} />
      <PageIntro
        title={article.title}
        description={article.summary}
        eyebrow={article.category}
      />
      <Container className="section prose">
        <Blocks blocks={article.blocks} />
      </Container>
    </>
  ) : (
    <NotFound />
  )
}
