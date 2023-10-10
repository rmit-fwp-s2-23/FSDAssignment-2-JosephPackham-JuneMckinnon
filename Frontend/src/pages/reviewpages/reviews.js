import React from 'react';
import '../../css/reviews.css';
import { useState } from 'react';
import { useEffect } from 'react';


 //TODO: if time: make there only be 1 review page, at this time, hard code each movie

const Reviews = (props) => {
    // let reviews = JSON.parse(localStorage.getItem('barbieReview'));
    // let error;
    // const [Avgrating, setAvgrating] = useState(0);
    let movie = props.movie;
    console.log(movie);

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
    
    

    const validate = (review) => {
        
        if (review.reviewcontent.length > 250) {
            return "Review must be less than 250 characters long"
        } else {
            return;
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



    const handleSubmit = (e) => {
        console.log(movie);
        
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
        <div classname = 'page'>
            <div className = "movie-background">
                <div className = "form-background" id = "form-bkg">
                    <div className = "review-header" id = "header">
                        {movie} Reviews
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
                    {/* <div className = "review-container">
                        {reviews&&reviews.map((item, index) => {
                            return (
                                <div className='review'>
                                    <p key={index} className='name'> {item.user} - {item.reviewdate}</p>
                                    <hr></hr> 
                                    <p key={index}><b>Rating:</b> {item.rating}/5</p>
                                    <p key={index} className='reviewcontent'> {item.reviewcontent} </p>
                                    <button id='review-button' onClick={handleEdit(item)}>Edit</button>
                                    <button id='review-button' onClick={handleDelete(item)}>Delete</button>
                                </div>
                            )
                        }
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Reviews;