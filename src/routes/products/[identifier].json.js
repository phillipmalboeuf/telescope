
import json from 'json-complete'
import { entry } from '../../clients/contentful'


export async function get(req, res, next) {
	
	const { products } = req.navigation
	const lookup = new Map()
	products.forEach(product => {
		lookup.set(product.fields.identifier, product)
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
