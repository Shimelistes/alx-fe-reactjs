// src/components/PostsComponent.jsx
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000,              // Data is fresh for 5 seconds
    cacheTime: 1000 * 60 * 5,     // Keep cache for 5 minutes
    refetchOnWindowFocus: true,   // Auto refetch when user returns to tab
    keepPreviousData: true        // Keep old data while fetching new one
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button 
        onClick={() => refetch()} 
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        disabled={isFetching}
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

      <ul className="space-y-2">
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className="p-3 border rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
