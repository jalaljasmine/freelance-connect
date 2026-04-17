// pages/Dashboard.jsx — Shows booked tutoring sessions
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo sessions for when backend isn't available
  const demoSessions = [
    { _id: "1", tutorName: "Aisha Patel", subject: "Mathematics", date: "2026-04-14", time: "10:00 AM", status: "upcoming", rate: 250 },
    { _id: "2", tutorName: "Miguel Rodriguez", subject: "Computer Science", date: "2026-04-15", time: "02:00 PM", status: "upcoming", rate: 400 },
    { _id: "3", tutorName: "Sara Chen", subject: "Chemistry", date: "2026-04-10", time: "11:00 AM", status: "completed", rate: 280 },
    { _id: "4", tutorName: "James Wilson", subject: "Physics", date: "2026-04-08", time: "03:00 PM", status: "completed", rate: 300 },
  ];

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/api/bookings/my");
        setSessions(res.data);
      } catch {
        setSessions(demoSessions);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const upcoming = sessions.filter(s => s.status === "upcoming");
  const completed = sessions.filter(s => s.status === "completed");

  const statusBadge = (status) => {
    const styles = {
      upcoming: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const SessionCard = ({ session, i }) => (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
            {session.tutorName?.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{session.tutorName}</h3>
            <p className="text-xs text-gray-400">{session.subject}</p>
          </div>
        </div>
        {statusBadge(session.status)}
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500 mt-3 pt-3 border-t border-gray-50">
        <span>📅 {session.date}</span>
        <span>🕐 {session.time}</span>
        <span className="ml-auto font-semibold text-brand-600">₹{session.rate}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <p className="text-gray-500">Welcome back, {user?.name || "Student"} 👋</p>
            </div>
            <Link to="/tutors" className="bg-brand-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition shadow-md hover:shadow-lg hover:-translate-y-0.5">
              + Book New Session
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Sessions", value: sessions.length, icon: "📊", color: "from-blue-500 to-indigo-600" },
            { label: "Upcoming", value: upcoming.length, icon: "📅", color: "from-amber-500 to-orange-600" },
            { label: "Completed", value: completed.length, icon: "✅", color: "from-green-500 to-emerald-600" },
            { label: "Total Spent", value: `₹${sessions.reduce((a, s) => a + (s.rate || 0), 0)}`, icon: "💰", color: "from-purple-500 to-pink-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3 shadow-sm`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full"></div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No sessions yet</h3>
            <p className="text-gray-400 mb-6">Book your first tutoring session to get started!</p>
            <Link to="/tutors" className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-700 transition shadow-md">
              Find Tutors
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming */}
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {upcoming.map((s, i) => <SessionCard key={s._id} session={s} i={i} />)}
                </div>
              </div>
            )}
            {/* Completed */}
            {completed.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Completed Sessions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {completed.map((s, i) => <SessionCard key={s._id} session={s} i={i} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
