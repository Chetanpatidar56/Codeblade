
const dotenv = require('dotenv');
dotenv.config();

const Doubtsolver = async (req, res) => {
  try {
    const { GoogleGenAI } = require("@google/genai");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

    const { messages, title, description, testcases, startcode } = req.body;
    
    // Get the last user message to understand the specific request
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    const userQuery = lastUserMessage ? lastUserMessage.parts[0].text.toLowerCase() : '';

    // Determine the response style based on user query
    let responseStyle = '';
    if (userQuery.includes('complete solution') || userQuery.includes('full code') || 
        userQuery.includes('solution in') || userQuery.includes('code in')) {
      responseStyle = 'Provide only the requested code solution without any explanations, hints, or additional sections.';
    } else if (userQuery.includes('hint') || userQuery.includes('suggestion')) {
      responseStyle = 'Provide only hints or suggestions without giving the complete solution.';
    } else if (userQuery.includes('explain') || userQuery.includes('how does') || 
               userQuery.includes('why') || userQuery.includes('what is')) {
      responseStyle = 'Provide a clear explanation focused specifically on what was asked.';
    } else if (userQuery.includes('review') || userQuery.includes('fix') || 
               userQuery.includes('error') || userQuery.includes('debug')) {
      responseStyle = 'Provide specific feedback on the code, pointing out issues and suggested fixes.';
    } else if (userQuery.includes('complexity') || userQuery.includes('time complexity') || 
               userQuery.includes('space complexity')) {
      responseStyle = 'Provide only the complexity analysis without other sections.';
    } else if (userQuery.includes('test case') || userQuery.includes('edge case')) {
      responseStyle = 'Provide only test cases or edge case explanations.';
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages,
      config: {
        systemInstruction: `You are an intelligent and helpful coding assistant designed to guide users through Data Structures and Algorithms (DSA) problems.

## Current Problem Context
[problem_title]: ${title}
[problem_description]: ${description}
[problem_testcases]: ${testcases}
[problem_startcode]: ${startcode}

## Response Guidelines
1. **Be Specific and Direct**: Answer only what is asked without adding unnecessary explanations or sections.
2. **Match Response to Query Type**: 
   - If asked for complete code, provide only the code with minimal comments.
   - If asked for hints, provide only hints without complete solutions.
   - If asked for explanation, provide only the explanation.
   - If asked for code review, provide specific feedback on the code.
3. **Avoid Boilerplate**: Do not include sections like "Understanding the Problem" or "Approach" unless specifically requested.
4. **Code Formatting**: When providing code, use appropriate Markdown formatting for the requested language.
5. **Conciseness**: Keep responses focused and avoid lengthy introductions or conclusions.

## Response Style Directive
${responseStyle || 'Provide a helpful response focused specifically on what the user asked.'}

## Important
- Do not provide complete solutions unless explicitly requested.
- Prioritize teaching and guiding over giving direct answers.
- Do not invent new constraints or change the original problem.
- Stay concise and directly address the user's query.`,
      },
    });

    res.status(201).json({
      message: response.text
    });

  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = Doubtsolver;