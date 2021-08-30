const path = require("path");
const CracoLessPlugin = require("craco-less");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");
const options = {
  antDir: path.join(__dirname, "./node_modules/antd"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(__dirname, "./src/styles/theme.less"),
  colorFilePath: path.join(__dirname, "./public/color.less"),
  themeVariables: [
    "@font-family",
    "@secondary-font",
    "@primary-color",
    "@primary-color-light",
    "@primary-white",
    "@primary-black",
    "@secondary-text",
    "@white",
    "@light-gray",
    "@green-light",
    "@blue-light",
    "@error-color",
    "@error-color-light",
    "@text-xxl",
    "@text-xl",
    "@text-lg",
    "@text-mlg",
    "@text-ml",
    "@text-md",
    "@text-mds",
    "@text-sm",
    "@text-xs",
    "@border",
    "@border-primary",
    "@border-light-gray",
    "@transition-2ms",
    "@transition-3ms",
  ],
  indexFileName: false,
  generateOnce: false,
};
const ThemePlugin = new AntDesignThemePlugin(options);

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
    {
      plugin: ThemePlugin,
    },
  ],
};
