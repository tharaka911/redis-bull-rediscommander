const express = require('express');
const Queue = require('bull');


const app = express();
const port = 3000;

// Create a Bull queue named "dataQueue"
const dataQueue = new Queue('dataQueue', {
  redis: {
    // Set your Redis configuration here
    host: 'localhost', // Change this to your Redis host
    port: 6379, // Change this to your Redis port
  },
});

// Endpoint to add data to the queue
app.post('/adding-data', async (req, res) => {
  try {
    const data = req.body; // Assuming you'll be sending JSON data in the request body

    // Add data to the queue
    await dataQueue.add(data);

    res.status(200).json({ message: 'Data added to the queue' });
  } catch (error) {
    console.error('Error adding data to the queue:', error);
    res.status(500).json({ error: 'An error occurred while adding data to the queue' });
  }
});


// process data from the queue
dataQueue.process(async (job) => {
  try {
    const data = job.data; // Data passed to the job as an argument

    // Do something with the data
    // For example, send it to a database
    // Or send it to an API
    // Or send it to another queue

    console.log('Data received:', data);
  } catch (error) {
    console.error('Error processing data:', error);
  }
});

 
// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
