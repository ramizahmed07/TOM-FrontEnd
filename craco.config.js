const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              hack: `true; @import "./src/styles/theme.less";`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
