import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function App() {
  const [pm25, setPm25] = useState(14);
  const [aqi, setAqi] = useState(7);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await axios.get(`/backend`);
      setAqi(response.data[3]["sensors"][3]["value"])
      setPm25(response.data[14]["sensors"][0]["value"])
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAQI = (pm25) => {
    if (pm25 <= 12) {
      return Math.round((50 / 12) * pm25);
    } else if (pm25 <= 35.4) {
      return Math.round((100 / 23.4) * (pm25 - 12) + 50);
    } else if (pm25 <= 55.4) {
      return Math.round((100 / 20) * (pm25 - 35.4) + 100);
    } else if (pm25 <= 150.4) {
      return Math.round((100 / 95) * (pm25 - 55.4) + 200);
    } else if (pm25 <= 250.4) {
      return Math.round((100 / 100) * (pm25 - 150.4) + 300);
    } else if (pm25 <= 350.4) {
      return Math.round((100 / 100) * (pm25 - 250.4) + 400);
    } else if (pm25 <= 500.4) {
      return Math.round((100 / 150) * (pm25 - 350.4) + 500);
    } else {
      return 500;
    }
  };

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "10%",
            alignItems: "center",
            justifyContent: "space-evenly",
            mt:3,
          }}
        >
          <Typography variant="h3" component="div" gutterBottom>
            空气质量
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "90%",
            alignItems: "center",
            justifyContent: "space-evenly",
            boxSizing: "border-box",
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "33.33%",
              m: 0,
              p: 0,
            }}
          >
            <Typography variant="h7" component="div" gutterBottom>
              室内PM2.5
            </Typography>
            <Typography variant="h7" component="div" gutterBottom sx={{ mt: 0, mb:5}}> 
              细粒颗物
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
              {pm25}
            </Typography>
            <Typography variant="h7" component="div" gutterBottom>
              ug/m³
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "33.33%",
              m: 0,
              p: 0,
            }}
          >
            <Typography variant="h7" component="div" gutterBottom>
              室外PM2.5
            </Typography>
            <Typography variant="h7" component="div" gutterBottom sx={{ mt: 0, mb:5}}> 
              细粒颗物
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
            {Math.round(pm25*1.223)}
            </Typography>
            <Typography variant="h7" component="div" gutterBottom>
              ug/m³
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "33.33%",
              mb: 2,
              p: 0,
            }}
          >
            <Typography variant="h7" component="div" gutterBottom>
              室内AQI
            </Typography>
            <Typography variant="h7" component="div" gutterBottom sx={{ mt: 0, mb:5}}> 
              空气质量
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
              {aqi}
            </Typography>
          
          </Box>



        </Box>
      </Box>
    </div>
  );
}

export default App;
