import type { GatsbyConfig } from 'gatsby';
import { mdxToBlogPost, type Person, type SocialLink } from './src/model/';

const socialLinks: SocialLink[] = [
  {label: 'Email', uri: 'mailto:gedim21@gmail.com', iconPrefix: 'fas', iconName:'envelope'},
  {label: 'Twitter', uri: 'https://twitter.com/gedim21', iconPrefix: 'fab', iconName:'twitter'},
  {label: 'Github', uri: 'https://github.com/gedim21', iconPrefix: 'fab', iconName:'github'},
  {label: 'LinkedIn', uri: 'https://www.linkedin.com/in/giorgosdimtsas', iconPrefix: 'fab', iconName:'linkedin'}
];

const me: Person = {
  name: 'Giorgos',
  surname: 'Dimtsas',
  title: 'Lead Software Engineer',
  location: 'Athens, Greece',
  twitter: '@gedim21',
  facebook: 'gedim21',
  social: socialLinks,
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'BlogNotFoundException',
    titleTemplate: '%s - BlogNotFoundException',
    description: '//TODO find a blog description',
    headline: '//TODO find a blog description',
    siteUrl: 'https://www.giorgosdimtsas.net',
    language: 'en',
    siteImage: '/static-images/logo.png',
    owner: me,
    comments: {
      giscus: {
        repo: 'gedim21/gedim21.github.io',
        repoId: 'MDEwOlJlcG9zaXRvcnkzNDgxNDA0NDc=',
        category: 'General',
        categoryId: 'DIC_kwDOFMAzn84CPSXl',
        mapping: 'pathname',
        reactions: '1',
        emitMetadata: '0',
        inputPosition: 'top',
        theme: 'dark_dimmed',
        lang: 'en',
        loading: 'lazy',
      },
    },
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-tsconfig-paths`,
      options: {
        configFile: `${__dirname}/tsconfig.json`,
        silent: true
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: 'static/static-images/logo.png',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `./content/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./content/images/`,
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-dark-mode',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              backgroundColor: `transparent`,
            },
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-related-posts',
            options: {
              target_node: 'Mdx',
              getMarkdown: (node) => node.body,
            },
          },
        ],
        mdxOptions: {
          
        },
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'posts',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
          tokenize: 'full',
        },

        // GraphQL query used to fetch all data for the search index. This is required.
        query: `
          {
            allMdx {
              nodes {
                frontmatter {
                  title
                  description
                  date(formatString: "MMMM D, YYYY")
                  tags
                  categories
                  image {
                    publicURL
                    childImageSharp {
                      gatsbyImageData(width: 700, height: 350)
                    }
                  }
                }
                id
                excerpt
                fields {
                  slug
                  timeToRead {
                    minutes
                    text
                    time
                    words
                  }
                }
                headings {
                  value
                  depth
                }
                body
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'description', 'searchableBody', 'tags', 'categories'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: [
          'id',
          'slug',
          'title',
          'description',
          'tags',
          'categories',
          'date',
          'timeToRead',
          'excerpt',
          'image'
        ],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map((node) => mdxToBlogPost(node)),
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-DLBBL8V0GS', // Google Analytics / GA
          //"AW-CONVERSION_ID", // Google Ads / Adwords / AW
          //"DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          //optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: false,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**', '/do-not-track/me/too/'],
          // Defaults to https://www.googletagmanager.com
          //origin: "YOUR_SELF_HOSTED_ORIGIN",
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-4733788787541071`
      },
    },
  ],
  jsxRuntime: `automatic`,
};

export default config;
