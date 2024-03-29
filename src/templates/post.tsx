import { graphql, Link } from "gatsby";

import { MDXProvider } from "@mdx-js/react";
import { GiscusComments } from "@/components/blog/comments/Giscus";
import {
  PostCard,
  AuthorBar,
  TableOfContents,
  PostHeader,
  PostCategories,
  PostTags,
  Sharing,
} from "@/components/blog/post";
import { Layout, CodeBlock } from "@/components/common";
import { Person, BlogPost, BlogPostMdxNode, mdxToBlogPost } from "@/model";

type DataProps = {
  mdx: BlogPostMdxNode;
  relatedMdxs: {
    posts: BlogPostMdxNode[];
  };
  site: {
    siteMetadata: {
      owner: Person;
      siteUrl: string;
    };
  };
};

const components = {
  pre: CodeBlock,
  Link,
};

const PostPage = ({ data, children }: { data: DataProps; children: any }) => {
  const post: BlogPost = mdxToBlogPost(data.mdx, data.site);

  return (
    <Layout post={post}>
      <div className="container mx-auto pt-4 flex flex-col md:flex-row">
        <aside className="flex-initial md:w-32 min-w-0 md:block md:basis-1/4 md:px-4">
          <AuthorBar />
        </aside>
        <main className="flex-grow min-w-0 sm:basis-full md:basis-3/4 md:px-4">
          <article className="blog-post">
            <header>
              <PostHeader post={post} />
            </header>

            <section>
              <MDXProvider components={components}>{children}</MDXProvider>
            </section>

            <footer className="mt-10">
              <section className="flex flex-wrap">
                <PostTags post={post} />
              </section>

              <section className="flex flex-row">
                <PostCategories post={post} />
              </section>

              <section className="my-8">
                <Sharing
                  siteUrl={data.site.siteMetadata.siteUrl}
                  slug={data.mdx.fields.slug}
                  title={data.mdx.frontmatter.title}
                  tags={data.mdx.frontmatter.tags}
                />
              </section>

              <section>
                <GiscusComments />
              </section>

              {data.relatedMdxs && (
                <>
                  <h3>You may also enjoy</h3>
                  <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {data.relatedMdxs?.posts.slice(0, 3).map((post) => (
                      <PostCard
                        key={post.id}
                        post={mdxToBlogPost(post, data.site)}
                      />
                    ))}
                  </section>
                </>
              )}
            </footer>
          </article>
        </main>
        <aside className="flex-initial w-32 min-w-0 hidden md:block md:basis-1/4 md:px-4">
          <TableOfContents headings={data.mdx.headings}></TableOfContents>
        </aside>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      ...BlogPost
    }
    relatedMdxs(parent: { id: { eq: $id } }) {
      posts {
        ...BlogPost
      }
    }
    site {
      siteMetadata {
        siteUrl
        owner {
          ...SiteSiteMetadataOwnerFragment
        }
      }
    }
  }
`;

export default PostPage;
