import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

// Generate content using the Gemini API
export const generateContent = async (prompt) => {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    // Configure generation parameters
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };
    
    // Generate content
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig,
    });

    // Return the generated text
    return result.response.text();
  } catch (error) {
    console.error("Error in generateContent:", error);
    
    // Provide more specific error messages based on the error type
    if (error.message.includes('API key')) {
      throw new Error("Invalid API key. Please check your .env file.");
    } else if (error.message.includes('quota')) {
      throw new Error("API quota exceeded. Please try again later.");
    } else {
      throw new Error("Failed to generate content. " + error.message);
    }
  }
};

// Function to generate content with an image
export const generateContentWithImage = async (prompt, imageFile) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    // Convert the image file to a base64 data URI
    const imageAsBase64 = await fileToGenerativePart(imageFile);
    
    const result = await model.generateContent({
      contents: [{
        parts: [
          { text: prompt },
          imageAsBase64
        ]
      }]
    });
    
    return result.response.text();
  } catch (error) {
    console.error("Error in generateContentWithImage:", error);
    throw new Error("Failed to generate content with image: " + error.message);
  }
};

// Helper function to convert file to GenerativePart
async function fileToGenerativePart(file) {
  const base64EncodedData = await readFileAsDataURL(file);
  return {
    inlineData: {
      data: base64EncodedData.split(',')[1],
      mimeType: file.type
    }
  };
}

// Helper function to read file as data URL
function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}