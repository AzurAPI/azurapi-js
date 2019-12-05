import fs from 'fs'

const clearShipsData = () => {
    fs.writeFile("./ships/ships.json", JSON.stringify({}), function(err) {
        if (err) {
            console.log(err);
        }
    })
};

export default clearShipsData
export { clearShipsData as clearShipsData }