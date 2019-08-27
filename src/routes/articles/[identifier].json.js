
import json from 'json-complete'
import { entry } from '../../clients/contentful'


export async function get(req, res, next) {
	
	const { articles } = req.navigation
	const lookup = new Map()
	articles.forEach(article => {
		lookup.set(article.fields.identifier, article)
	})

	const { identifier } = req.params

	if (lookup.has(identifier)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})

		res.end(json.encode(await entry(lookup.get(identifier).sys.id, req.locale)))
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		})

		res.end(json.encode({
			message: `Not found`
		}))
	}
}
