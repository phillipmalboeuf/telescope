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
	req.isMobile = req.ua.mobile_safari || req.ua.android
	next()
}

polka()
	.use(
		'/en',
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		ua,
		content('en-US'),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile
				}
			}
		})
	)
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		ua,
		content('fr-CA'),
		sapper.middleware({
			session: (req, res) => {
				return {
					locale: req.locale,
					navigation: req.navigation,
					isMobile: req.isMobile
				}
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
