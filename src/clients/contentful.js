import { createClient } from 'contentful'

const client = createClient({
  space: '2g43ft9kwm8s',
  accessToken: '7-3Uo3dqE-tm2XJOO3t_JJl9-06ZkJi3vRqqQHGNBeI'
})
export default client

const select = ['sys.id', 'fields.title', 'fields.identifier', 'fields.publishedDate'].join(',')
const order = ['fields.publishedDate', 'sys.createdAt'].join(',')
export const navigation = locale => Promise.all([
  client.getEntries({ content_type: 'article', locale, select, order }),
  client.getEntries({ content_type: 'film', locale, select, order }),
  client.getEntries({ content_type: 'product', locale, select, order })
]).then(async ([articles, films, products])=> {
  return {
    articles,
    films,
    products
  }
})

export const entry = (id, locale) => client.getEntry(id, { locale })