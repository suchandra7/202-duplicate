import React, { useState } from 'react';
import axios from 'axios';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import a1 from '../images/a1.jpg';



function Home() {

    return (
        <div >
            <div className='row center'>
                <h1>
                    The Gold's gym
                </h1>
            </div>
            <div className='row'>
                <div className='col-9 offset-1'>
                <p>
                    Welcome to our gym! Our mission is to help you achieve your fitness goals in a supportive and motivating environment.
                    With state-of-the-art equipment, a variety of classes, and experienced personal trainers,
                    we have everything you need to take your fitness to the next level. Whether you're looking to lose weight,
                    build muscle, or simply improve your overall health and well-being, we're here to help you succeed. Join us
                    today and start your journey towards a healthier, happier you!
                </p>
                </div>
               
            </div>
            <div className='row center'>
                <h1>Avilable memberships</h1>
            </div>
            <div className='row memberships'>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img className='membership-card' src={img1} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img src={img2} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card text-bg-dark">
                        <img src={img3} class="card-img" alt="..." />
                        <div class="card-img-overlay">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row center'>
                <h1>
                    Types of classes available
                </h1>
            </div>
            <div className='row'>
                <div className='col-3'>
                    <div class="card actvity">
                        <img src={a1} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Boxing</h5>
                            <p class="card-text">Best boxing class in town</p>
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div class="card actvity">
                        <img src={a1} class="card-img-bottom" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Boxing</h5>
                            <p class="card-text">Best boxing class in town</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;