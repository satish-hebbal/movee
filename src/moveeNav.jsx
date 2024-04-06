import React from "react";

export default function Nav(props){
    return(
        <nav className=" px-20 py-4 items-center flex justify-between text-white">
            <h1>movee</h1>
            <input type="search" className="rounded-full flex items-center text-black min-w-[500px] h-8 px-2 " placeholder="try Star Wars..." onChange={props.handleSearch}/>
        </nav>
    )
}