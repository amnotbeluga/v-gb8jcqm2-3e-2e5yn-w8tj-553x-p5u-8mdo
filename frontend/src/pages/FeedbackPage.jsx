import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sentiment, setSentiment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate Sentiment detection
    const randomSentiment = Math.random() > 0.3 ? 'positive' : 'negative';
    setSentiment(randomSentiment);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Share Your Experience
        </h1>

        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-6">We Value Your Feedback</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Rate your experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-3xl focus:outline-none"
                      >
                        {star <= rating ? (
                          <span className="text-yellow-400">★</span>
                        ) : (
                          <span className="text-gray-300">★</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="feedback">
                    Your feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={5}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your experience in Jharkhand..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 font-medium"
                  disabled={rating === 0 || feedback.trim() === ''}
                >
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="card p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-5xl mb-4">
                {sentiment === 'positive' ? '😊' : '😔'}
              </div>

              <h2 className="text-2xl font-semibold mb-2">
                Thank You for Your Feedback!
              </h2>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Your insights help us improve the tourism experience in Jharkhand.
                </p>

                <div className="inline-block bg-gray-100 rounded-lg px-4 py-3">
                  <div className="text-sm text-gray-500 mb-1">
                    AI Sentiment Analysis
                  </div>
                  <div
                    className={`font-medium ${
                      sentiment === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {sentiment === 'positive'
                      ? 'Positive Feedback'
                      : 'Negative Feedback'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setRating(0);
                  setFeedback('');
                  setSentiment(null);
                }}
                className="btn-primary"
              >
                Submit Another Feedback
              </button>
            </motion.div>
          )}

          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-2">How We Use Your Feedback</h3>
            <p className="text-gray-600">
              Your feedback is analyzed by our AI system to identify areas of
              improvement and enhance the tourism experience in Jharkhand. All
              feedback is shared with local businesses and government tourism
              departments to help develop better services.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FeedbackPage;
