// const validator=require('validator');
// const validate=(data)=>{
//     const mandatoryfield=['firstname','emailId','password'];
//     const isallowed=mandatoryfield.every((k)=>Object.keys(data).includes(k));
//     if(!isallowed)
//     {
//         throw new Error("some missing field");
//     }
//     if(!validator.isEmail(data.emailId)){
//         throw new Error("Invalid email id");
//     }
//     if(!validator.isStrongPassword(data.password))
//     {
//         throw new Error("Weak Password");
//     }


// }
// module.exports=validate;
const validator = require("validator");

const validate = (data) => {
  const mandatoryFields = ["firstname", "emailId", "password"];
  
  // Check if all mandatory fields exist
  const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));
  if (!isAllowed) {
    return { error: "Some mandatory field is missing" }; // changed from throw to return
  }

  // Validate email
  if (!validator.isEmail(data.emailId)) {
    return { error: "Invalid email id" }; // changed from throw to return
  }

  // Validate password strength
  if (!validator.isStrongPassword(data.password)) {
    return { error: "Weak password. Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol" }; // changed from throw to return
  }

  return { error: null }; // no errors
};

module.exports = validate;
