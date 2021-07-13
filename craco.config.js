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
              // fonts
              "@font-family": "Montserrat, sans-serif",
              "@secondary-font": "HK Grotesk, sans-serif",

              // colors
              "@primary-color": "#2f49d1",
              "@primary-color-light": "#8FA6E3",
              "@secondary-text": "#435465",

              // font sizes
              "@text-xxl": "40px",
              "@text-xl": "28px",
              "@text-lg": "24px",
              "@text-md": "16px",
              "@text-sm": "14px",
              "@text-xs": "12px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
