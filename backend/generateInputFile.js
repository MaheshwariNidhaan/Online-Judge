const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirInputs = path.join(__dirname, "inputs"); //C:\Users\mahes\Desktop\Auth\backend\inputs

if (!fs.existsSync(dirInputs)) {
  //if path i.e., code folder deosnt exist in root directory then create it
  fs.mkdirSync(dirInputs, { recursive: true }); //if we do not use recursive:true it will throw an error if no directory exist at the specified path , but if we use recursive:true it will create a new directory instead of throwing error
}
//can also write a switch case here if you wish to make separate folders for each language
const generateInputFile = async (input) => {
  const jobID = uuid(); //everytime a unique string will be generated--->e730e468-f78e-4361-9cfb-317c32143f8f
  const input_filename = `${jobID}.txt`; //filename will be jobID+extention --->e730e468-f78e-4361-9cfb-317c32143f8f.cpp
  const input_filePath = path.join(dirInputs, input_filename); //C:\Users\mahes\Desktop\Auth\backend\codes\e730e468-f78e-4361-9cfb-317c32143f8f.cpp
  fs.writeFileSync(input_filePath, input); //without this codes path will not be created
  return input_filePath;
};

module.exports = {
  generateInputFile,
};
