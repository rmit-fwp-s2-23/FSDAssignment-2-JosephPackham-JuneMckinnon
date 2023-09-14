import React from 'react';
import '../css/moviegrid.css'
import barbie from '../images/Barbie.jpg';
import oppenheimer from '../images/Oppenheimer.jpg';
import lordoftherings from '../images/lordoftherings.jpg';
import avengers from '../images/avengersendgame_lob_crd_05.jpg';
import {useState} from "react";
import Modal from './modal.js';
import Barbiest from './sessiontimemodals/barbiest.js';
import Oppenheimerst from './sessiontimemodals/oppenheimerst.js';
import Lotrst from './sessiontimemodals/lotrst';
import Avengersst from './sessiontimemodals/avengersst';
import { useNavigate } from 'react-router';



//TO FIX: on laptop, session time modal shows underneath the search bar, you can only see the top if you go into full screen mode


const Movies = () => {
    const navigate = useNavigate();
    const [modals, setModals] = useState({ //set all modals to false
        oppenheimerst: false,
        barbiest: false,
        lotrst: false,
        avengersst: false,
    });

      const handleOpenModal = (modalId) => { //open the modal
        setModals({ //set all modals to true
        ...modals, 
          [modalId]: true, //set the modal to true
        });
    };
    
    const handleCloseModal = (modalId) => { //close the modal
        setModals({ //set all modals to false
        ...modals,
        [modalId]: false, //set the modal to false
        });
    };

    const handleReview = (movie) => { //open the review page
        if (movie == "oppenheimer") {
            navigate("/oppenheimerreview");
        } else if (movie == "avengers") {
            navigate("/avengersreview");
        } else if (movie == "barbie") {
            navigate("/barbiereview");
        }else if (movie == "lotr") {
            navigate("/lotrreview");
        }
    }




    return (
        <div>
            <div>
                <Modal isOpen={modals.barbiest} onClose={() => handleCloseModal('barbiest')}> {/* if modal is open, show the modal */}
                    <Barbiest />  {/* this is the content of the modal */}
                </Modal>

                <Modal isOpen={modals.lotrst} onClose={() => handleCloseModal('lotrst')}> 
                    <Lotrst />
                </Modal>
                <Modal isOpen={modals.oppenheimerst} onClose={() => handleCloseModal('oppenheimerst')}>
                    <Oppenheimerst />
                </Modal>
                <Modal isOpen={modals.avengersst} onClose={() => handleCloseModal('avengersst')}>
                    <Avengersst />
                </Modal>
            </div>


            {/*Oppenheimer */}
            <div className = 'grid-container'> 
            <div class="grid-item">
                <img className = "poster" src = {oppenheimer} alt = "Oppenheimer Poster" /> {/* poster */}
                <p className = "moviename" >Oppenheimer</p> {/* movie name */}
                <div className = 'sessiontimes'>  {/* session times */}
                    <button onClick={() => handleOpenModal('oppenheimerst')}>Sessions</button> {/* open modal */}
                    <button onClick={() => handleReview('oppenheimer')}>Reviews</button> 
                </div>
            </div>


            {/*Barbie */} 
            <div class="grid-item"> 
                <img className = "poster" src = {barbie} alt = "Barbie Poster" />  {/* poster */}
                <p className = "moviename" >Barbie</p>  {/* movie name */}
                <div className = 'sessiontimes'>   {/* session times */}
                    <button onClick={() => handleOpenModal('barbiest')}>Sessions</button>  {/* open modal */}
                    <button onClick = {() => handleReview('barbie')}> Reviews </button>
                </div>
            </div>


            {/*Lord of the Rings */}
            <div class="grid-item">  
                <img className = "poster" src = {lordoftherings} alt = "Lord of the Rings Poster" />  {/* poster */}
                <p className = "moviename" >The Lord of the Rings</p>  {/* movie name */}
                <div className = 'sessiontimes'>   {/* session times */}
                <button onClick={() => handleOpenModal('lotrst')}>Sessions</button>  {/* open modal */}
                <button onClick = {() => handleReview('lotr')}> Reviews </button>
                </div>
            </div>


            {/*Avengers */}
            <div class="grid-item">     
                <img className = "poster" src = {avengers} alt = "Avengers Poster" />  {/* poster */}
                <p className = "moviename" >Avengers</p>  {/* movie name */}
                <div className = 'sessiontimes'>   {/* session times */}
                    <button onClick={() => handleOpenModal('avengersst')}>Sessions</button>  {/* open modal */}
                    <button onClick = {() => handleReview('avengers')}> Reviews </button>
                    
                </div>
            </div>
        </div>

    </div>

    ); 
    

}

export default Movies;