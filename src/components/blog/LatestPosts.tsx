import { BlogPost } from '@/model/BlogPost';
import { useState } from 'react';
import Search from '../Search';
import PostCard from './post/PostCard';

const LatestPosts = ({ blogPosts }: { blogPosts: BlogPost[] }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Search query={query} setQuery={setQuery} />
      {!query && (
        <p className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {blogPosts.map((blogPost) => (
            <PostCard key={blogPost.id} post={blogPost} />
          ))}
        </p>
      )}
    </>
  );
};

export default LatestPosts;
