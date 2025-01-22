
export default function FeaturedBlogsSidebar() {
  return (
    <aside className="lg:w-1/4 bg-white bg-opacity-90 flex flex-col h-screen sticky top-0 overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b">Featured</h2>
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        <img
          src="/side-panel-image.jpeg"
          alt="blog-image"
          className="w-auto h-auto object-contain p-5 rounded-lg flex-shrink-0"
        />
      </div>
    </aside>
  );
}
