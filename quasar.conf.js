// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    preFetch: true,
    plugins: [
      'axios',
      'readMore'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      'fontawesome',
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: ctx.dev ? { // so on dev we'll have
        API: JSON.stringify('http://127.0.0.1:8000'),
      } : { // and on build (production):
        API: JSON.stringify('https://homeschoolcameroun.pythonanywhere.com/'),
      },
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {}
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QBtnDropdown',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QTree',
        'QToolbar',
        'QRange',
        'QAlert',
        'QUploader',
        'QChipsInput',
        'QToolbarTitle',
        'QBtn',
        'QToggle',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QDatetime',
        'QItemSide',
        'QItemTile',
        'QTabs',
        'QRadio',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QCollapsible',
        'QLayoutFooter',
        'QDatetimePicker',
        'QScrollArea',
        'QChip',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QPopover',
        'QCardSeparator',
        'QCardActions',
        'QRating',
        'QModal',
        'QCheckbox',
        'QSelect',
        'QInput',
        'QTable',
        'QSearch',
        'QTh',
        'QTr',
        'QTd',
        'QField',
        'QTableColumns'
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'Dialog',
        'LoadingBar'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
