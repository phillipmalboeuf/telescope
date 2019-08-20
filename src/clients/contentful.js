import { createClient } from 'contentful'

const client = createClient({
  space: '2g43ft9kwm8s',
  accessToken: '7-3Uo3dqE-tm2XJOO3t_JJl9-06ZkJi3vRqqQHGNBeI'
})
export default client

const select = ['sys.id', 'fields.title', 'fields.identifier', 'fields.tags', 'fields.poster', 'fields.publishedDate'].join(',')
const order = ['fields.publishedDate', 'sys.createdAt'].join(',')
export const navigation = locale => Promise.all([
  client.getEntries({ content_type: 'article', locale, select, order }),
  client.getEntries({ content_type: 'film', locale, select: select + ',fields.teaser', order }),
  client.getEntries({ content_type: 'product', locale, select, order }),
  client.getEntries({ content_type: 'tag', locale, select: ['sys.id', 'fields.title', 'fields.identifier'].join(',') })
]).then(async ([articles, films, products, tags])=> {
  return {
    articles: articles.items.map(item => ({ ...item, type: 'article' })),
    films: films.items.map(item => ({ ...item, type: 'film' })),
    products: products.items.map(item => ({ ...item, type: 'product' })),
    tags: tags.items.map(item => ({ ...item, type: 'tag' }))
  }
})

export const entry = (id, locale) => client.getEntry(id, { locale })