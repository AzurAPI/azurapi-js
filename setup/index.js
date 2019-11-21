const request = require('request');
const JSDOM = require('jsdom').JSDOM;

module.exports = {
    init: loadShip,
    getShipByName: getShipByName
}

const SHIPS = [];
const SHIPS_CACHE = {};
const HEADERS = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"
};

function loadShip() {
    return new Promise((resolve, reject) => {
        request({
            url: "https://azurlane.koumakan.jp/List_of_Ships",
            headers: HEADERS
        }, (error, res, body) => {
            if (error) {
                reject("Failed to load ships");
                return;
            }
            const doc = new JSDOM(body).window.document;
            let table_ships = doc.querySelectorAll("#mw-content-text .mw-parser-output table tbody tr");
            table_ships.forEach(table_ship => {
                let columns = table_ship.childNodes;
                SHIPS.push({
                    id: columns[0].textContent,
                    name: columns[1].textContent,
                    rarity: columns[2].textContent,
                    type: columns[3].textContent,
                    nationality: columns[4].textContent
                });
            });
            console.log("Loaded " + SHIPS.length + " Ships");
            resolve(SHIPS);
        });
    });
}

function findExactShip(name) {
    return SHIPS.find(ship => ship.name.toUpperCase() === name.toUpperCase());
}

function findShip(name) {
    return SHIPS.find(ship => ship.name.toUpperCase().includes(name.toUpperCase()));
}

function getShipByName(name) {
    return new Promise((resolve, reject) => {
        let cacheShip = findExactShip(name);
        if (!cacheShip) cacheShip = findShip(name);
        if (cacheShip) {
            if (SHIPS_CACHE.hasOwnProperty(cacheShip.id)) {
                console.log("Found it in cache. Serving Cache Content");
                resolve(SHIPS_CACHE[cacheShip.id]);
                return;
            }
            request({
                url: "https://azurlane.koumakan.jp/" + cacheShip.name,
                headers: HEADERS
            }, (error, res, body) => {
                if (error) reject(error);
                const doc = new JSDOM(body).window.document;
                const arts = doc.querySelector("#Art tbody").getElementsByTagName("a");
                const tabs = doc.querySelectorAll(".azl_box_body .tabber .tabbertab");
                let ship = {
                    wikiUrl: "https://azurlane.koumakan.jp/" + cacheShip.name.replace(/ +/g, "_"),
                    id: cacheShip.id,
                    names: {
                        en: cacheShip.name,
                        cn: doc.querySelector('[lang="zh"]').textContent,
                        jp: doc.querySelector('[lang="ja"]').textContent,
                        kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : doc.querySelector('[lang="zh"]').textContent
                    },
                    thumbnail: "https://azurlane.koumakan.jp" + doc.querySelector("div:nth-child(1) > div:nth-child(2) > .image > img").getAttribute("src"),
                    skins: Array.from(tabs).map((skinTab, i) => {
                        return {
                            title: skinTab.getAttribute("title"),
                            image: "https://azurlane.koumakan.jp" + skinTab.getElementsByTagName("img")[0].getAttribute("src"),
                            chibi: arts[i * 2 + 1].getAttribute("href")
                        };
                    }),
                    buildTime: doc.querySelector("tr:nth-child(1) > td:nth-child(2) > a").textContent,
                    rarity: cacheShip.rarity,
                    stars: doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable:nth-child(1) tr:nth-child(2) > td").textContent.trim(),
                    class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
                    nationality: cacheShip.nationality,
                    hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent,
                    stats: Object.values(doc.querySelectorAll(".tabbertab:nth-child(1) > .wikitable tbody td")).map(cell => cell.textContent.trim()),
                    author: doc.querySelector(".nomobile:nth-child(1) tr:nth-child(2) a").textContent,
                };
                console.log(`Ship Loaded: ${JSON.stringify(ship)}`);
                SHIPS_CACHE[cacheShip.id] = ship;
                resolve(ship);
            });
        } else {
            reject(Error("There is no such ship."))
        };
    });
}
