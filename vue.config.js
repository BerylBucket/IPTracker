module.exports = {
  publicPath: "/IPTracker/",
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      title: "Home",
    },
  },
};
