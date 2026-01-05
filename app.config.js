
const path = require("path");

module.exports = ({ config }) => {
  const iconPath = path.resolve(__dirname, "assets/images/app-icon.png");

  return {
    ...config,
    icon: iconPath,
    android: {
      ...(config.android || {}),
      adaptiveIcon: {
        ...(config.android?.adaptiveIcon || {}),
        foregroundImage: iconPath,
        backgroundColor: "#000000",
      },
    },
  };
};
