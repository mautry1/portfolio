const { override, addWebpackPlugin } = require("customize-cra");
const { WatchIgnorePlugin } = require("webpack");

module.exports = override(
  addWebpackPlugin(
    new WatchIgnorePlugin({
      paths: [
        /\\C:\\DumpStack\.log\.tmp/,
        /\\C:\\hiberfil\.sys/,
        /\\C:\\swapfile\.sys/,
        /\\C:\\pagefile\.sys/,
      ],
    })
  )
);