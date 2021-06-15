import React from 'react'
import './Loader.scss';

export default function Loader() {
    return (
        <div className ="container-fluid m-0 loader-container">
        
                <div class="spinner-grow text-danger m-2 " role="status" >               
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark m-2" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-danger m-2"  role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark m-2" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-danger m-2" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark m-2" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-danger m-2" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                <span class="sr-only">Loading...</span>
                </div>
        </div>
    )
}
