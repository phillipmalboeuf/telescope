import json from 'json-complete'
import { entry } from '../clients/contentful'

export async function get(req, res) {
	const loose = await entry('7BSoiJDTFLPWu6eBMHukPT', req.locale)

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode({ loose }))
}