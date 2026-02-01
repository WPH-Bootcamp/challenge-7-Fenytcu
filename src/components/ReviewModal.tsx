"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export default function ReviewModal({ isOpen, onClose, orderId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
      // Mock Submit
      alert(`Review submitted for Order ${orderId}!\nRating: ${rating}\nComment: ${comment}`);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 p-8">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors">
              <X size={24} />
          </button>

          <h2 className="text-center font-extrabold text-2xl text-gray-900 mb-2">Give Review</h2>
          <p className="text-center text-gray-500 font-bold text-sm mb-8">Give Rating</p>

          <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                      <Star 
                        size={32} 
                        className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} transition-colors`} 
                      />
                  </button>
              ))}
          </div>

          <p className="text-center text-gray-400 text-sm font-bold mb-4">Please share your thoughts about our service!</p>

          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 font-nunito text-sm font-bold focus:ring-2 focus:ring-red-100 outline-none resize-none mb-8"
            placeholder="Write your review here..."
          ></textarea>

          <button 
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-lg shadow-red-100 transition-transform active:scale-95"
          >
              Send
          </button>
      </div>
    </div>
  );
}
