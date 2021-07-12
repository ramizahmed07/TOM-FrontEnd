const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // fonts
              "@font-family": "Montserrat, sans-serif",
              "@secondary-font": "HK Grotesk, sans-serif",

              // colors
              "@primary-color": "#2f49d1",
              "@secondary-text": "#435465",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
