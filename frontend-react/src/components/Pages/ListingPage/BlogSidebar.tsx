interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends in web technologies and how they will shape the future of development.",
    image: "https://via.placeholder.com/100x100",
    date: "2023-06-01",
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt: "A deep dive into React's powerful hook system and how to leverage them in your applications.",
    image: "https://via.placeholder.com/100x100",
    date: "2023-05-28",
  },
  {
    id: 3,
    title: "CSS Grid Layout Techniques",
    excerpt: "Advanced strategies for responsive web design using CSS Grid Layout.",
    image: "https://via.placeholder.com/100x100",
    date: "2023-05-25",
  },
  {
    id: 4,
    title: "JavaScript Performance Optimization",
    excerpt: "Tips and tricks for faster web applications through efficient JavaScript practices.",
    image: "https://via.placeholder.com/100x100",
    date: "2023-05-22",
  },
  {
    id: 5,
    title: "Introduction to WebAssembly",
    excerpt: "Bringing native performance to the web with WebAssembly: an overview and getting started guide.",
    image: "https://via.placeholder.com/100x100",
    date: "2023-05-19",
  },
  // Add more blog posts here to demonstrate scrolling
];

export default function FeaturedBlogsSidebar() {
  return (
    <aside className="lg:w-1/4 bg-white bg-opacity-90 flex flex-col h-screen sticky top-0 overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b">Featured Blogs</h2>
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        {blogPosts.map((post) => (
          <article key={post.id} className="p-4 border-b last:border-b-0">
            <div className="flex space-x-4">
              <img 
                src={post.image} 
                alt="" 
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{new Date(post.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}