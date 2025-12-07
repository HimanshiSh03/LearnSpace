import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Bookmark, Download, Eye, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const BookPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [activeTab, setActiveTab] = useState("preview");

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
      level: "Intermediate",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      pdfUrl: "#",
      publishDate: "2008-08-11",
      publisher: "Prentice Hall"
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
      level: "Advanced",
      excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      pdfUrl: "#",
      publishDate: "1994-10-31",
      publisher: "Addison-Wesley Professional"
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
      level: "Beginner",
      excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      pdfUrl: "#",
      publishDate: "2018-10-16",
      publisher: "Avery"
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
      level: "Intermediate",
      excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      pdfUrl: "#",
      publishDate: "2016-01-05",
      publisher: "Grand Central Publishing"
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
      level: "Beginner",
      excerpt: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      pdfUrl: "#",
      publishDate: "2020-09-08",
      publisher: "Harriman House"
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
      level: "Beginner",
      excerpt: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
      pdfUrl: "#",
      publishDate: "2015-02-10",
      publisher: "Harper"
    }
  ];

  // Sample reviews data
  const sampleReviews = [
    {
      id: 1,
      user: "Alex Johnson",
      rating: 5,
      comment: "This book completely transformed my approach to coding. Highly recommended for all developers!",
      date: "2023-05-15",
      likes: 24
    },
    {
      id: 2,
      user: "Sarah Miller",
      rating: 4,
      comment: "Great insights on software design principles. Some concepts are a bit advanced but very valuable.",
      date: "2023-04-22",
      likes: 18
    },
    {
      id: 3,
      user: "Michael Chen",
      rating: 5,
      comment: "Essential reading for anyone serious about software development. The examples are practical and clear.",
      date: "2023-03-10",
      likes: 31
    }
  ];

  useEffect(() => {
    // Find the book by ID
    const foundBook = books.find(book => book.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
      setReviews(sampleReviews);
    } else {
      // If book not found, redirect to books page
      navigate("/books");
    }
  }, [id, navigate]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        user: "You",
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6">
        <Link to="/books" className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Books
        </Link>
      </div>

      {/* Book Header */}
      <div className="container mx-auto px-6 pb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <img
                className="w-48 h-64 object-cover rounded-lg shadow-lg"
                src={book.cover}
                alt={book.title}
              />
            </div>
            
            <div className="md:w-3/4 md:pl-8">
              <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
              <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
              
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{book.rating} ({reviews.length} reviews)</span>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {book.level}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {book.pages} pages
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {book.category}
                </span>
              </div>
              
              <p className="mt-6 text-gray-700">{book.description}</p>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Publisher</p>
                  <p className="font-medium">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-medium">{book.publishDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">{book.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-medium">{book.pages}</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Eye className="w-5 h-5 mr-2" />
                  Read Preview
                </button>
                <button className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
                <button className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Save for Later
                </button>
                <button className="flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "preview"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Eye className="w-5 h-5 inline mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab("excerpt")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "excerpt"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Excerpt
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === "preview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Preview</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Eye className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">PDF Preview</h3>
              <p className="mt-1 text-gray-500">
                Interactive PDF viewer would be embedded here in a production environment.
              </p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full PDF
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>In a real implementation, this would show the first few pages of the book.</p>
                <p className="mt-2">For demonstration purposes, we're showing sample content.</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-8 h-8 cursor-pointer ${
                          i < newReview.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                        onClick={() => setNewReview({...newReview, rating: i + 1})}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md p-3"
                    placeholder="Share your thoughts about this book..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Submit Review
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{review.user}</h3>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                    
                    <div className="mt-3 flex items-center">
                      <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {review.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "excerpt" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Excerpt</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {book.excerpt}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This is a sample excerpt from the book. In a real implementation, this would show 
                a longer passage from the actual book content to give readers a taste of the writing style 
                and key concepts covered in the book.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                The full book contains {book.pages} pages of in-depth content, practical examples, 
                and actionable advice that can help transform your approach to {book.category}.
              </p>
              <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-bold text-indigo-800">Want to read more?</h3>
                <p className="text-indigo-700 mt-2">
                  Download the full PDF or purchase the book to access all chapters and content.
                </p>
                <div className="mt-4 flex gap-3">
                  <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  <button className="flex items-center bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Buy Book
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookPreview;