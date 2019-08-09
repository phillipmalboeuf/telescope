
export function get(req, res) {
	const { articles } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(articles));
}