// import { getShip } from 'azur-json/ships/getShip'
let { getShip } = require("../ships/getShip")

// const getShipApi = require('azur-json/ships/getShip')
let getShipApi = require("../ships/getShip")

// const shipsAPI = require('azur-json/ships')
let shipsAPI = require("../ships")

// const api = require('azur-json')
let api = require("../index.js")

// import { getShipByName } from 'azur-json'
let { getShipByName } = require("../index.js")

// import { ships } from 'azur-json'
let { ships } = require("../index.js")

describe("Get ship module", () => {
    test('should be able to export the function with deconstruction and work well', () => {
        expect(getShip('belfast')).toBeTruthy()
        expect(getShip('belfast').id).toBe('115')
    })
    test('should be able to export by default the function and work well', () => {
        expect(getShipApi.getShip('belfast')).toBeTruthy()
        expect(getShipApi.getShip('belfast').id).toBe('115')
    })
    test('should be able to export the function in ships/index.js and work well', () => {
        expect(shipsAPI.getShip('belfast')).toBeTruthy()
        expect(shipsAPI.getShip('belfast').id).toBe('115')
    })
    test('should be able to export the function in ships/index.js as \'getShipByName\' alias and work well', () => {
        expect(shipsAPI.getShipByName('belfast')).toBeTruthy()
        expect(shipsAPI.getShipByName('belfast').id).toBe('115')
    })
    test('should be able to export the function in root and work well', () => {
        expect(api.getShip('belfast')).toBeTruthy()
        expect(api.getShip('belfast').id).toBe('115')
    })
    test('should be able to export the function in root as \'getShipByName\' alias via deconstruction and work well', () => {
        expect(getShipByName('belfast')).toBeTruthy()
        expect(getShipByName('belfast').id).toBe('115')
    })
    test('should be able to export the function and work well if consumer decides to import \'ships\' via deconstruction', () => {
        expect(ships.getShip('belfast')).toBeTruthy()
        expect(ships.getShip('belfast').id).toBe('115')
    })
});