module.exports = {
  entry: "./src/js/controller.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(wav)$/,
        type: "asset/resource",
        generator: {
          filename: "audio/[name][ext]",
        },
      },
    ],
  },
};
