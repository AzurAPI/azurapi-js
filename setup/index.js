const fs = require('fs');
const request = require('request');
const JSDOM = require('jsdom').JSDOM;

let SHIP_LIST = [];
const SHIPS = require("../ships/ships.json");
const HEADERS = {
    'user-agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'cookie': 'VEE=wikitext'

};

module.exports = {
    init: init,
    getShipByName: getShipByName,
    getShipGallery: getShipGallery,
    ships: SHIPS
}


function init() {
    getShips().then(LIST => {
        //getShipByName("akagi").then(ship => console.log(JSON.stringify(ship)));
        SHIP_LIST = LIST;
        fs.writeFileSync('../ships/ship_list.json', JSON.stringify(SHIP_LIST));
        console.log("Total Progress: " + Object.keys(SHIPS).length + "/" + SHIP_LIST.length);
        recursiveFetching(0);
    });
}
let dot_per_line = 64;

function recursiveFetching(index) {
    if (index >= SHIP_LIST.length) return console.log("\nProgram Finished");
    if (index % dot_per_line == 0) process.stdout.write(`| Progress: ${Object.keys(SHIPS).length}/${SHIP_LIST.length}\n`);
    if (SHIPS.hasOwnProperty(SHIP_LIST[index].id)) process.stdout.write("-");
    else {
        let ship = getShipByNameLocal(SHIP_LIST[index].name);
        SHIPS[SHIP_LIST[index].id] = ship;
        fs.writeFileSync('../ships/ships.json', JSON.stringify(SHIPS));
        process.stdout.write("+");
    }
    recursiveFetching(index + 1);
}

function getShips() {
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
                    SHIP_LIST.push({
                        id: columns[0].textContent,
                        name: columns[1].textContent,
                        rarity: columns[2].textContent,
                        type: columns[3].textContent,
                        nationality: columns[4].textContent
                    });
                }
            });
            console.log("Loaded " + SHIP_LIST.length + " Ships");
            resolve(SHIP_LIST);
        });
    });
}

function findExactShip(name) {
    return SHIP_LIST.find(ship => ship.name.toUpperCase() === name.toUpperCase());
}

function findShip(name) {
    return SHIP_LIST.find(ship => ship.name.toUpperCase().includes(name.toUpperCase()));
}

function getShipByNameLocal(name) {
    const body = fs.readFileSync('../setup/web/' + name + '.html', 'utf8');
    const doc = new JSDOM(body).window.document;
    let ship = {
        wikiUrl: "https://azurlane.koumakan.jp/" + name.replace(/ +/g, "_"),
        id: doc.querySelector('div:nth-child(4) > .wikitable:nth-child(1) tr:nth-child(1) > td').textContent.trim(),
        names: {
            en: doc.querySelector('#firstHeading').textContent,
            cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
            jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
            kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
        },
        class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
        nationality: doc.querySelector("div:nth-child(4) > .wikitable tr:nth-child(2) a:nth-child(2)").textContent,
        hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent
    }
    if (doc.querySelectorAll("#mw-content-text .mw-parser-output > div").length < 2) { // Unreleased
        let images = doc.getElementsByTagName("img");
        ship.unreleased = true,
            ship.names = {
                en: doc.querySelector('#firstHeading').textContent,
                cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
                jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
                kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
            };
        ship.thumbnail = "https://azurlane.koumakan.jp" + images[1].getAttribute("src");
        ship.skins = [{
            name: name,
            image: "https://azurlane.koumakan.jp" + doc.querySelector(".tabbertab .image > img").getAttribute("src"),
            background: null,
            chibi: doc.querySelector("td > div > div:nth-child(2) img") ? "https://azurlane.koumakan.jp" + doc.querySelector("td > div > div:nth-child(2) img").getAttribute("src") : null,
            info: null
        }];
        ship.rarity = "Unreleased";
        return ship;
    }
    const misc_selectors = [2, 3, 4, 5, 6].map(i => doc.querySelector(`.nomobile:nth-child(1) tr:nth-child(${i}) a`));
    ship.thumbnail = "https://azurlane.koumakan.jp" + doc.getElementsByTagName("img")[0].getAttribute("src");
    ship.skins = getShipGalleryLocal(name);
    ship.buildTime = doc.querySelector("tr:nth-child(1) > td:nth-child(2) > a").textContent;
    ship.rarity = doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable td a").getAttribute("title");
    let stars = doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable:nth-child(1) tr:nth-child(2) > td").textContent.trim();
    ship.stars = {
        stars: stars,
        value: stars.split("★").length - 1
    };
    ship.stats = getShipStats(doc);
    ship.misc = {
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
    };
    return ship;
}

function getShipGalleryLocal(name) {
    let skins = [];
    const body = fs.readFileSync('../setup/web.gallery/' + name + '.html', 'utf8');
    Array.from(new JSDOM(body).window.document.getElementsByClassName("tabbertab")).forEach(tab => {
        let info = {};
        tab.querySelectorAll(".ship-skin-infotable tr").forEach(row => info[row.getElementsByTagName("th")[0].textContent.trim()] = row.getElementsByTagName("td")[0].textContent.trim());
        skins.push({
            name: tab.getAttribute("title"),
            image: "https://azurlane.koumakan.jp" + tab.querySelector(".ship-skin-image img").getAttribute("src"),
            background: "https://azurlane.koumakan.jp" + tab.querySelector(".res img").getAttribute("src"),
            chibi: "https://azurlane.koumakan.jp" + tab.querySelector(".ship-skin-chibi img").getAttribute("src"),
            info: info
        });
    });
    return skins;
}

