import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config();

const organinztionKey=process.env.ORGANIZATION_ID

const openai = new OpenAI(
    {
        organization:organinztionKey,
    }
    
);

async function generateImage(){
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
          });
          const image_url=response.data[0].url
          return  image_url;
    } catch (error) {
        console.log(error)
    }
}


export default generateImage;

