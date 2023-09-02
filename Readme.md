# CSV Upload Project

The CSV Upload project is a web application that allows users to upload CSV files, view and search through the uploaded CSV data, and view all the data inside the csv file.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Features

- **CSV File Upload:** Users can upload CSV files to the application.

- **CSV File Search:** User can search the CSV files using filename and file id

- **View and Search:** Uploaded CSV files can be viewed in a tabular format


## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.

- [MongoDB](https://www.mongodb.com/) installed and running locally or at a remote server.

### Installation

#### Install dependencies
1. Multer for handing file upload
```
npm install --save multer
```
2. Mongoose for handing mongo db
```
npm install mongoose
```
3. express
```
npm install express
```
4. nodemon
```
npm install nodemon
```
5. ejs
```
npm install ejs
```
6. express-ejs-layouts
```
npm install express-ejs-layouts 
```
7. dotenv
```
npm install dotenv
```
8. csv-parser [doc](https://www.npmjs.com/package/csv-parser)
```
npm install csv-parser
```

#### Start the application:
```
npm start
```

## Usage
1. Access the web application by opening a web browser and navigating to http://localhost:8000.
2. Upload CSV files using the provided form.
3. View the Uploaded CSV files
4. Search the CSV file based on there id and name
5. View the data of the CSV file


## Deployment

[Deployed link](https://csv-upload-fnoi.onrender.com/)
