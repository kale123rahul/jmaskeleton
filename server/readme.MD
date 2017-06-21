# JMA
## JMA skeleton project
### Prerequisites

A Mongo server runing for local development i.e.:
 - Host : localhost
 - MONGO_PORT : 27017"
 - MONGO_DB : JmaSkeleton

Latest Typescript compiler  installed 

> npm install typescript -g


### Step 1: Install
> npm install

### Step 2: Build
Compile the server Typescript

> tsc

or in VSCode Command Panel -> Tasks: Run Build task

### Step 3 Compile client
Make sure the client project (./client) has been compiled with webpack to the folder './client/dist'

### Step 4 Run the server

> npm run server

or in VSCode: Command Panel -> Debug: Start Debugging

### Environment variable used

    // Node environment
    "NODE_ENV": "development", 

    // Database connection 
    "MONGO_HOST":"localhost", 
    "MONGO_PORT":"27017",
    "MONGO_DB":"JmaSkeleton",

    // App Http host and port
    "APP_PORT":"1339",
    "APP_HOST":"localhost"
