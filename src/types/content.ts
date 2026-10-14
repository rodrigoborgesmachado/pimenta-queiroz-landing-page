export interface Seo {
  title: string
  description: string
}
export type Block =
  | { type: 'paragraph' | 'heading' | 'notice'; text: string }
  | { type: 'list'; items: string[] }
export interface PracticeArea {
  id: string
  slug: string
  title: string
  pageTitle: string
  summary: string
  icon: string
  enabled: boolean
  published: boolean
  reviewed: boolean
  featured: boolean
  introduction: string
  blocks: Block[]
  faq: { question: string; answer: string }[]
  disclaimer: string
  seo: Seo
}
export interface Article {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  date: string
  image: string | null
  imageAlt?: string
  externalUrl?: string | null
  enabled: boolean
  published: boolean
  blocks: Block[]
  seo: Seo
}
export interface Professional {
  id: string
  name: string
  photo: string | null
  oab: string
  education: string[]
  areas: string[]
  biography: string
  enabled: boolean
}
