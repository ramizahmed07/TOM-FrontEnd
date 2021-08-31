const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@types": path.resolve(__dirname, "src/types/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@router": path.resolve(__dirname, "src/router/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
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
