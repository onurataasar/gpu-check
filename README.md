# gpu-checker

# GPU Monitoring Application

This application monitors the graphics processing units (GPUs) of the local machine. It displays information such as vendor, model, VRAM, GPU utilization, and memory usage. The application fetches data from a backend server that uses the `systeminformation` library to retrieve GPU details.

## Features

- Displays a list of all detected GPUs with their specifications.
- Highlights the active GPU based on the highest utilization.
- Dynamically updates GPU utilization and memory usage at regular intervals.
- Gracefully handles cases where GPU utilization data is unavailable.

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, systeminformation
- **Styling**: CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/onurataasar/gpu-check.git

   ```

2. Navigate to the project directory:
   ```bash
   cd gpu-check
   ```

### Server Installation

3. Navigate to the server directory:

   ```bash
   cd server
   ```

4. Install server dependencies:

   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Client Installation

6. Open a new terminal and navigate to the client directory:

   ```bash
   cd client
   ```

7. Install client dependencies:

   ```bash
   npm install
   ```

8. Start the client:
   ```bash
   npm run dev
   ```
