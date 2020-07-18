module.exports = {
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        whitelistPatterns: [/:global/],
        ignore: ['sanitize.css'],
      },
    },
  ],
}
