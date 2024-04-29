import React, { useState } from 'react'
import{ GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); // initialization
// function for text generation
async function GenText(promptprovided) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = promptprovided;  // hum prompt le rhe h 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }
  
  GenText();

// taking input 
const TextGen = () => {
    const[prompt,setprompt] = useState("");
    const[response,setResponse] = useState("")
    function handleChange(e){
        setprompt(e.target.value);
    }

    async function handleSubmit(){
        const generatedResponse = await GenText(prompt);
        setResponse(generatedResponse);
        console.log(response);

    }
  return (
    <div className='max-w-screen-xl mx-auto'>
        <h1 className='text-center text-4xl text-blue-900'>
            MY AI : Text Generation
        </h1>
        <div className='my-10 mx-auto max-w-screen-lg'>
        <label className='block my-4'htmlFor="Enter your prompt">Enter your prompt</label>
        <textarea rows={2} cols={150} type='text' onChange={(e)=>handleChange(e)}
        className='border rounded border-black'placeholder='Hi! '></textarea>
        <button className='block border rounded-lg border-black bg-blue-900 text-white
        px-2 my-1 mx-100'  onClick={handleSubmit}>Generate{""}</button>
        </div>
        <div className='my-4 max-w-screen-xl'>
            <p>{response}</p>

        </div>
    </div>
  )
}

export default TextGen