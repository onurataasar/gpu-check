import './App.css'

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

interface GPUController {
  vendor: string
  model: string
  vram: number
  utilizationGpu: number // Optional, as it might not be available for some GPUs
  memoryUsed?: number
  memoryTotal?: number
  temperatureGpu?: number
}

function App() {
  const [gpuControllers, setGpuControllers] = useState<GPUController[]>([])
  const [loading, setLoading] = useState(true)
  const isFetching = useRef(false) // Track whether a request is currently pending

  // Function to fetch GPU info
  const fetchGpuInfo = async () => {
    if (isFetching.current) {
      return // Don't make a new request if one is in progress
    }

    isFetching.current = true // Mark as fetching

    try {
      const response = await axios.get('http://localhost:5000/gpu')
      console.log('GPU Data:', response.data)
      setGpuControllers(response.data.controllers || []) // Ensure we have controllers array
    } catch (error) {
      console.error('Error fetching GPU data:', error)
    } finally {
      isFetching.current = false // Mark as not fetching when request completes
      setLoading(false)
    }
  }

  // Initial fetch and periodic polling
  useEffect(() => {
    fetchGpuInfo() // Initial data fetch

    // Set up polling every 5 seconds for dynamic updates
    const intervalId = setInterval(fetchGpuInfo, 2500)

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!loading && !gpuControllers.length) {
    return <div>No GPU information available.</div>
  }

  // Determine the active GPU based on the highest utilization
  const activeGPU = gpuControllers.reduce((prev, curr) =>
    (curr.utilizationGpu || 0) > (prev.utilizationGpu || 0) ? curr : prev,
  )

  return (
    <div className="gpu-container">
      <h1>Graphics Cards</h1>
      <div className="gpu-list">
        {gpuControllers.map((gpu, index) => (
          <div
            key={index}
            className="gpu-card"
            style={{
              opacity: gpu.model === activeGPU.model ? 1 : 0.5, // Dim inactive GPUs
              border:
                gpu.model === activeGPU.model ? '2px solid green' : 'none', // Highlight active GPU
            }}>
            <h2>{gpu.vendor}</h2>
            <p>
              <span>Model:</span> {gpu.model}
            </p>
            <p>
              <span>VRAM:</span> {gpu.vram} MB
            </p>
            {gpu.utilizationGpu > 0 ? (
              <p>
                <span>GPU Utilization:</span> {gpu.utilizationGpu}%{' '}
                {gpu.model === activeGPU.model && <strong>(Active)</strong>}
              </p>
            ) : (
              <p>GPU Utilization: N/A</p> // Handle if utilization is missing
            )}
            {gpu.memoryUsed !== undefined || gpu.memoryTotal !== undefined ? (
              <p>
                <span>Memory Used:</span> {gpu.memoryUsed} MB /{' '}
                {gpu.memoryTotal} MB
              </p>
            ) : (
              <p>Memory Used: N/A</p> // Handle if memory used is missing
            )}
            {gpu.temperatureGpu !== undefined ? (
              <p>
                <span>Temperature:</span> {gpu.temperatureGpu} °C
              </p>
            ) : (
              <p>Temperature: N/A</p> // Handle if temperature is missing
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
