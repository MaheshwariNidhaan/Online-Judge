const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs"); //C:\Users\mahes\Desktop\Auth\backend\outputs

if (!fs.existsSync(outputPath)) {
  //if path i.e., outputs folder deosnt exist in root directory then create it
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0]; //e730e468-f78e-4361-9cfb-317c32143f8f.cpp -----> e730e468-f78e-4361-9cfb-317c32143f8f
  const outputFilename = `${jobId}.out`; //e730e468-f78e-4361-9cfb-317c32143f8f.exe
  const outPath = path.join(outputPath, outputFilename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
