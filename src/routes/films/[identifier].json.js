
import json from 'json-complete'
import { entry } from '../../clients/contentful'


export async function get(req, res, next) {
	
	const { films } = req.navigation
	const lookup = new Map()
	films.forEach(film => {
		lookup.set(film.fields.identifier, film)
	})

	const { identifier } = req.params

	if (lookup.has(identifier)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		})

		res.end(json.encode(await entry(lookup.get(identifier).sys.id, 'fr-CA')))
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		})

		res.end(json.encode({
			message: `Not found`
		}))
	}
}
