import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import useragent from 'useragent';
import { navigation } from './clients/contentful';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const content = locale => async (req, res, next) => {
	req.locale = locale
	req.navigation = await navigation(locale)
	next()
}

const ua = (req, res, next) => {
	req.ua = useragent.is(req.headers['user-agent'])
	console.log(req.ua)
	req.isMobile = req.ua.mobile_safari || req.ua.android
	next()
}

polka()
	.use(
		'/en',
		ua,
		content('en-US'),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile,
					ua: req.ua
				}
			}
		})
	)
	.use(
		ua,
		content('fr-CA'),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile,
					ua: req.ua
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
