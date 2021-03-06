require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

var proxy = require('http-proxy-middleware')

const deployContext = process.env.DEPLOY_CONTEXT

module.exports = {
  siteMetadata: {
    title: `Chapters | The Debt Collective`,
    description: `We are inviting people from around the country to form local Debt Collective chapters.`,
    author: 'Debt Collective',
    twitterUsername: `StrikeDebt`,
    image: `${process.env.SITE_URL || 'localhost'}/img/seo.png`,
    url: process.env.SITE_URL || 'localhost',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-plugin-favicon`,
            options: {
              logo: './src/img/favicon.png',
              appName: 'Chapters form',
              appDescription: null,
              developerName: 'debtcollective',
              developerURL: null,
              dir: 'auto',
              lang: 'en-US',
              background: '#FF4630',
              theme_color: '#FF4630',
              display: 'standalone',
              orientation: 'any',
              start_url: '/?homescreen=1',
              version: '1.0',

              icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                yandex: false,
                windows: true,
              },
            },
          },
        ],
      },
    },
    // expose Netlify CONTEXT env var to client
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ['CONTEXT'],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        head: true,
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: deployContext,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
}
