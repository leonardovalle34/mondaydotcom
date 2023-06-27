import {Router} from "express";
import Controller from "./controller/controller";

const useController = new Controller
const router = Router();

router.get("/countries", useController.getAllCountries)
router.get("/weather" , useController.getWeatherData)

export default router