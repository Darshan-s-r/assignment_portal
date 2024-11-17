* how to run the project
  step1 : clone the repository   or  download the zip file from github
  step2 : Install Dependencies (npm install)
  step3 : configure the environment
          1. Create a .env file in the root directory of the project.
          2. Add the following variables to the .env file.
            MONGO_URI=mongodb://localhost:27017/assignmentPortal
            JWT_SECRET=your_jwt_secret
            PORT=5000
  step4 :  Start MongoDB server
  step5 :  Run the Server  (npm run dev) 
           server will start and log the following message
           MongoDB connected...
           Server is running on http://localhost:5000