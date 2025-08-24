// src/pages/BlogPost.jsx
import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-bold">Blog Post #{id}</h1>
      <p>This is the content for blog post with ID: {id}.</p>
    </div>
  );
}

export default BlogPost;