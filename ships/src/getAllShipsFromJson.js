import fetch from 'node-fetch'
import fs from 'fs'
import ships from './ships.json'

const getAllShipsFromJson = ships;

export default getAllShipsFromJson
export { getAllShipsFromJson as getAllShipsFromJson }