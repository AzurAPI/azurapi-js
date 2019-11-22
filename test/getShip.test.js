// import { getShip } from 'azur-json/build/ships/getShip'
let { getShip } = require("../build/ships/getShip")

// const getShipApi = require('azur-json/build/ships/getShip')
let getShipApi = require("../build/ships/getShip")

// const shipsAPI = require('azur-json/build/ships')
let shipsAPI = require("../build/ships")

// const api = require('azur-json')
let api = require("../index.js")

// import { getShipByName } from 'azur-json'
let { getShipByName } = require("../index.js")

// import { ships } from 'azur-json'
let { ships } = require("../index.js")

describe("Get ship module", () => {
    test('should be able to export the function with deconstruction and work well', () => {
        expect(getShip('z23')[0].id).toBe('236')
    })
    test('should be able to export by default the function and work well', () => {
        expect(getShipApi.getShip('z23')[0].id).toBe('236')
    })
    test('should be able to export the function in ships/index.js and work well', () => {
        expect(shipsAPI.getShip('z23')[0].id).toBe('236')
    })
    test('should be able to export the function in ships/index.js as \'getShipByName\' alias and work well', () => {
        expect(shipsAPI.getShipByName('z23')[0].id).toBe('236')
    })
    test('should be able to export the function in root and work well', () => {
        expect(api.getShip('z23')[0].id).toBe('236')
    })
    test('should be able to export the function in root as \'getShipByName\' alias via deconstruction and work well', () => {
        expect(getShipByName('z23')[0].id).toBe('236')
    })
    test('should be able to export the function and work well if consumer decides to import \'ships\' via deconstruction', () => {
        expect(ships.getShip('z23')[0].id).toBe('236')
    })
});