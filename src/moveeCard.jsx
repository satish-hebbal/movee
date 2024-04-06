import React, { useRef, useState } from "react";
import './App.css'


export default function Card(props){

    const[favToggle, setFavToggle] = useState(false)

    return(
        <div className="movie-card flex bg-purple-200 h-72 w-52 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={props.poster} className="poster rounded-lg w-full h-full object-cover" />
                    <div className="info-card text-white rounded-lg">
                         <div onClick={()=>{
                            props.addFav(props.movieObj)
                         }} className="flex items-center justify-center absolute top-0 h-10 right-2 cursor-pointer px-2 py-1 shadow-lg shadow-black active:bg-red-700 transition-bg duration-50 ease-in-out bg-red-950 bg-opacity-50 rounded-full ">
                            <span className=" material-icons fill-current orange600 material-symbols-outlined">favorite</span>
                             </div>
                             
                            <h3 className="font-bold text-lg">{props.title}</h3>
                            <p className="text-sm">Comedy</p>
                            <div className="flex w-full justify-between">
                                <p>Hindi</p>
                                
                                <p className="text-yellow-300">Ratingsc807</p>
                            </div>
                    
                    </div>
        </div>
    )
}