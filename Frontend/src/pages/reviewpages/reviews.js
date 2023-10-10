import React from 'react';
import '../../css/reviews.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { createReview, getReviewsByMovie } from '../../data/repository';



const Reviews = (props) => {
    
    // let reviews = JSON.parse(localStorage.getItem('barbieReview'));
    // let error;
    // const [Avgrating, setAvgrating] = useState(0);

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const getReviews = async () => {
            const reviews = await getReviewsByMovie(props.movie);
            setReviews(reviews);
        }
        getReviews();
    }, [props.movie])


    
    

    // useEffect(() => {
    //     let sum = 0;
    //     let count = 0;
    //     if(reviews){
    //         reviews.forEach(review => {
    //             sum += parseInt(review.rating);
    //             count++;
    //         });
    //         setAvgrating(sum/count);

    //     }
    // }, [reviews])
    // if(reviews == null){
    //     reviews = [

    //     ];   
    //     setAvgrating(0);
    // }
    
    let error;

    const validate = (review) => {
        if (review.review_text.length > 600) {
            return 'Review must less than 600 characters long';
        } else{
            return null;
        }
        
        
        
    }

    const handleDelete = (review) => {
        // if(review.user === props.user.name){
        //     return () => {
        //         reviews.splice(reviews.indexOf(review), 1);
        //         localStorage.setItem('barbieReview', JSON.stringify(reviews));
        //         window.location.reload(false);
        //     }
        // } 
    }

    const handleEdit = (review) => {
        // if(review.user === props.user.name){
        //     return () => {
        //         let edit = prompt('Edit your review', review.reviewcontent);
        //         if(edit === null){
        //             return;
        //         }
        //         review.reviewcontent = edit;
        //         localStorage.setItem('barbieReview', JSON.stringify(reviews));
        //         window.location.reload(false);
        //     }
        // }
    }



    const handleSubmit = async (e) => {
        let date = new Date();
        const review = {
            movie: props.movie,
            author_name: props.user.name,
            author_email: props.user.email,
            review_rating: e.target.rating.value,
            review_text: e.target.reviewcontent.value,
            review_date: date.toLocaleDateString(),
        }

        error = await validate(review);
        if(error != null){ //if there is an error, display error message
            e.preventDefault();
            console.log(error);
            let errormsg = document.getElementById('error');
            errormsg.innerHTML = error;
            return;
        } else{
            await createReview(review);
        }
        
        



        // 
        
        
    //     let date = new Date();
        
    //     const review ={
    //         movie : 'Barbie',
    //         user : props.user.name,
    //         rating: e.target.rating.value,
    //         reviewcontent: e.target.reviewcontent.value,
    //         reviewdate: date.toLocaleDateString(),
    //     }
    //     error = validate(review)



    //     if(error){
    //         //if there is an error, display error message
    //         e.preventDefault();
    //         console.log(error);
    //         let errormsg = document.getElementById('error');
    //         errormsg.innerHTML = error;
    //         return;
        


    //     } else {
    //         reviews.unshift(review);
    //         localStorage.setItem('barbieReview', JSON.stringify(reviews));
    //         window.location.reload(false);
            
    // }

    }


    return (
        <div className = 'page'>
            <div className = "movie-background">
                <div className = "form-background" id = "form-bkg">
                    <div className = "review-header" id = "header">
                        Reviews of {props.movie}
                    </div>
                    <form onSubmit = { e => handleSubmit(e)}>
                        <div className = "review-form">
                            <div className = "rating-input">
                                <label className = 'rating-label'>Rating:</label>
                                <div>
                                    <input className = 'rating-number' type = 'number' placeholder='' min='1' max='5' id = 'rating' required></input><label> /5</label>
                                </div>
                            </div>
                            <textarea className='form-reviewcontent' placeholder='Tell us what you think...' id = 'reviewcontent' required></textarea>
                            <div className = "submit">
                                <button type = 'submit' className='button'>Submit</button>
                            </div>
                            <p id = 'error'></p>
                        </div>
                    </form>
                </div>
                <div className = "form-background" id = "review-bkg">
                    <div className = 'review-container'>
                    {reviews.map((review) => (
                        <div className='review'>
                            <p className='name'> {review.author_name} - {review.review_date}</p>
                            <hr></hr>
                            <p><b>Rating:</b> {review.review_rating}/5</p>
                            <p className='reviewcontent'> {review.review_text} </p>
                            <button id='review-button' onClick={handleEdit(review)}>Edit</button>
                            <button id='review-button' onClick={handleDelete(review)}>Delete</button>
                        </div>


                    ))}
                        
                </div>
            </div>
        </div>
        </div>
    );
}

export default Reviews;