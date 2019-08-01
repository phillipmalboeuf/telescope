// import posts from './_posts.js.js';

// const contents = JSON.stringify(posts.map(post => {
// 	return {
// 		title: post.title,
// 		slug: post.slug
// 	};
// }));

export function get(req, res) {
	const { films } = req.navigation

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(films));
}