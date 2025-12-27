import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Bookmark, Star, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "programming",
      rating: 4.8,
      description: "A handbook of agile software craftsmanship.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/41zoxjP9lcL._SX376_BO1,204,203,200_.jpg",
      pages: 464,
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Design Patterns",
      author: "Gang of Four",
      category: "programming",
      rating: 4.7,
      description: "Elements of reusable object-oriented software.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/51kAoU8va-L._SX396_BO1,204,203,200_.jpg",
      pages: 416,
      level: "Advanced"
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "productivity",
      rating: 4.8,
      description: "An easy & proven way to build good habits & break bad ones.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
      pages: 320,
      level: "Beginner"
    },
    {
      id: 4,
      title: "Deep Work",
      author: "Cal Newport",
      category: "productivity",
      rating: 4.5,
      description: "Rules for focused success in a distracted world.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/41rhx6d02NL._SX329_BO1,204,203,200_.jpg",
      pages: 304,
      level: "Intermediate"
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      category: "finance",
      rating: 4.7,
      description: "Timeless lessons on wealth, greed, and happiness.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/41oYp33uD1L._SX324_BO1,204,203,200_.jpg",
      pages: 256,
      level: "Beginner"
    },
    {
      id: 6,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "history",
      rating: 4.6,
      description: "A brief history of humankind.",
      cover: "https://images-na.ssl-images-amazon.com/images/I/41lZKXt1%2BML._SX333_BO1,204,203,200_.jpg",
      pages: 443,
      level: "Beginner"
    }
  ];

  const categories = [
    { id: "all", name: "All Books" },
    { id: "programming", name: "Programming" },
    { id: "productivity", name: "Productivity" },
    { id: "finance", name: "Finance" },
    { id: "history", name: "History" }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">BookSpace</h1>
              <p className="text-gray-600 mt-2">
                Explore curated books, notes, and learning resources
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books or authors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none w-full bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookOpen className="text-indigo-600 w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Books</p>
                <p className="text-2xl font-bold">{books.length}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Bookmark className="text-green-600 w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="text-yellow-600 w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="text-purple-600 w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Pages</p>
                <p className="text-2xl font-bold">2,007</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Books</h2>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto w-16 h-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No books found</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                      <img
                        className="w-32 h-40 sm:w-20 sm:h-28 object-cover rounded-lg shadow"
                        src={book.cover}
                        alt={book.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{book.author}</p>

                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {book.rating}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {book.level}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {book.pages} pages
                        </span>
                      </div>

                      <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                        {book.description}
                      </p>

                      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center justify-center sm:justify-start">
                          <Bookmark className="w-4 h-4 mr-1" />
                          Save
                        </button>
                        <button 
                          onClick={() => navigate(`/book/${book.id}`)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.slice(1).map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center cursor-pointer border border-gray-100 hover:border-indigo-300 transition-colors"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="mt-3 font-medium text-gray-900">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {books.filter((book) => book.category === category.id).length} books
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;