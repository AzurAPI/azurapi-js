/*
{
  wikiUrl: 'https://azurlane.koumakan.jp/Yamashiro',
  id: '209',
  names: {
    en: 'Yamashiro',
    code: 'IJN Yamashiro',
    cn: '鲼',
    jp: '山城',
    kr: '야마시로'
  },
  class: 'Fusou',
  nationality: 'Sakura Empire',
  hullType: 'Battleship',
  retrofit_hullType: 'Aviation Battleship',
  thumbnail: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/thumbnail.png',
  rarity: 'Rare',
  stars: { stars: '★★★★', value: 4 },
  stats: {
    baseStats: {
      health: '1208',
      armor: 'Heavy',
      reload: '51',
      luck: '14',
      firepower: '74',
      torpedo: '0',
      evasion: '5',
      speed: '23',
      antiair: '41',
      aviation: '0',
      oilConsumption: '4',
      accuracy: '20',
      antisubmarineWarfare: '0'
    },
    level100: {
      health: '6246',
      armor: 'Heavy',
      reload: '120',
      luck: '14',
      firepower: '349',
      torpedo: '0',
      evasion: '13',
      speed: '23',
      antiair: '193',
      aviation: '0',
      oilConsumption: '13',
      accuracy: '52',
      antisubmarineWarfare: '0'
    },
    level120: {
      health: '7307',
      armor: 'Heavy',
      reload: '138',
      luck: '14',
      firepower: '390',
      torpedo: '0',
      evasion: '31',
      speed: '23',
      antiair: '222',
      aviation: '0',
      oilConsumption: '13',
      accuracy: '66',
      antisubmarineWarfare: '0'
    },
    level100Retrofit: {
      health: '6596',
      armor: 'Heavy',
      reload: '118',
      luck: '14',
      firepower: '352',
      torpedo: '0',
      evasion: '13',
      speed: '23',
      antiair: '268',
      aviation: '151',
      oilConsumption: '13',
      accuracy: '63',
      antisubmarineWarfare: '0'
    },
    level120Retrofit: {
      health: '7657',
      armor: 'Heavy',
      reload: '134',
      luck: '14',
      firepower: '390',
      torpedo: '0',
      evasion: '31',
      speed: '23',
      antiair: '303',
      aviation: '202',
      oilConsumption: '13',
      accuracy: '77',
      antisubmarineWarfare: '0'
    }
  },
  slots: {
    '1': {
      type: 'BB Guns',
      minEfficiency: 100,
      maxEfficiency: 130,
      kaiEfficiency: 165
    },
    '2': {
      type: 'CL/DD Guns (Seaplanes on retrofit)',
      minEfficiency: 200,
      maxEfficiency: 200,
      kaiEfficiency: 200
    },
    '3': {
      type: 'Anti-Air Guns',
      minEfficiency: 80,
      maxEfficiency: 80,
      kaiEfficiency: 85
    }
  },
  enhanceValue: { firepower: 61, torpedo: 0, aviation: 0, reload: 10 },
  scrapValue: { coin: 11, oil: 4, medal: 1 },
  skills: [
    {
      icon: 'https://azurlane.koumakan.jp/w/images/a/a3/Skill_2070.png',
      names: [Object],
      description: 'Increases own Firepower by 10% (20%).',
      color: 'pink'
    },
    {
      icon: 'https://azurlane.koumakan.jp/w/images/d/df/Skill_10830.png',
      names: [Object],
      description: 'Once per battle, when launching the first airstrike: perform an additional aerial machine-gun barrage (damage increases 
with skill level).',
      color: 'pink'
    }
  ],
  limitBreaks: [
    [ 'Main Gun Mount +1', 'Main Gun Efficiency +5%' ],
    [ 'Secondary Gun Mount +2', 'Main Gun Efficiency +10%' ],
    [ 'Main Gun Mount +1', 'Main Gun Efficiency +15%' ]
  ],
  fleetTech: {
    statsBonus: { collection: [Object], maxLevel: [Object] },
    techPoints: { collection: 11, maxLimitBreak: 22, maxLevel: 16, total: 49 }
  },
  retrofit: true,
  retrofitId: '3209',
  retrofitProjects: {
    A: {
      name: 'Hull Improvement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 200,
      level: 1,
      levelBreakLevel: 0,
      levelBreakStars: '★★☆☆☆',
      recurrence: 1,
      require: []
    },
    B: {
      name: 'Reload Enhancement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 300,
      level: 5,
      levelBreakLevel: 0,
      levelBreakStars: '★★☆☆☆',
      recurrence: 1,
      require: [Array]
    },
    C: {
      name: 'Main Gun Improvement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 400,
      level: 20,
      levelBreakLevel: 1,
      levelBreakStars: '★★★☆☆',
      recurrence: 1,
      require: [Array]
    },
    D: {
      name: 'Firepower Enhancement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 500,
      level: 25,
      levelBreakLevel: 1,
      levelBreakStars: '★★★☆☆',
      recurrence: 1,
      require: [Array]
    },
    E: {
      name: 'Anti-Air Gun Improvement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 600,
      level: 35,
      levelBreakLevel: 2,
      levelBreakStars: '★★★★☆',
      recurrence: 1,
      require: [Array]
    },
    F: {
      name: 'Anti-Air Enhancement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 800,
      level: 40,
      levelBreakLevel: 2,
      levelBreakStars: '★★★★☆',
      recurrence: 1,
      require: [Array]
    },
    G: {
      name: 'Hull Improvement Ⅱ',
      attributes: [Array],
      materials: [Array],
      coins: 1000,
      level: 50,
      levelBreakLevel: 2,
      levelBreakStars: '★★★★☆',
      recurrence: 2,
      require: [Array]
    },
    H: {
      name: 'Main Gun Improvement Ⅱ',
      attributes: [Array],
      materials: [Array],
      coins: 1200,
      level: 55,
      levelBreakLevel: 2,
      levelBreakStars: '★★★★☆',
      recurrence: 2,
      require: [Array]
    },
    I: {
      name: 'Firepower Enhancement Ⅱ',
      attributes: [Array],
      materials: [Array],
      coins: 1400,
      level: 70,
      levelBreakLevel: 3,
      levelBreakStars: '★★★★★',
      recurrence: 2,
      require: [Array]
    },
    J: {
      name: 'Modernization',
      attributes: [Array],
      materials: [Array],
      coins: 5000,
      level: 75,
      levelBreakLevel: 3,
      levelBreakStars: '★★★★★',
      recurrence: 1,
      require: [Array]
    },
    K: {
      name: 'Aviation Enhancement Ⅰ',
      attributes: [Array],
      materials: [Array],
      coins: 1600,
      level: 85,
      levelBreakLevel: 3,
      levelBreakStars: '★★★★★',
      recurrence: 1,
      require: [Array]
    }
  },
  construction: {
    constructionTime: 'Drop Only',
    availableIn: {
      light: false,
      heavy: false,
      aviation: false,
      limited: false,
      exchange: false
    }
  },
  obtainedFrom: {
    obtainedFrom: 'Visitors Dyed in Red A-1, A-2, A-3, C-1, C-2, C-3',
    fromMaps: [ '6-2', '6-3', '6-4' ]
  },
  misc: {
    artist: {
      name: 'Rain Lan',
      url: 'https://azurlane.koumakan.jp/Artists#Rain_Lan'
    },
    pixiv: {
      name: 'Rain Lan',
      url: 'https://www.pixiv.net/member.php?id=2922722'
    },
    twitter: { name: 'Rain Lan', url: 'https://twitter.com/h49889577' },
    web: { name: 'Rain_Lan_其实叫乳量', url: 'https://weibo.com/u/2120756483' },
    voice: {
      name: 'Ami Koshimizu',
      url: 'https://en.wikipedia.org/wiki/Ami_Koshimizu'
    }
  },
  skins: [
    {
      name: 'Default',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Default/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/MainDayBG.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Default/chibi.png',
      info: [Object]
    },
    {
      name: 'Retrofit',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Retrofit/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/MainDayBG.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Retrofit/chibi.png',
      info: [Object]
    },
    {
      name: 'Oath',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Oath/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/MainDayBG.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Oath/chibi.png',
      info: [Object]
    },
    {
      name: 'Summer Offensive?',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Summer_Offensive/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/Skin_BG_106.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Summer_Offensive/chibi.png',
      info: [Object]
    },
    {
      name: 'Holiday Offensive',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Holiday_Offensive/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/Skin_BG_100.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Holiday_Offensive/chibi.png',
      info: [Object]
    },
    {
      name: 'Dressy Black Cat',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Dressy_Black_Cat/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/Skin_BG_107.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Dressy_Black_Cat/chibi.png',
      info: [Object]
    },
    {
      name: 'Sales Clerk Offensive?!',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Sales_Clerk_Offensive/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/MainDayBG.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Sales_Clerk_Offensive/chibi.png',
      info: [Object]
    },
    {
      name: 'Vacation Offensive!',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Vacation_Offensive/image.png',
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/MainDayBG.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Vacation_Offensive/chibi.png',
      info: [Object]
    },
    {
      name: 'Street Corner Offensive!',
      image: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Street_Corner_Offensive/image.png',        
      background: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/backgrounds/Skin_BG_103.png',
      chibi: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/209/Street_Corner_Offensive/chibi.png',        
      info: [Object]
    }
  ],
  gallery: [
    {
      description: 'Yamashiro and her sister Fusou in a house filled with youkai',
      url: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/gallery/Bg_fusou_1.png'
    },
    {
      description: 'Yamashiro and Javelin in their oath skins with Unicorn',
      url: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/gallery/Bg_javelin_1.png'
    },
    {
      description: 'Izumo, Yamashiro, Eldridge, Minneapolis',
      url: 'https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/gallery/Bg_2019.12.19_6.png'
    }
  ]
}
*/
