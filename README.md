# Pimenta Queiroz Advogados Associados

Site institucional em React 19, TypeScript, Vite, React Router, React Bootstrap/Bootstrap 5, Lucide e React Helmet Async 3 (compatível com React 19). Identidade provisória com verde-petróleo, dourado, areia e tipografia serifada. Não há backend, CMS, armazenamento de dados pessoais ou deploy configurado.

## Executar

```sh
npm install
npm run dev
```

```sh
npm run build
```

O comando de build executa a verificação TypeScript, gera os assets e prerenderiza as rotas públicas. O resultado está em `dist/`. `npm run preview` permite abrir o build localmente. Não foram criados testes, scripts de testes ou infraestrutura de testes.

## Estrutura

- `src/data/`: conteúdo institucional e configurações locais em JSON.
- `src/types/`: contratos para áreas, artigos, profissionais e blocos de conteúdo.
- `src/services/content.ts`: leitura tipada, filtros de publicação e lista de rotas.
- `src/components/common/`: SEO, blocos, ícones, identidade gráfica e cards reutilizáveis.
- `src/components/layout/`: navegação, rodapé e WhatsApp flutuante.
- `src/components/sections/`: informações de contato.
- `src/pages/`: Home, escritório, áreas dinâmicas, contato, conteúdo, privacidade e 404.
- `src/hooks/`: navegação e posicionamento da página.
- `src/utils/`: validação de URLs externas e geração de links de WhatsApp.
- `src/styles/site.css`: identidade visual, variáveis, responsividade e movimento reduzido.
- `src/assets/images/`: espaço para imagens reais importadas pelos componentes.
- `src/entry-server.tsx` e `scripts/prerender.mjs`: geração de HTML estático, sem servidor em produção.

## Editar conteúdo

Todos os JSONs são importados no build. Depois de editar, gere um novo build.

