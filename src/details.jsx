import React, { useState, useEffect } from "react";

export default function DetailBox({movie, onClose}) {
    const [isOpen, setIsOpen] = useState(true);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (movie && movie.imdbID) {
            console.log("movie.Title")
            fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apikey=69017a0d`)
                .then(response => response.json())
                .then(data => {
                    setMovieDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        }
    }, [movie]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm z-40 flex justify-center items-center">
                    <div className="ring-1 ring-gray-400 h-[600px] w-[900px] bg-gray-800 bg-opacity-30 backdrop-blur-2xl shadow-lg rounded-lg relative detail-box-content">
                        
                        <button
                            className="absolute top-2 right-2 text-gray-300 hover:text-white focus:outline-none"
                            onClick={()=>{handleClose; onClose();}}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                {movieDetails && (
                    <div className="p-4">
                        <h2 className="text-xl font-bold">{movieDetails.Title}</h2>
                        <p className="text-gray-400">Year: {movieDetails.Year}</p>
                        <p className="text-gray-400">Rated: {movieDetails.Rated}</p>
                        <p className="text-gray-400">Runtime: {movieDetails.Runtime}</p>
                        <p className="text-gray-400">Genre: {movieDetails.Genre}</p>
                        <p className="text-gray-400">Director: {movieDetails.Director}</p>
                        {/* Add more details as needed */}
                        </div>
                )}
                    </div>
                </div>
            )}
        </>
    );
}
