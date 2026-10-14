import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { site } from '../../services/content'
import { safeUrl } from '../../utils/links'
import type { Seo as SeoType } from '../../types/content'
export function Seo({ title, description, noindex = false }: SeoType & { noindex?: boolean }) {
 const { pathname } = useLocation(); const domain = safeUrl(site.domain); const canonical = domain ? new URL(pathname, domain).href : null
 return <Helmet><title>{title}</title><meta name="description" content={description} /><meta name="robots" content={noindex || !site.publicationApproved ? 'noindex, nofollow' : 'index, follow'} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:locale" content="pt_BR" /><meta property="og:site_name" content={site.name} />{canonical && <link rel="canonical" href={canonical} />}{canonical && <meta property="og:url" content={canonical} />}</Helmet>
}
