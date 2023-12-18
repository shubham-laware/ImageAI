import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../utils/loader/Loader";

function Create() {
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.prompt) {
      try {
        const response = await axios.post(
          "https://imageai-bibr.onrender.com/api/v1/dalle",{ prompt: form.prompt }
        );
        const image_url = response.data.photo;
        setForm({ ...form, photo: image_url });
        setLoading(false);
      } catch (error) {
        console.log("AXIOS fetchError: ", error);
        setLoading(false);
      }
    } else {
      alert("Prompt required !!");
      setLoading(false)
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://imageai-bibr.onrender.com/api/v1/post", form);
      navigate("/");
    } catch (error) {
      console.log("COMMUNITY SHARE ERROR: ", error);
    }
  };

  return (
    <form
      className=" px-2 sm:px-32 bg-black h-[100vh-60px] mt-12 pb-10"
      onSubmit={handleShare}
    >
      <div className=" mt-10 pt-8 flex flex-col  gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold text-white ">Your Name</p>
          <input
            type="text"
            className="w-full outline-none h-[30px] bg-gray-100 border border-solid border-gray-300 px-2 text-sm rounded-sm"
            style={{ caretColor: "gray" }}
            name="name"
            placeholder="John"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-md font-bold text-white ">Prompt</p>
          <input
            type="text"
            className="w-full outline-none h-[30px] bg-gray-100 border border-solid border-gray-300 px-2 text-sm rounded-sm"
            style={{ caretColor: "gray" }}
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase"
            value={form.prompt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-2">
          <div className="  flex flex-col items-center sm:items-start  gap-2">
          <div className="border border-solid border-gray-300 h-[250px] w-[250px] rounded-lg outline-none">
          {
            loading ?(
              <div className="flex h-full justify-center items-center">
                <Loader/>
              </div>
              
            ):(
              form.photo ? (
                <img
                src={form.photo}
                alt="image"
                className="w-full h-full object-fill rounded-lg"
                />
              ) : (
              <img
                src="preview-img.svg"
                alt="image"
                className="w-full h-full object-fill rounded-lg"
              />
          )
            )
          }
          
          </div>
            <button
              className="border border-solid border-gray-100 h-[40px] w-[250px] rounded-md hover:bg-gray-200 hover:text-black text-white "
              onClick={generateImage}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-start ">
          <p className="text-sm text-gray-400 mt-2 mx-2 sm:mx-0 ">
            ** Once you have generate image you can share it with others in the
            community **
          </p>
          <button
            className="border border-solid border-gray-300 h-[40px] text-sm w-[250px] rounded-md hover:bg-gray-200 hover:text-black text-white  "
            type="submit"
          >
            Share with the Community
          </button>
        </div>
        <div className=" text-sm text-gray-500 mt-2">
          NOTE: If the image is not generated don't be upset, as the FREE TIER service has been used for this.
        </div>
      </div>
    </form>
  );
}

export default Create;
