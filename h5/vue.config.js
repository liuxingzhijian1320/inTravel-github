let styleVariables = require("./src/assets/scripts/theme");

module.exports = {
  lintOnSave: false,
  assetsDir: "static",
  devServer: {
    port: "1144",
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    proxy: {
      "/mapi": {
        target: "http://localhost:1155",
        changeOrigin: true,
        pathRewrite: {
          "^/mapi": ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          .map(k => `\$${k}: ${styleVariables[k]};`)
          .join("\n")
      }
    }
  }
};
