import json from 'json-complete'
import { entry, asset } from '../clients/contentful'

export async function get(req, res) {
	const [loose, animation] = await Promise.all([
		entry('7BSoiJDTFLPWu6eBMHukPT', req.locale),
		// asset('5wIkakc6q6t3qyLMHNb2ba')
	])

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})

	res.end(json.encode({ loose, animation }))
}