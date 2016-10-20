// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync'
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../webpack.config.dev'

const bundler = webpack(config)

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  open: false,
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'assets/bundles',

    middleware: [
      historyApiFallback(),

      function (req, res, next) {
        if (req.headers.origin) {
          res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
          res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
          res.setHeader('Access-Control-Allow-Credentials', 'true')
        }
        next()
      },

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: false,
        quiet: false,
        stats: {
          assets: true,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        },

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'assets/js/*.html',
    '*' + '/templates/*.html',
  ]
})
