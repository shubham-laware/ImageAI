import dotenv from 'dotenv'
import { Router } from 'express';
import OpenAI from 'openai';


dotenv.config();
const organinztionKey=process.env.ORGANIZATION_ID
const openai = new OpenAI(
    {
        organization:organinztionKey,
    }
    
);



const router=Router();  

router.route('/').get((req,res)=>{
    res.send('DALL-E connected')
})

router.route('/').post(async (req,res)=>{
    try {
       const {prompt}=req.body

       const aiResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,  
        quality:"hd",
        size: "1024x1024",
       })

       const image_url=aiResponse.data[0].url

       res.status(200).json({photo:image_url})
       
       

    } catch (error) {
        console.log('DALLE-E ERROR: ',error);
    }
     
    
})


export default router;