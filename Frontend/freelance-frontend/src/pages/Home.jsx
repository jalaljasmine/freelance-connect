// pages/Home.jsx — Hero section + search tutors for SkillLink
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/tutors?search=${encodeURIComponent(searchQuery)}`);
  };

  // Featured subjects
  const subjects = [
    { name: "Mathematics", icon: "📐", color: "from-blue-500 to-indigo-600" },
    { name: "Physics", icon: "⚛️", color: "from-purple-500 to-pink-600" },
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-teal-600" },
    { name: "English", icon: "📝", color: "from-amber-500 to-orange-600" },
    { name: "Computer Science", icon: "💻", color: "from-cyan-500 to-blue-600" },
    { name: "Biology", icon: "🧬", color: "from-emerald-500 to-green-600" },
  ];

  // Stats
  const stats = [
    { value: "500+", label: "Active Tutors" },
    { value: "2,000+", label: "Sessions Completed" },
    { value: "4.9★", label: "Average Rating" },
    { value: "50+", label: "Subjects" },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="gradient-hero relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>

        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block bg-white/60 backdrop-blur-sm text-brand-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm border border-brand-100">
              🎓 Peer-to-Peer Tutoring Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up stagger-1">
            Find peer tutors, book sessions,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
              and learn collaboratively
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            SkillLink connects you with knowledgeable peer tutors across dozens of subjects.
            Learn at your own pace, on your schedule.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-xl mx-auto flex items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-2 animate-fade-in-up stagger-3"
          >
            <span className="pl-4 text-gray-400 text-lg">🔍</span>
            <input
              id="hero-search"
              type="text"
              placeholder="Search for a subject or tutor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-brand-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up stagger-4">
            <span className="text-xs text-gray-500">Popular:</span>
            {["Math", "Physics", "Python", "Essay Writing"].map((tag) => (
              <Link
                key={tag}
                to={`/tutors?search=${tag}`}
                className="text-xs bg-white/70 text-brand-700 px-3 py-1.5 rounded-full hover:bg-brand-100 transition font-medium border border-brand-100"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-2xl md:text-3xl font-bold text-brand-600">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Browse Subjects ===== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Browse by Subject</h2>
            <p className="text-gray-500">Find expert tutors in your area of study</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((subject, i) => (
              <Link
                key={subject.name}
                to={`/tutors?search=${subject.name}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 card-hover animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{subject.name}</h3>
                <p className="text-xs text-gray-400">Find tutors →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How SkillLink Works</h2>
            <p className="text-gray-500">Three simple steps to start learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Search Tutors", desc: "Browse through our verified peer tutors by subject or rating.", icon: "🔍" },
              { step: "02", title: "Book a Session", desc: "Pick a time slot that works for you and book instantly.", icon: "📅" },
              { step: "03", title: "Start Learning", desc: "Connect with your tutor and learn collaboratively.", icon: "🚀" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-2xl border border-gray-100 hover:border-brand-200 transition-all duration-300 card-hover animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-brand-400 mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to start learning?</h2>
          <p className="text-gray-600 mb-8">Join SkillLink today and connect with peer tutors who can help you succeed.</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-brand-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
            <Link
              to="/tutors"
              className="bg-white text-brand-600 px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all shadow-md border border-brand-200"
            >
              Browse Tutors
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-white font-bold">SkillLink</span>
          </div>
          <p className="text-sm">© 2026 SkillLink. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
