const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes"); //C:\Users\mahes\Desktop\Auth\backend\codes

if (!fs.existsSync(dirCodes)) {
  //if path i.e., code folder deosnt exist in root directory then create it
  fs.mkdirSync(dirCodes, { recursive: true }); //if we do not use recursive:true it will throw an error if no directory exist at the specified path , but if we use recursive:true it will create a new directory instead of throwing error
}
//can also write a switch case here if you wish to make separate folders for each language
const generateFile = async (language, code) => {
  const jobID = uuid(); //everytime a unique string will be generated--->e730e468-f78e-4361-9cfb-317c32143f8f
  const filename = `${jobID}.${language}`; //filename will be jobID+extention --->e730e468-f78e-4361-9cfb-317c32143f8f.cpp
  const filePath = path.join(dirCodes, filename); //C:\Users\mahes\Desktop\Auth\backend\codes\e730e468-f78e-4361-9cfb-317c32143f8f.cpp
  await fs.writeFileSync(filePath, code); //without this codes path will not be created
  return filePath;
};

module.exports = {
  generateFile,
};
