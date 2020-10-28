const port = 8080 // dev port

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/computerhistoryatlas/' : '/',
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'font-size-sm': '26px',
                    'font-size-md': '30px',
                    'font-size-lg': '34px'
                }
            }
        }
    },
    devServer: {
        port: port,
        host: '0.0.0.0',
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api-dev': {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            },
            '/': {
                target: `https://pchistory.demo.actkg.com`,
                changeOrigin: true
                    // pathRewrite: { '^/api': '' }
            }
        }
    },

    productionSourceMap: false,
    lintOnSave: false
}