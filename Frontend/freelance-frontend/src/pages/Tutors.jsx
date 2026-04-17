// pages/Tutors.jsx — Browse tutors with subjects and ratings
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import API from "../api/axios";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Fallback demo data (used when backend is not available)
  const demoTutors = [
    { _id: "1", name: "Aisha Patel", subject: "Mathematics", rating: 4.9, sessions: 120, bio: "MSc in Applied Math. Specializes in calculus and linear algebra.", avatar: "A", hourlyRate: 250 },
    { _id: "2", name: "James Wilson", subject: "Physics", rating: 4.8, sessions: 95, bio: "Physics major with a passion for making mechanics intuitive.", avatar: "J", hourlyRate: 300 },
    { _id: "3", name: "Sara Chen", subject: "Chemistry", rating: 4.7, sessions: 78, bio: "Organic chemistry expert. Lab TA for 3 years.", avatar: "S", hourlyRate: 280 },
    { _id: "4", name: "Miguel Rodriguez", subject: "Computer Science", rating: 4.9, sessions: 150, bio: "Full-stack developer. Teaches Python, Java, and web dev.", avatar: "M", hourlyRate: 400 },
    { _id: "5", name: "Emily Thompson", subject: "English", rating: 4.6, sessions: 64, bio: "Published author. Helps with essays, grammar, and creative writing.", avatar: "E", hourlyRate: 220 },
    { _id: "6", name: "David Kim", subject: "Biology", rating: 4.8, sessions: 88, bio: "Pre-med student. Strong in anatomy and molecular biology.", avatar: "D", hourlyRate: 270 },
    { _id: "7", name: "Priya Sharma", subject: "Mathematics", rating: 4.7, sessions: 72, bio: "Statistics and probability specialist. Makes data fun.", avatar: "P", hourlyRate: 240 },
    { _id: "8", name: "Lucas Brown", subject: "Physics", rating: 4.5, sessions: 55, bio: "Astrophysics enthusiast. Great at explaining complex concepts.", avatar: "L", hourlyRate: 260 },
  ];

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const res = await API.get("/api/tutors");
        setTutors(res.data);
      } catch (err) {
        // Use demo data when backend isn't available
        setTutors(demoTutors);
        setError("");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // Filter tutors based on search
  const filteredTutors = tutors.filter((t) => {
    const q = (localSearch || searchQuery).toLowerCase();
    if (!q) return true;
    return (
      t.name?.toLowerCase().includes(q) ||
      t.subject?.toLowerCase().includes(q) ||
      t.bio?.toLowerCase().includes(q)
    );
  });

  // Color mapping for subject badges
  const subjectColors = {
    "Mathematics": "bg-blue-100 text-blue-700",
    "Physics": "bg-purple-100 text-purple-700",
    "Chemistry": "bg-green-100 text-green-700",
    "Computer Science": "bg-cyan-100 text-cyan-700",
    "English": "bg-amber-100 text-amber-700",
    "Biology": "bg-emerald-100 text-emerald-700",
  };

  // Gradient colors for avatars
  const avatarGradients = [
    "from-blue-400 to-indigo-600",
    "from-purple-400 to-pink-600",
    "from-green-400 to-teal-600",
    "from-amber-400 to-orange-600",
    "from-cyan-400 to-blue-600",
    "from-rose-400 to-red-600",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Tutors</h1>
          <p className="text-gray-500 mb-6">Browse our community of peer tutors and find your perfect match</p>

          {/* Search */}
          <div className="flex items-center bg-gray-50 rounded-xl p-1.5 max-w-lg border border-gray-200 focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
            <span className="pl-3 text-gray-400">🔍</span>
            <input
              id="tutor-search"
              type="text"
              placeholder="Search by name, subject, or keyword..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch("")}
                className="text-gray-400 hover:text-gray-600 pr-3 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tutor Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="text-brand-600 hover:underline text-sm">Try again</button>
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg mb-2">No tutors found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search query</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-6">{filteredTutors.length} tutor{filteredTutors.length !== 1 ? "s" : ""} found</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTutors.map((tutor, i) => (
                <div
                  key={tutor._id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {/* Tutor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0`}>
                      {tutor.avatar || tutor.name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg truncate">{tutor.name}</h3>
                      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${subjectColors[tutor.subject] || "bg-gray-100 text-gray-600"}`}>
                        {tutor.subject}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {tutor.bio || "Experienced tutor ready to help you learn."}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-sm mb-5 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-800">{tutor.rating || "4.5"}</span>
                    </div>
                    <div className="text-gray-400">
                      {tutor.sessions || 0} sessions
                    </div>
                    <div className="font-semibold text-brand-600">
                      ₹{tutor.hourlyRate || 250}/hr
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/booking?tutor=${tutor._id}&name=${encodeURIComponent(tutor.name)}&subject=${encodeURIComponent(tutor.subject)}&rate=${tutor.hourlyRate || 250}`}
                    className="block w-full text-center bg-brand-50 text-brand-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-100 transition-colors duration-200"
                  >
                    Book Session →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tutors;
