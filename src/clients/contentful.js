import { createClient } from 'contentful'

const client = createClient({
  space: '2g43ft9kwm8s',
  accessToken: '7-3Uo3dqE-tm2XJOO3t_JJl9-06ZkJi3vRqqQHGNBeI'
})
export default client

const select = ['sys.id', 'fields.title', 'fields.identifier', 'fields.tags', 'fields.poster', 'fields.publishedDate'].join(',')
const order = ['-fields.publishedDate', '-sys.createdAt'].join(',')
export const navigation = locale => Promise.all([
  client.getEntries({ content_type: 'article', locale, select, order }),
  client.getEntries({ content_type: 'film', locale, select: select + ',fields.teaser,fields.ralisateur', order }),
  client.getEntries({ content_type: 'product', locale, select, order }),
  client.getEntries({ content_type: 'aboutPiece', locale, select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.tags'].join(','), order }),
  client.getEntries({ content_type: 'contactPoint', locale, select: ['sys.id', 'fields.title', 'fields.link', 'fields.linkLabel'].join(','), order }),
  client.getEntries({ content_type: 'tag', locale, select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.isACollaborator'].join(',') })
]).then(async ([articles, films, products, about, contact, tags])=> {
  return {
    articles: articles.items.map(item => ({ ...item, type: 'article' })),
    films: films.items.map(item => ({ ...item, type: 'film' })),
    products: products.items.map(item => ({ ...item, type: 'product' })),
    about: about.items.map(item => ({ ...item, type: 'about' })),
    contact: contact.items.map(item => ({ ...item, type: 'contact' })),
    tags: tags.items.map(item => ({ ...item, type: 'tag' }))
  }
})

export const entry = (id, locale) => client.getEntry(id, { locale, include: 2 })
export const asset = (id, locale) => client.getAsset(id, { locale })