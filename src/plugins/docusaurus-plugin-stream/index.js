module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-stream",

    configureWebpack() {
      return {
        resolve: {
          fallback: {
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            stream: require.resolve("stream-browserify"),
          },
        },
      };
    },
  };
};
