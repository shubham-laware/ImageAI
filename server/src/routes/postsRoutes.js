import express from 'express';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import { Router } from 'express';
import { Post } from '../mongodb/model/posts.model.js';

dotenv.config();

const router=Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})


router.route('/').get((req,res)=>{
    res.send('Post route connected')
})


router.route('/').post(async(req,res)=>{
    
    try {
        const formData= req.body;
    if(formData.photo){

        const cloudinaryResponse= await cloudinary.uploader.upload(formData.photo,{
            folder:'Ai-Images'
        })
        
        const image_url=cloudinaryResponse.secure_url;
        console.log(image_url)

        const post= new Post({
            name:formData.name,
            prompt:formData.prompt,
            photo:image_url
        })

        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    }else{
        res.status(400).json({ error: 'Photo is required' })
    }
    console.log(formData)
    } catch (error) {
        console.log('POST ROUTES ERROR : ',error)
    }
})

router.route('/getPosts').get(async (req,res)=>{

    try {
        const allPosts= await Post.find();
        res.status(200).json(allPosts)
        
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;
