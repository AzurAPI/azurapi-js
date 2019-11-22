const fs = require('fs');
const request = require('request');
const JSDOM = require('jsdom').JSDOM;

module.exports = {
    init: init,
    getShipByName: getShipByName
}

const SHIPS = [];
const SHIPS_CACHE = {};
const HEADERS = {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
};

function init() {
    loadShipList().then(SHIPS => {
        recursiveFetching(0, () => save(SHIPS_CACHE));
    });
}

async function recursiveFetching(index, callback) {
    getShipByName(SHIPS[index].name).then(ship => {
        if (index + 1 >= SHIPS.length) callback();
    });
    if (index + 1 < SHIPS.length) recursiveFetching(index + 1, callback);
}

function save(SHIPS) {
    console.log(JSON.stringify(SHIPS));
    fs.writeFileSync('../ships/ships.json', JSON.stringify(SHIPS));
}

function loadShipList() {
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
                if (columns[0].tagName === "TD") {
                    SHIPS.push({
                        id: columns[0].textContent,
                        name: columns[1].textContent,
                        rarity: columns[2].textContent,
                        type: columns[3].textContent,
                        nationality: columns[4].textContent
                    });
                }
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
                try {
                    if (error) reject(error);
                    const doc = new JSDOM(body).window.document;
                    const arts = doc.querySelector("#Art tbody").getElementsByTagName("a");
                    const art_images = doc.querySelector("#Art tbody").getElementsByTagName("img");
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
                        thumbnail: "https://azurlane.koumakan.jp" + doc.querySelector("div:nth-child(1) div:nth-child(2) .image img").getAttribute("src"),
                        skins: tabs.length > 1 ? Array.from(tabs).map((skinTab, i) => {
                            return {
                                title: skinTab.getAttribute("title"),
                                image: "https://azurlane.koumakan.jp" + skinTab.getElementsByTagName("img")[0].getAttribute("src"),
                                chibi: arts[i * 2 + 1] ? arts[i * 2 + 1].getAttribute("href") : "http://azurlane.koumakan.jp/w/images/thumb/4/4e/Cross.png/18px-Cross.png"
                            };
                        }) : [{
                            title: "Default",
                            image: "https://azurlane.koumakan.jp" + tabs[0].getElementsByTagName("img")[0].getAttribute("src"),
                            chibi: "https://azurlane.koumakan.jp" + art_images[1].getAttribute("src")
                        }],
                        buildTime: doc.querySelector("tr:nth-child(1) > td:nth-child(2) > a").textContent,
                        rarity: cacheShip.rarity,
                        stars: doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable:nth-child(1) tr:nth-child(2) > td").textContent.trim(),
                        class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
                        nationality: cacheShip.nationality,
                        hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent,
                        stats: Object.values(doc.querySelectorAll(".tabbertab:nth-child(1) > .wikitable tbody td")).map(cell => cell.textContent.trim()),
                        author: doc.querySelector(".nomobile:nth-child(1) tr:nth-child(2) a").textContent,
                    };
                    //console.log(`Ship Loaded: ${JSON.stringify(ship)}`);
                    SHIPS_CACHE[cacheShip.id] = ship;
                    resolve(ship);
                } catch (err) {
                    console.log("Error " + "https://azurlane.koumakan.jp/" + cacheShip.name);
                    //reject(err);
                }
            });
        } else {
            reject(Error("There is no such ship."))
        };
    });
}
