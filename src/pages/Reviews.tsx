import React, { useState } from 'react';
import { Review } from '../types';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');

  // Challenge 9: Stored XSS
  const addReview = () => {
    // Intentionally vulnerable: No sanitization
    const review: Review = {
      id: reviews.length + 1,
      productId: 1,
      userId: 1,
      rating: 5,
      comment: newReview,
      date: new Date().toISOString()
    };
    setReviews([...reviews, review]);
  };

  // Challenge 10: DOM-based XSS
  const displayReview = (review: Review) => {
    // Intentionally vulnerable: innerHTML usage
    return { __html: review.comment };
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Reviews</h1>
      
      <div className="mb-6">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your review..."
        />
        <button
          onClick={addReview}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add Review
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="p-4 border rounded">
            <div dangerouslySetInnerHTML={displayReview(review)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;