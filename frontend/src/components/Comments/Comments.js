import Comment from "./Comment"
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import "./RestaurantReviews.css"
import ReviewForm from "../ReviewForm";
import RestaurantReview from "../RestaurantReview";
import { getReviews } from "../../store/reviews";

function Comments() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => Object.values(state.reviews));
    const {restaurantId} = useParams();

    if (!reviews) {
        return null
    }

    return (
        <>
            <header className="profile-section-container">
                <header className="section-header">
                    <div className="review-header">
                        <h2 className="header-text">What {reviews.length} people are saying</h2>
                    </div>
                </header>
            </header>

                    <ReviewForm/>

                    <br></br>

                    <ol className="reviews-list" id="restProfileReviewsContent">
                        {reviews.map(review=><RestaurantReview key={review.id} review={review}/>)}
                    </ol>
        </>
        )
    }



export default RestaurantReviews
