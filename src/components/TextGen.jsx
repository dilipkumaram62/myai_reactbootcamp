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
    const[response,setResponse] = useState("");
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
        <textarea  name="promptText" id="promptText" cols="30" rows="5" onChange={(e)=>handleChange(e)}  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
         placeholder='Hi!'></textarea>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1
         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 my-4" onClick={handleSubmit}>Generate{""}</button>
        </div>
        <section class="max-w-4xl mx-auto p-4"><h4 class="text-xl font-bold py-2"></h4><article class="text-lg"><p class="text-lg py-2"></p></article></section>
        
        <div className='my-4 max-w-screen-xl'>
            <p>{response}</p>

        </div>
    </div>
  )
}

export default TextGen;
