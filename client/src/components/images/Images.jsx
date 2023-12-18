import React, { useEffect, useState } from "react";
import FileSaver from 'file-saver'

function Images({posts}) {

  const handleDownload= (_id,photo)=>{
    FileSaver.saveAs(photo,`download-${_id}.jpg`)
  }

  return (

    <section className=" mt-10 grid lg:grid-cols-4 sm:grid-cols-2  grid-cols-1 gap-3">
      {posts.map((post,index)=>{
        return (
        <div className="border " key={index}>
          <div className=" group w-full  h-full relative ">
            <img src={post.photo} alt="img" className="w-full h-full object-fill "/>
            <div className=" hidden group-hover:flex flex-col gap-2 border border-solid border-black absolute bottom-0 left-0 right-0 m-2 p-2 text-justify bg-[#10131f]  rounded-md ">
            <p className="text-white text-sm overflow-y-auto ">{post.prompt}</p>
            <div className="  flex  items-center justify-between">
              <div className="flex items-center  gap-2 ">
              <div className="text-white text-sm  w-7 h-7 flex justify-center items-center rounded-full bg-green-700 ">
              {post.name[0]}
            </div>
            <p className="text-white text-sm">{post.name}</p>
             </div>
            <div className="h-7 w-7 cursor-pointer">
              <button onClick={()=>handleDownload(post._id,post.photo)}>
              <img src="download.svg" alt="D"  className="text-white text-sm"/>
              </button>
            </div>
            </div>
            
          </div>  
          </div>
          
        </div>
        )
      })}
    </section>
    

  );
}

export default Images;
