# **Webcode: Online Judge Platform**

Welcome to Webcode, an online coding platform designed to help users practice coding and track their progress. Built with the MERN stack (MongoDB, Express, React, Node.js), Webcode provides a seamless and interactive experience for coders of all skill levels.


## **Features**

### **User Management**
- **User Registration and Authentication**: Secure user registration and login using JWT tokens.
- **Roles**: Distinct roles for Users and Admins, each with specific capabilities.

### **Admin Tools**
- **Problem Administration**: Add, edit, and delete coding problems.
- **Test Case Management**: Admin can edit sample test cases and add/delete hidden test cases for a particular problem.

### **Problem Management**
- **Problem List**: A curated list of coding problems, with their difficulty levels displayed.
- **Detailed Problem Statements**: Comprehensive problem descriptions with input/output specifications and sample test cases.
- **Hidden Test Cases**: User's code is run against sample(visible to the user) and hidden test cases.

### **Code Submission**
- **Online Code Editor**: Write, edit, and submit code in the platform (Ace editor)
- **Code Execution**: Secure and isolated code execution environment powered by Docker.
- **Verdict System**: Automatic evaluation of submissions with verdicts including:
  - **Accepted**: Code meets all requirements.
  - **Wrong Answer**: Code produces incorrect output.
  - **Compilation Error**: Code fails to compile.

### **Upcoming Features**
- **Submissions feature**: Real-time submission details of a problem (In Development).

## **Tech Stack**

### **Frontend**
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/92b646ee-efae-47f2-85b1-c5598185a2c1)

React: JavaScript library for building responsive user interfaces.


### **Backend**
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/8fca7112-d442-4fc1-830f-40998b122c41)


- **Express.js**: Web framework for handling requests and routing.

![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/4ccf2319-f435-4b09-8169-7f7a9e3b94b0)
  

- **Node.js**: Scalable JavaScript runtime for server-side logic.

### **Database**
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/5484fa2a-11fd-478a-8321-2b9f526f4154)


- **MongoDB**: NoSQL database that stores data in JSON like documents unlike relational databases which uses tables and rows.
  
  Stored user data, problem details and submissions.

### **Security and Containerization**
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/dd7ad125-51f3-483c-b3c1-a21644433319)


- **JWT Authentication**: Secure authentication mechanism.

![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/2192d77e-2dc3-40ad-8b78-8974025731cd)


  

- **Docker**: Allows developers to easily create, run and deploy applications through containers. Conatiners package all the necessary code,     
  library and dependencies.

  Advantages of using docker in Online Judge :
  1) Isolation :  Docker containers provide a way to isolate the execution environment of the submitted code. This ensures that the code runs in a controlled environment without affecting the   
     host system.

  2) Security : Docker containers can be configured to restrict access to system resources, reducing the risk of malicious code harming the server or accessing sensitive information.

  3) Consistency : Docker allows online judges to provide a consistent execution environment regardless of the underlying infrastructure. This ensures that submissions behave predictably across 
  different servers and environments.

  4) Dependency Management : Docker containers can include specific versions of programming languages, libraries, and dependencies required for code execution. This eliminates issues related to 
  version compatibility and ensures that the code runs as expected.

  5) Scalability : Docker containers can be easily scaled up or down based on demand. This allows online judges to handle a large number of submissions efficiently, distributing the workload 
     across multiple containers.



### **Deployment**
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/afe8f428-aa65-4652-bcdb-f1ae1c3a4cfc)
![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/878dccef-2ca8-402a-b64f-40badaadbe9c)
![Screenshot (424)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/24358fd1-41c0-428e-aed7-4b14a06058ba)




- **AWS ECR**: Container registry for Docker images.
  Pushed my docker image on AWS ECR.
- **AWS EC2**: Backend deployment for scalable performance.
  Created an EC2 linux instance(t2.micro, 1vCPU, 1 GiB Memory) and then fetched the image on EC2 linux instance and run it on the instance.


  ![image](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/a8ff1964-e8e9-4303-aa2c-4205a9f3175f)
  

- **Vercel**: Frontend deployment for ease and efficiency.

<!--## **Demo**
[Live Demo](#) (Link to your deployed application)  -->

## **A video of me explaining my project through loom.ai**
https://www.loom.com/share/1cd3c67fbce849adae68b9274cae7f34


## **Screenshots**
1. Login Page

   
![Screenshot (411)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/84b9d60f-19a7-481f-a908-8df607514183)

2. Signup Page


![Screenshot (412)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/c1de601a-84d5-4282-9421-a706d6156bc6)

3. About Page for both Users and Admins

   
![Screenshot (413)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/4f49266c-921c-4a5a-87d3-08fc9432b211)

4. Problems Page for Normal Users

   
![Screenshot (414)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/cfdc175b-afae-4329-bb92-7f93560b1784)

5. Problem solving page with code editor for both Normal Users and Admins

   
![Screenshot (415)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/a0fc47ab-2480-4bcd-bcbe-15c50763f798)

6. Verdict being displayed after problem submission

   
![Screenshot (416)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/ee3814dd-eba4-4854-b7d3-d4b34c2a45b4)

7. Problem Page for Admin (for adding, updating or deleting a problem for the Normal User)


![Screenshot (417)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/bd903b8b-f768-406d-a534-b687786e0b05)

8. Page for adding a problem


![Screenshot (418)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/baac1802-90b9-4ee3-a61d-925fc459cda0)

9. Page for editing an existing problem


![Screenshot (419)](https://github.com/MaheshwariNidhaan/Online-Judge/assets/133689983/a82938a8-5712-4cbd-b87a-8ab4b0886c27)

