
import { Box, Button, Container, Grid, Input, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherForecast from './Models/WeatherForecast';
import Logo from './assets/logo.png';
import ThermostatIcon from '@mui/icons-material/Thermostat';


function App() {

  const [weatherforecast, Setforecasts] = useState([{ date: '', temperature: 1, description: '' }]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchWeather('Hyderabad')
        .then((weatherData) => { if (mounted) { Setforecasts(weatherData) } })
        .catch((error) => console.error(error));
      mounted = false;
    }

  }, []);

  async function fetchWeather(location: string): Promise<WeatherForecast[]> {
    const API_KEY = '6557810176c36fac5f0db536711a6c52';
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(API_URL);
      const forecasts = response.data.list.slice(0, 5).map((item: any) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
      }));
      console.log(forecasts);
      return forecasts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const onKlickHandler = async (e: any) => {
    fetchWeather(e.target.value)
      .then((weatherData) => Setforecasts(weatherData))
      .catch((error) => console.error(error));
  }


  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '16px', sm: '22px', md: '26px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />
          </Box>
          <Input defaultValue="Hello world" inputProps={{ 'aria-label': 'description' }} onChange={onKlickHandler} />

        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '300px',
          }}
        >
          <Grid
            item
            container
            display="flex"
            flexDirection="column"
            xs={12}
            gap="4px"
          >
            {weatherforecast.map((item, idx) => {
              return (
                <Grid
                  item
                  key={idx}
                  xs={12}

                  alignItems="center"
                  sx={{
                    padding: '2px 0 2px',
                    background:
                      'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
                    boxShadow:
                      'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
                    borderRadius: '8px',
                  }}
                >
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'rows',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50%',
                        color: 'black',
                        gap: { xs: '3px', sm: '4px', md: '6px' },
                        width: '100%',
                      }}
                    >
                      <Paper>
                       
                        <Button variant="contained" color="secondary"> <ThermostatIcon sx={{ fontSize: { xs: '15px', sm: '16px', md: '18px' } }} /> temperature :  {item.temperature}</Button>
                        <Button variant="contained" color="primary"> Date :  {item.date}</Button>
                        <Button variant="contained" color="primary"> Description : {item.description}</Button>
                      </Paper>

                    </Box>

                  </Grid>


                </Grid>
              );
            })}

          </Grid>

        </Box>
      </Grid>
    </Container >
  );
}

export default App;
