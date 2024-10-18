import React from 'react';
import "../styles/components/ReviewModal.css";

const ReviewModal = ({ reviews = [], onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Vendor Reviews</h3>
                    <button className="close-button" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {reviews.length === 0 ? (
                        <p>No reviews available for this vendor.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="review">
                                <p><strong>Rating:</strong> {review.rating} / 5</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Date:</strong> {new Date(review.createdDate).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
