FROM node:20-alpine 
# Base image(kis type ka container ka base hoga)   alpine is a linux flavour (lighter version of node 18...remove some extra packages)
WORKDIR /app
#working directory (code is stored )
RUN apk update && apk add --no-cache g++
COPY package.json . 
#this is for caching(optimization)
RUN npm install
COPY . .
# <localhost> <container> first . represents localhost ka file structure(not frontend bas root ke andar ka)
# second dot repesents container ki working directory which we have already defined in line 3
EXPOSE 5000
#Expose the port on which application is running 
CMD ["node", "index.js"]
##CMD or ENTRYPOINT mean the same...CMD means command
