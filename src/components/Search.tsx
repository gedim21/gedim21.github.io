import { graphql, useStaticQuery } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import BlogListItem from './blog/BlogListItem';

type Result = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  categories: string[];
  date: Date;
  timeToRead: number;
  excerpt: string;
};

const Search = ({ query, setQuery }: { query: string; setQuery: any }) => {
  const data = useStaticQuery(graphql`
    query {
      localSearchPosts {
        index
        store
      }
    }
  `);

  const { index, store } = data.localSearchPosts;
  const results = useFlexSearch(query, index, store);

  return (
    <div className="my-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter you search term..."
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
      />
      {query && results.length + ' result(s) found'}
      {results.map((result: Result) => (
        <BlogListItem
          id={result.id}
          title={result.title}
          date={result.date}
          tags={result.tags}
          categories={result.categories}
          excerpt={result.excerpt}
          slug={result.slug}
          timeToRead={result.timeToRead}
        ></BlogListItem>
      ))}
    </div>
  );
};

export default Search;
