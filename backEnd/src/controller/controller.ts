import express, { Request, Response } from 'express';
import axios from 'axios';
import ICountries from '../interface/CountriesInterface';
import IWeather from '../interface/WeatherInterface';

class Controller {
  async getAllCountries(req: Request, res: Response) {
    try {
      const response: ICountries = await axios.get('https://restcountries.com/v3.1/all');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error trying to get countries datas' });
    }
  }

  async getWeatherData(req: Request, res: Response) {
    const cityName = req.query.capital;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=080bd2a75c46d442c8f7255a11386c69&units=metric`
      );
      const apiResponse = response.data;
      res.json(apiResponse);
    } catch (err) {
      res.status(500).json({ error: 'Error trying to get the weather' });
    }
  }
}

export default Controller;
