import { build } from 'vite'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { resolve, join, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
const root = resolve(import.meta.dirname, '..')
const serverDirectory = resolve(root, 'node_modules', '.pq-prerender')
if (!serverDirectory.startsWith(root + sep)) throw new Error('Diretório temporário fora do projeto.')
try {
 await build({ root, build: { ssr: 'src/entry-server.tsx', outDir: serverDirectory, emptyOutDir: true }, ssr: { noExternal: true, external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'] } })
 const { render, publicRoutes } = await import(pathToFileURL(join(serverDirectory, 'entry-server.js')).href)
 const template = await readFile(join(root, 'dist', 'index.html'), 'utf8')
 for (const route of [...publicRoutes, '/404']) {
  const rendered = render(route)
  const headElements = /<(?:title|meta|link)\b[^>]*(?:\/>|>[^<]*<\/title>|>)/g
  const metadata = rendered.match(headElements)?.join('') ?? ''
  const content = rendered.replace(headElements, '')
  const html = template.replace('</head>', `${metadata}</head>`).replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  const directory = join(root, 'dist', route.slice(1))
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), html)
  if (route === '/404') await writeFile(join(root, 'dist', '404.html'), html)
 }
 const site = JSON.parse(await readFile(join(root, 'src/data/site.json'), 'utf8'))
 if (site.domain && site.publicationApproved) {
  const domain = new URL(site.domain)
  if (domain.protocol !== 'https:') throw new Error('O domínio oficial precisa utilizar HTTPS.')
  const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
  const privacy = JSON.parse(await readFile(join(root, 'src/data/privacy.json'), 'utf8'))
  await writeFile(join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicRoutes.filter(route => route !== '/politica-de-privacidade' || privacy.approved).map(route => `<url><loc>${escapeXml(new URL(route, domain).href)}</loc></url>`).join('')}</urlset>`)
  await writeFile(join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', domain).href}\n`)
 } else await writeFile(join(root, 'dist/robots.txt'), 'User-agent: *\nDisallow: /\n')
 console.log(`HTML estático gerado para ${publicRoutes.length} rotas institucionais e página 404.`)
} finally { await rm(serverDirectory, { recursive: true, force: true }) }
