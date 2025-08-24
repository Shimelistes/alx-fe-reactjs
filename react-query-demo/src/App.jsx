// src/App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

<QueryClientProvider client={queryClient}>
  <PostsComponent />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

export default App;