| Arquivo               | Uso                                                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.json`           | Nome, localização, contatos, redes, domínio, SEO global, identidade provisória e rótulos de interface. `null` indica informação pendente; não preencher com dados fictícios. |
| `navigation.json`     | Ordem, rótulos, destinos e `enabled` dos links.                                                                                                                              |
| `home.json`           | Textos, seções, públicos, passos e controles `enabled` da Home.                                                                                                              |
| `office.json`         | Apresentação, foto, história, missão, visão, valores e aprovação editorial.                                                                                                  |
| `team.json`           | Lista de profissionais reais e visibilidade da equipe.                                                                                                                       |
| `practice-areas.json` | Cards, conteúdo estruturado, revisão, publicação e SEO das áreas.                                                                                                            |
| `articles.json`       | Listagem, estado vazio e publicações.                                                                                                                                        |
| `privacy.json`        | Política estruturada e estado de aprovação.                                                                                                                                  |

### Adicionar um advogado

Adicione em `team.json > members` um objeto com `id`, `name`, `photo` (ou `null`), `oab`, `education` (lista), `areas` (lista), `biography` e `enabled`. Use apenas dados confirmados e imagens autorizadas. A seção só aparece se a equipe estiver habilitada e tiver membros habilitados.

### Adicionar uma área

Copie a estrutura de um item em `practice-areas.json`. Defina `id` e `slug` únicos, título, `pageTitle`, resumo, ícone, introdução, blocos, FAQ, ressalva e SEO. `enabled` controla o card. A rota `/para-servidores/:slug` só existe publicamente com **`published: true` e `reviewed: true`**. Os seis cards iniciais estão habilitados; as páginas jurídicas estão bloqueadas. O dropdown leva aos cards enquanto não há páginas aprovadas.

O item de férias/recesso possui `plannedSections` para orientar a revisão; títulos planejados e rascunhos não são apresentados como conteúdo jurídico aprovado.

### Publicar artigo

Adicione em `articles.json > items` um objeto com `id`, `slug`, `title`, `summary`, `category`, `date` (`AAAA-MM-DD`), `image` (ou `null`), `imageAlt`, `externalUrl` (opcional, HTTPS), `enabled`, `published`, `blocks` e `seo` (`title`/`description`). Após revisão editorial, habilite e publique. Sem URL externa, será gerada a página `/conteudo/:slug`. Com URL externa HTTPS, o card abre a publicação em outra aba. A Home exibe os três mais recentes; sem artigos, oculta a seção.

### Blocos de conteúdo

Não use HTML bruto. Os contratos em `src/types/content.ts` suportam:

```json
[
  { "type": "heading", "text": "Subtítulo" },
  { "type": "paragraph", "text": "Texto aprovado." },
  { "type": "list", "items": ["Primeiro item", "Segundo item"] },
  { "type": "notice", "text": "Ressalva ou observação." }
]
```

FAQs usam `question` e `answer`. O template renderiza o conteúdo sem `dangerouslySetInnerHTML`.

### Contatos

Edite somente `site.json > contact`. WhatsApp exige número brasileiro completo com código do país 55, DDD e número (12 ou 13 dígitos). Um número válido habilita os botões, componente flutuante e formulário. O formulário valida nome, telefone e mensagem e abre o WhatsApp; o visitante precisa enviar a mensagem no aplicativo. Não há envio simulado, banco de dados, cookies ou armazenamento local implementados pelo formulário.

Preencha `address`, `phone`, `email`, `hours` e `mapEmbedUrl` somente após confirmação. Mapa é opcional e deve ter URL de incorporação HTTPS do endereço real. Cadastre `social.instagram` como URL HTTPS oficial. Ausência de contatos mostra uma mensagem neutra.

### Imagens e fontes

A identidade gráfica atual é construída em CSS e não representa uma fotografia do escritório. Para fotos referenciadas por JSON, coloque arquivos otimizados em `public/images/` e utilize `/images/nome.webp`; registre texto alternativo adequado. Use WebP/AVIF, dimensões adequadas e autorização dos retratados. A fotografia do Hero é configurada em `home.json > hero.image` e `imageAlt`; a fotografia do escritório, em `office.json > image` e `imageAlt`. `src/assets/images/` pode ser utilizado com imports quando necessário.

As fontes Playfair Display e DM Sans têm fallback Georgia/Arial. São fornecidas localmente em `public/fonts/`, sem solicitação de fontes a terceiros no acesso ao site.

### Aprovação e visibilidade

Missão, visão e valores são rascunhos sujeitos a aprovação: seus controles `approved`/`valuesApproved` estão desativados. História vazia e equipe vazia são omitidas. A política exibe aviso de elaboração enquanto `approved` for falso. `site.publicationApproved` inicia falso e mantém o site inteiro como `noindex, nofollow` até revisão institucional.

## SEO e hospedagem estática

React Helmet Async 3 usa os recursos nativos de metadados do React 19. O prerender produz HTML completo, um H1 por página, título, descrição e Open Graph por rota; o navegador hidrata o mesmo conteúdo. Isso permite leitura do conteúdo sem executar JavaScript e não depende exclusivamente de atualizar metadados no navegador.

O build gera `/`, `/o-escritorio/`, `/contato/`, `/conteudo/`, `/politica-de-privacidade/`, rotas dinâmicas aprovadas e `404.html`. A hospedagem deve servir os respectivos `index.html` para URLs sem extensão e configurar uma página de erro com status HTTP 404 usando `404.html`. Evite devolver o HTML da Home para todas as rotas, pois isso pode produzir conteúdo incorreto e divergência na hidratação. Nenhum provedor ou deploy foi configurado.

Sem domínio/aprovação, `robots.txt` bloqueia indexação e não há sitemap. Com `site.domain` HTTPS oficial e `publicationApproved: true`, o build gera canonical, `og:url`, robots e sitemap. A política ainda não aprovada fica fora do sitemap e mantém `noindex`. Área não revisada não entra no sitemap, não gera HTML e retorna a interface 404 na aplicação.

Prerender não garante posição em mecanismos de busca. Revisão de conteúdo, domínio, resposta HTTP correta e a configuração real da hospedagem continuam necessários. A saída é estática; não há SSR em tempo de requisição.

## Pendências

Consulte `CONTENT_PENDING.md`. A implementação não afirma conformidade ética/LGPD nem aprovação jurídica automática.
