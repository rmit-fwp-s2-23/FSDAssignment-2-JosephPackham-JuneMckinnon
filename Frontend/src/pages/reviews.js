import React from 'react';
import '../css/reviews.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { createReview, getReviewsByMovie, deleteReview, updateReview } from '../data/repository';



const Reviews = (props) => {

    const [reviews, setReviews] = useState([]); //set reviews state to empty array
    useEffect(() => { //useEffect is used to fetch data from the database
        const getReviews = async () => { //async function to fetch data
            const reviews = await getReviewsByMovie(props.movie); //get all reviews for the selected movie
            setReviews(reviews);
            
            
        }
        getReviews();
    }, [props.movie])

    
    let error;

    // Define a validation function to check if a review is valid
  const validate = (review) => {
    if (review.review_text.length > 600) {
      return 'Review must be less than 600 characters long';
    } else {
      return null;
    }
  };

  // Define a function to handle deleting a review
  const handleDelete = async (review_id, email, e) => {
    e.preventDefault();
    if (props.user.email === email) {
      try {
        await deleteReview(review_id);
        // Refresh the reviews list
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('You can only delete your own reviews');
    }
  };

  // Define a function to handle editing a review
  const handleEdit = async (review, e) => {
    e.preventDefault();
    if (review.author_email === props.user.email) {
      let edit = prompt('Edit your review', review.review_text);
      if (edit === null) {
        return;
      }
      review.review_text = edit;
      await updateReview(review.review_id, review);
      window.location.reload(false);
    }
  };

  // Define a function to handle submitting a new review
  const handleSubmit = async (e) => {
    let date = new Date();
    console.log(date.toLocaleDateString());
    const review = {
      movie: props.movie,
      author_name: props.user.name,
      author_email: props.user.email,
      review_rating: e.target.rating.value,
      review_text: e.target.reviewcontent.value,
      review_date: date.toLocaleDateString(),
    };

    // Validate the review
    const error = await validate(review);
    if (error != null) {
      // If there is an error, display error message
      e.preventDefault();
      console.log(error);
      let errormsg = document.getElementById('error');
      errormsg.innerHTML = error;
      return;
    } else {
      // Otherwise, create the review
      await createReview(review);
    }
  };

  // Render the component
  return (
    <div className='page'>
      <div className='movie-background'>
        <div className='form-background' id='form-bkg'>
          <div className='review-header' id='header'>
            Reviews of {props.movie}
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='review-form'>
              <div className='rating-input'>
                <label className='rating-label'>Rating:</label>
                <div>
                  <input
                    className='rating-number'
                    type='number'
                    placeholder=''
                    min='1'
                    max='5'
                    id='rating'
                    required
                  ></input>
                  <label> /5</label>
                </div>
              </div>
              <textarea
                className='form-reviewcontent'
                placeholder='Tell us what you think...'
                id='reviewcontent'
                required
              ></textarea>
              <div className='submit'>
                <button type='submit' className='button'>
                  Submit
                </button>
              </div>
              <p id='error'></p>
            </div>
          </form>
        </div>
        <div className='form-background' id='review-bkg'>
          <div className='review-container'>
            {/* Map over the reviews and render each one */}
            {reviews.map((review) => (
              <div className='review' data-testid='review' key={review.review_id}>
                <p className='name'> {review.author_name}</p>
                <p className='date'> {review.review_date.split('T')[0]}</p>
                <hr></hr>
                <p>
                  <b>Rating:</b> {review.review_rating}/5
                </p>
                <p className='reviewcontent'> {review.review_text} </p>
                <button id='review-button' onClick={(e) => handleEdit(review, e)}>
                  Edit
                </button>
                <button
                  id='review-button'
                  onClick={(e) => handleDelete(review.review_id, review.author_email, e)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;