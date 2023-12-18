import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Images from '../images/Images';
import Loader from '../../utils/loader/Loader';

function Content() {
  
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(false)
  const [searchText,setSearchText]=useState('')
  const [searchResult,setSearchResult]=useState([])
  
 
  const fetchPosts = async () => {
    try {

      setLoading(true)
      const response = await axios.get('http://localhost:3000/api/v1/post/getPosts');
      
      if(response.status===200){
      setPosts(response.data.reverse());
      console.log('data fetched')
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally{
      setLoading(false)
    }
  };

 

  useEffect(() => {
    fetchPosts()
  }, []);


  const handleSearchText=(e)=>{
    
    setSearchText(e.target.value)
    
  }

  useEffect(()=>{
    const words=searchText.toLowerCase().split(' ')
    const filterPosts=posts.filter((post)=> words.every((word)=>post.name.toLowerCase().includes(word.toLowerCase()) || post.prompt.toLowerCase().includes(word.toLowerCase())))
    setSearchResult(filterPosts)
  },[searchText])

  useEffect(()=>{
    console.log(searchResult)
  },[searchResult])
  
  return (
    <div className='px-2 sm:px-32 bg-black min-h-[100vh] mt-12 pb-10'>
      <div className='pt-8 font-bold text-[24px] text-white' >
        The Community Showcase
      </div>
      <div className='text-sm text-gray-400 mt-2'>
      Dive into a world of AI artistry! Browse our ImageAI gallery now...
      </div>
      <div className='mt-10 text-md  text-gray-200'> 
        Search images
      </div>
      <div className='w-full mt-2'>
        <input type="text" className='w-full outline-none h-[30px] bg-gray-100 border border-solid border-gray-300 px-2 text-sm rounded-sm' style={{caretColor:'gray'}}
        placeholder='Search something...'
        name='serchText'
        value={searchText}
        onChange={handleSearchText}
        />
        
        {
          loading ? (
            <div className='flex items-center justify-center top-10'><Loader/></div>
          ):(
            <>
            {
              searchText  && ( 
                <div className='font-medium text-[#666e75] text-xl mb-3 mt-4'>
                  <p>Showing results for <span className='text-[#222328]'>{searchText}</span></p>
                </div>
              )
            }
             {
               searchText ?(
                  <Images posts={searchResult}/>
                  ):(
                      <Images posts={posts}/>
                  )
              }
             
            
            </>
           
          )
        }
      </div>

      
    </div>
  )
}

export default Content
