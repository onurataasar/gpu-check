// server.js
const express = require("express");
const si = require("systeminformation");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/gpu", async (req, res) => {
  try {
    const gpuData = await si.graphics();

    // Ensure utilizationGpu is not null or undefined
    const controllers = gpuData.controllers.map((controller) => ({
      ...controller,
      utilizationGpu: controller.utilizationGpu ?? 0, // Default to 0 if utilizationGpu is null or undefined
    }));

    res.json({ controllers }); // Return the modified controllers array
  } catch (error) {
    res.status(500).send("Error fetching GPU data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
