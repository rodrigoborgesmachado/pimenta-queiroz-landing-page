import site from '../data/site.json'
import navigation from '../data/navigation.json'
import home from '../data/home.json'
import office from '../data/office.json'
import teamData from '../data/team.json'
import areasData from '../data/practice-areas.json'
import articlesData from '../data/articles.json'
import privacyData from '../data/privacy.json'
import type {
  Article,
  PracticeArea,
  Professional,
  Block,
} from '../types/content'
export { site, navigation, home, office }
export const areas: PracticeArea[] = areasData
export const articles = {
  ...articlesData,
  items: articlesData.items as Article[],
}
export const team = { ...teamData, members: teamData.members as Professional[] }
export const privacy = { ...privacyData, blocks: privacyData.blocks as Block[] }
export const visibleAreas = areas.filter((area) => area.enabled)
export const publishedArticles = articles.items.filter(
  (article) => article.enabled && article.published,
)
export const publicRoutes = [
  '/',
  '/o-escritorio',
  '/contato',
  '/conteudo',
  '/politica-de-privacidade',
  ...visibleAreas
    .filter((a) => a.published && a.reviewed)
    .map((a) => `/para-servidores/${a.slug}`),
  ...publishedArticles
    .filter((a) => !a.externalUrl)
    .map((a) => `/conteudo/${a.slug}`),
]
