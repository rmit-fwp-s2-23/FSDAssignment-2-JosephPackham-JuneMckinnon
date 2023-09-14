import React from 'react';
import '../../css/reviews.css';
import {useState} from 'react';
import {useEffect} from 'react';
 //Avenger's review

 //TODO: if time: make there only be 1 review page, at this time, hard code each movie

const AvengersReviews = (props) => {
    let error;
    let reviews = JSON.parse(localStorage.getItem('avengersReview'));
    const [Avgrating, setAvgrating] = useState(0);

    useEffect(() => {
        let sum = 0;
        let count = 0;
        if(reviews){
            reviews.forEach(review => {
                sum += parseInt(review.rating);
                count++;
            });
            setAvgrating(sum/count);

        }
    }, [reviews])


        
    

    const validate = (review) => {
        if (review.reviewcontent.length > 250) {
            return "Review must be less than 250 characters long"
        } else {
            return;
        }
    }

    const handleDelete = (review) => {
        if(review.user === props.user.name){
            return () => {
                reviews.splice(reviews.indexOf(review), 1);
                localStorage.setItem('avengersReview', JSON.stringify(reviews));
                window.location.reload(false);
            }
        } 
    }

    const handleEdit = (review) => {
        if(review.user === props.user.name){
            return () => {
                let edit = prompt('Edit your review', review.reviewcontent);
                if(edit === null){
                    return;
                }
                review.reviewcontent = edit;
                localStorage.setItem('avengersReview', JSON.stringify(reviews));
                window.location.reload(false);
            }
        }
    }

    const handleSubmit = (e) => {
        
        let date = new Date();
        
        
        const review ={
            movie : 'Avengers',
            user : props.user.name,
            rating: e.target.rating.value,
            reviewcontent: e.target.reviewcontent.value,
            reviewdate: date.toLocaleDateString(),
        }
        error = validate(review)
        if(reviews == null){
        reviews = [

        ];
    }

        if(error){
            //if there is an error, display error message
            e.preventDefault();
            console.log(error);
            let errormsg = document.getElementById('error');
            errormsg.innerHTML = error;
        } else {
            reviews.unshift(review);
            localStorage.setItem('avengersReview', JSON.stringify(reviews));
            window.location.reload(false);
            
            
            
    }


 

    

    }
        return (
            <div div classname = 'page'>
                <div id = "header">
                    Avenger's Reviews
                </div>
                <form classname = 'form' onSubmit={e=>handleSubmit(e)}>
                    <label className='ratinglabel'>Rating:   </label>
                    <input className='rating' type = 'number' placeholder='' min='1' max='5' id = 'rating'></input><label> /5</label>
                    <br></br>
                    <textarea className='form-reviewcontent' placeholder='Tell us what you think...' id = 'reviewcontent'></textarea>
                    <br></br>
                    <button type = 'submit' className='button'>Submit</button>
                    <p id = 'error'></p>
                    
                </form>
                <p>Average Rating: {Avgrating.toFixed(2)}/5</p>

                <div>
                    <hr></hr>
                    <p>
                        {reviews && reviews.map((item, index) => {
                            return (
                                
                                <div className='review'>
                                    <p key={index} className='name'> {item.user} - {item.reviewdate}</p>
                                    <hr></hr> 
                                    <p key={index}><b>Rating:</b> {item.rating}/5</p>
                                    
                                    <p key={index} className='reviewcontent'> {item.reviewcontent} </p>
                                    <button className='button' onClick={handleDelete(item)}>Delete</button>
                                    <button className='button' onClick={handleEdit(item)}>Edit</button>
                                    

                                </div>
                            )

                        }
                        )}

                    </p>
            </div>
        </div>
    );
}

export default AvengersReviews;