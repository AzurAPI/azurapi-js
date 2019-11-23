const fs = require('fs');
const request = require('request');
const JSDOM = require('jsdom').JSDOM;

module.exports = {
    init: init,
    getShipByName: getShipByName,
    getShipGallery: getShipGallery
}

let SHIPS = [];
const SHIPS_CACHE = require("../ships/ships.json");
const HEADERS = {
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'cookie': 'VEE=wikitext'

};

function init() {
    loadShipList().then(ss => {
        //getShipByName("akagi").then(ship => console.log(JSON.stringify(ship)));
        SHIPS = ss;
        console.log("Total Progress: " + Object.keys(SHIPS_CACHE).length + "/" + SHIPS.length);
        recursiveFetching(0, () => save(SHIPS_CACHE));
    });
}

async function recursiveFetching(index, callback) {
    if (index % 30 == 0) {
        process.stdout.write("| Progress: " + Object.keys(SHIPS_CACHE).length + "/" + SHIPS.length + "\n");
    }
    if (SHIPS_CACHE.hasOwnProperty(SHIPS[index].id)) {
        process.stdout.write("-");
        if (index + 1 < SHIPS.length) recursiveFetching(index + 1, callback);
    } else {
        getShipByName(SHIPS[index].name).then(ship => {
            callback();
            process.stdout.write("+");
            if (index + 1 < SHIPS.length) recursiveFetching(index + 1, callback);
        }).catch(err => {
            console.log("\nError for " + SHIPS[index].name + ". msg: " + err.message + "\n");
            console.log(err.stack);
        });
    }
}

function save(SHIPS) {
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
                //console.log("Found it in cache. Serving Cache Content");
                resolve(SHIPS_CACHE[cacheShip.id]);
                return;
            }
            request({
                url: "https://azurlane.koumakan.jp/" + encodeURIComponent(cacheShip.name.replace(/ +/g, "_")) + "?useformat=desktop",
                headers: HEADERS
            }, async (error, res, body) => {
                try {
                    if (error) reject(error);
                    const doc = new JSDOM(body).window.document;
                    fs.writeFileSync('../ships/web/' + name + '.html', body);

                    if (doc.querySelectorAll("#mw-content-text .mw-parser-output > div").length < 2) { // Unreleased
                        let images = doc.getElementsByTagName("img");
                        let ship = {
                            unreleased: true,
                            wikiUrl: "https://azurlane.koumakan.jp/" + cacheShip.name.replace(/ +/g, "_"),
                            id: cacheShip.id,
                            names: {
                                en: cacheShip.name,
                                cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
                                jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
                                kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
                            },
                            thumbnail: images[1].getAttribute("src"),
                            skins: [{
                                name: name,
                                image: "https://azurlane.koumakan.jp" + doc.querySelector(".tabbertab .image > img").getAttribute("src"),
                                background: null,
                                chibi: doc.querySelector("td > div > div:nth-child(2) img") ? "https://azurlane.koumakan.jp" + doc.querySelector("td > div > div:nth-child(2) img").getAttribute("src") : null,
                                info: null
                            }],
                            rarity: "Unreleased",
                            class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
                            nationality: cacheShip.nationality,
                            hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent,
                        };
                        SHIPS_CACHE[cacheShip.id] = ship
                        resolve(ship);
                        return;
                    }

                    const skins = await getShipGallery(cacheShip.name);
                    const misc_selectors = [2, 3, 4, 5, 6].map(i => doc.querySelector(`.nomobile:nth-child(1) tr:nth-child(${i}) a`));
                    let ship = {
                        wikiUrl: "https://azurlane.koumakan.jp/" + cacheShip.name.replace(/ +/g, "_"),
                        id: cacheShip.id,
                        names: {
                            en: cacheShip.name,
                            cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
                            jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
                            kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
                        },
                        thumbnail: "https://azurlane.koumakan.jp" + doc.getElementsByTagName("img")[0].getAttribute("src"),
                        skins: skins,
                        buildTime: doc.querySelector("tr:nth-child(1) > td:nth-child(2) > a").textContent,
                        rarity: cacheShip.rarity,
                        stars: doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable:nth-child(1) tr:nth-child(2) > td").textContent.trim(),
                        class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
                        nationality: cacheShip.nationality,
                        hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent,
                        stats: getShipStats(doc),
                        misc: {
                            artist: misc_selectors[0] ? misc_selectors[0].textContent : null,
                            web: misc_selectors[1] ? {
                                name: misc_selectors[1].textContent,
                                url: misc_selectors[1].getAttribute("href")
                            } : null,
                            pixiv: misc_selectors[2] ? {
                                name: misc_selectors[2].textContent,
                                url: misc_selectors[2].getAttribute("href")
                            } : null,
                            twitter: misc_selectors[3] ? {
                                name: misc_selectors[3].textContent,
                                url: misc_selectors[3].getAttribute("href")
                            } : null,
                            voice: misc_selectors[4] ? misc_selectors[4].textContent : null
                        }
                    };
                    SHIPS_CACHE[cacheShip.id] = ship;
                    resolve(ship);
                } catch (err) {
                    reject(err);
                }
            });
        } else {
            reject(Error("There is no such ship."));
        };
    });
}

function getShipGallery(name) {
    return new Promise((resolve, reject) => {
        request({
            url: "https://azurlane.koumakan.jp/" + name.replace(/ +/g, "_") + "/Gallery",
            headers: HEADERS
        }, (error, res, body) => {
            if (error) reject(error);
            const doc = new JSDOM(body).window.document;
            const skinTabs = doc.getElementsByClassName("tabbertab");
            let skins = [];
            for (let i = 0; i < skinTabs.length; i++) {
                let tab = skinTabs[i];
                let name = tab.getAttribute("title");
                let img = tab.querySelector(".ship-skin-image img");
                let bg = tab.querySelector(".res img");
                let chibi = tab.querySelector(".ship-skin-chibi img");
                let table = tab.querySelector(".ship-skin-infotable");
                let info = {};
                tab.querySelectorAll(".ship-skin-infotable tr").forEach(row => info[row.getElementsByTagName("th")[0].textContent.trim()] = row.getElementsByTagName("td")[0].textContent.trim());
                let skin = {
                    name: name,
                    image: "https://azurlane.koumakan.jp" + img.getAttribute("src"),
                    background: "https://azurlane.koumakan.jp" + bg.getAttribute("src"),
                    chibi: "https://azurlane.koumakan.jp" + chibi.getAttribute("src"),
                    info: info
                };
                skins.push(skin);
            }
            resolve(skins);
        });
    });
}

function getShipStats(doc) {
    let allStats = {};
    let tabs = doc.querySelectorAll(".nomobile > .tabber > .tabbertab .wikitable tbody");
    for (let i = 0; i < tabs.length; i++) {
        let stats = {};
        let tab = tabs[i];
        let title = tab.parentNode.parentNode.getAttribute("title");
        let names = tab.querySelectorAll("th");
        let bodies = tab.querySelectorAll("td");
        for (let j = 0; j < names.length; j++) {
            let name = names[j].firstChild.getAttribute("title");
            let value = bodies[j].textContent.trim();
            let icon = names[j].firstChild.getAttribute("src") ? "https://azurlane.koumakan.jp" + names[j].firstChild.getAttribute("src") : null;
            stats[name] = {
                value: value,
                icon: icon
            };
        }
        allStats[title] = stats;
    }
    return allStats;
}
