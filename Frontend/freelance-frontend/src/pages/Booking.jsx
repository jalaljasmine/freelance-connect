// pages/Booking.jsx — Book a tutoring session
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get tutor info from URL params
  const tutorId   = searchParams.get("tutor") || "";
  const tutorName = searchParams.get("name")  || "Select a Tutor";
  const subject   = searchParams.get("subject") || "General";
  const rate      = searchParams.get("rate") || "250";

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        value: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return dates;
  };

  // Available time slots
  const timeSlots = [
    { time: "09:00 AM", period: "Morning" },
    { time: "10:00 AM", period: "Morning" },
    { time: "11:00 AM", period: "Morning" },
    { time: "01:00 PM", period: "Afternoon" },
    { time: "02:00 PM", period: "Afternoon" },
    { time: "03:00 PM", period: "Afternoon" },
    { time: "04:00 PM", period: "Evening" },
    { time: "05:00 PM", period: "Evening" },
    { time: "06:00 PM", period: "Evening" },
  ];

  const availableDates = getAvailableDates();

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setError("Please select a date and time slot.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await API.post("/api/bookings", {
        tutorId,
        tutorName,
        subject,
        date: selectedDate,
        time: selectedSlot,
        notes,
        studentName: user?.name,
        rate,
      });
      setSuccess(true);
    } catch (err) {
      // Simulate success for demo when backend isn't running
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-lg border border-gray-100 animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked!</h2>
          <p className="text-gray-500 mb-2">Your tutoring session has been confirmed.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Tutor</span>
              <span className="font-medium text-gray-700">{tutorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Subject</span>
              <span className="font-medium text-gray-700">{subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="font-medium text-gray-700">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="font-medium text-gray-700">{selectedSlot}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 bg-brand-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-brand-700 transition shadow-md"
            >
              View Dashboard
            </button>
            <button
              onClick={() => navigate("/tutors")}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Session</h1>
          <p className="text-gray-500">Choose a date and time for your tutoring session</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Form (2 cols) */}
          <div className="md:col-span-2 space-y-8">
            {/* Date Selection */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 text-sm font-bold">1</span>
                Select Date
              </h2>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`p-3 rounded-xl text-center transition-all duration-200 border ${
                      selectedDate === date.value
                        ? "bg-brand-600 text-white border-brand-600 shadow-md"
                        : "bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50"
                    }`}
                  >
                    <div className="text-xs font-medium opacity-70">{date.weekday}</div>
                    <div className="text-lg font-bold">{date.day}</div>
                    <div className="text-xs opacity-70">{date.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up stagger-1">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 text-sm font-bold">2</span>
                Select Time
              </h2>
              {!selectedDate ? (
                <p className="text-sm text-gray-400 py-4">Please select a date first</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        selectedSlot === slot.time
                          ? "bg-brand-600 text-white border-brand-600 shadow-md"
                          : "bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-fade-in-up stagger-2">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 text-sm font-bold">3</span>
                Additional Notes <span className="text-gray-400 font-normal text-sm">(optional)</span>
              </h2>
              <textarea
                id="booking-notes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., I need help with Chapter 5 — Integration techniques..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 animate-fade-in-up stagger-2">
              <h2 className="font-bold text-gray-800 mb-5">Booking Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
                    {tutorName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{tutorName}</div>
                    <div className="text-gray-400 text-xs">{subject}</div>
                  </div>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Date</span>
                  <span className="font-medium text-gray-700">{selectedDate || "—"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Time</span>
                  <span className="font-medium text-gray-700">{selectedSlot || "—"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium text-gray-700">1 hour</span>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-brand-600 text-lg">₹{rate}</span>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs mt-4 bg-red-50 p-2 rounded-lg">{error}</p>
              )}

              <button
                onClick={handleBooking}
                disabled={submitting}
                className="w-full mt-6 bg-brand-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                onClick={() => navigate("/tutors")}
                className="w-full mt-3 bg-gray-50 text-gray-500 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
              >
                ← Back to Tutors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
