const axios =require('axios');
const getlanguageById=(lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63,
        "python":71,
        "c":50
    }

    return language[lang.toLowerCase()];
}

const submitBatch=async(submissions)=>{


const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': '1c0d7d2a60msh771eadb2890af77p1aa529jsn07d46dfc49e9',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();
}
  

// const waiting =async(timer)=>{
//     setTimeout(()=>{
//         return 1;
//     },timer)
// };
const waiting = (timer) => new Promise(resolve => setTimeout(resolve, timer));

const submitToken=async(resultToken)=>{

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens:resultToken.join(','),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '1c0d7d2a60msh771eadb2890af77p1aa529jsn07d46dfc49e9',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true){

  const result=await fetchData();
  
  if (!result || !result.submissions) {
    console.error("Invalid token response:", result);
    throw new Error("Judge0 token fetch failed");
  }
const isResultObtained=result.submissions.every((r)=>r.status_id>2);
if(isResultObtained)
    return result.submissions;
    
await waiting(1000);
}

}

module.exports={getlanguageById,submitBatch,submitToken};