function getShipByName(name) {
    return new Promise((resolve, reject) => {
        request({
            url: "https://azurlane.koumakan.jp/" + encodeURIComponent(name.replace(/ +/g, "_")) + "?useformat=desktop",
            headers: HEADERS
        }, async (error, res, body) => {
            if (error) reject(error);
            fs.writeFileSync('../setup/web/' + name + '.html', body);
            const doc = new JSDOM(body).window.document;
            let ship = {
                wikiUrl: "https://azurlane.koumakan.jp/" + name.replace(/ +/g, "_"),
                id: doc.querySelector('div:nth-child(4) > .wikitable:nth-child(1) tr:nth-child(1) > td').textContent.trim(),
                names: {
                    en: doc.querySelector('#firstHeading').textContent,
                    cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
                    jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
                    kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
                },
                class: doc.querySelector("div:nth-child(3) > .wikitable tr:nth-child(3) > td:nth-child(2) > a").textContent,
                nationality: doc.querySelector("div:nth-child(4) > .wikitable tr:nth-child(2) a:nth-child(2)").textContent,
                hullType: doc.querySelector(".wikitable tr:nth-child(3) a:nth-child(2)").textContent
            }
            if (doc.querySelectorAll("#mw-content-text .mw-parser-output > div").length < 2) { // Unreleased
                let images = doc.getElementsByTagName("img");
                ship.unreleased = true,
                    ship.names = {
                        en: doc.querySelector('#firstHeading').textContent,
                        cn: doc.querySelector('[lang="zh"]') ? doc.querySelector('[lang="zh"]').textContent : null,
                        jp: doc.querySelector('[lang="ja"]') ? doc.querySelector('[lang="ja"]').textContent : null,
                        kr: doc.querySelector('[lang="ko"]') ? doc.querySelector('[lang="ko"]').textContent : null
                    };
                ship.thumbnail = "https://azurlane.koumakan.jp" + images[1].getAttribute("src");
                ship.skins = [{
                    name: name,
                    image: "https://azurlane.koumakan.jp" + doc.querySelector(".tabbertab .image > img").getAttribute("src"),
                    background: null,
                    chibi: doc.querySelector("td > div > div:nth-child(2) img") ? "https://azurlane.koumakan.jp" + doc.querySelector("td > div > div:nth-child(2) img").getAttribute("src") : null,
                    info: null
                }];
                ship.rarity = "Unreleased";
                resolve(ship);
                return;
            }
            const misc_selectors = [2, 3, 4, 5, 6].map(i => doc.querySelector(`.nomobile:nth-child(1) tr:nth-child(${i}) a`));
            ship.thumbnail = "https://azurlane.koumakan.jp" + doc.getElementsByTagName("img")[0].getAttribute("src");
            ship.skins = await getShipGallery(name);
            ship.buildTime = doc.querySelector("tr:nth-child(1) > td:nth-child(2) > a").textContent;
            ship.rarity = doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable td a").getAttribute("title");
            let stars = doc.querySelector("div:nth-child(1) > div:nth-child(3) > .wikitable:nth-child(1) tr:nth-child(2) > td").textContent.trim();
            ship.stars = {
                stars: stars,
                value: stars.split("★").length - 1
            };
            ship.stats = getShipStats(doc);
            ship.misc = {
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
            };
            resolve(ship);
        });
    });
}

function getShipGallery(name) {
    return new Promise((resolve, reject) => {
        request({
            url: "https://azurlane.koumakan.jp/" + name.replace(/ +/g, "_") + "/Gallery",
            headers: HEADERS
        }, (error, res, body) => {
            if (error) reject(error);
            let skins = [];
            fs.writeFileSync('../setup/web.gallery/' + name + '.html', body);
            Array.from(new JSDOM(body).window.document.getElementsByClassName("tabbertab")).forEach(tab => {
                let info = {};
                tab.querySelectorAll(".ship-skin-infotable tr").forEach(row => info[row.getElementsByTagName("th")[0].textContent.trim()] = row.getElementsByTagName("td")[0].textContent.trim());
                skins.push({
                    name: tab.getAttribute("title"),
                    image: "https://azurlane.koumakan.jp" + tab.querySelector(".ship-skin-image img").getAttribute("src"),
                    background: "https://azurlane.koumakan.jp" + tab.querySelector(".res img").getAttribute("src"),
                    chibi: "https://azurlane.koumakan.jp" + tab.querySelector(".ship-skin-chibi img").getAttribute("src"),
                    info: info
                });
            });
            resolve(skins);
        });
    });
}

function getShipStats(doc) {
    let allStats = {};
    doc.querySelectorAll(".nomobile > .tabber > .tabbertab .wikitable tbody").forEach(tab => {
        let stats = {};
        let title = tab.parentNode.parentNode.getAttribute("title");
        let names = tab.querySelectorAll("th"),
            bodies = tab.querySelectorAll("td");
        for (let j = 0; j < names.length; j++) stats[names[j].firstChild.getAttribute("title")] = bodies[j].textContent.trim();
        allStats[title] = stats;
    });
    return allStats;
}
