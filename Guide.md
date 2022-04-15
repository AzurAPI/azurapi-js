# Guide

Please read guide at [docs](https://azurapi.github.io/v2/).

This document is provided for convenience only, and may not be up to date.

> Latest: 1.1.0
> Guide: 0.1.0

## General

### Create a new AzurAPI class
```js
const client = new AzurAPI(/* options [optional]: { source (data source) [default = "local"]: "uncached" | "local", autoupdate (fetch new data or not) [default = true]: boolean, rate (rate of fetching new data) [default  = 3600000]: number }  */);
```

### Update the data
```js
<AzurAPI>.updater.update();
```

## Data accessor classes
```js
<AzurAPI>.ships
<AzurAPI>.equipments
<AzurAPI>.chapters
<AzurAPI>.voicelines
<AzurAPI>.barrages
```

> Note: All functions in accessor classes return arrays.

## Base API

### Search fuse
```js
<AzurAPI>.<accessor>.fuze(/* name: string */);
```

### Get by id
```js
<AzurAPI>.<accessor>.id(/* id: string */);
```

### Get by search query
```js
<AzurAPI>.<accessor>.get(/* query: string */);
```

### Perform a filter operation
```js
<AzurAPI>.<accessor>.filter(/* predicate: function */);
```

### Perform a map operation
```js
<AzurAPI>.<accessor>.map(/* callbackfn: function */);
```

### Perform a forEach operation
```js
<AzurAPI>.<accessor>.forEach(/* callbackfn: function */);
```

### Perform an every operation
```js
<AzurAPI>.<accessor>.every(/* predicate: function */);
```

### Perform a some operation
```js
<AzurAPI>.<accessor>.some(/* predicate: function */);
```

## Extentions - Ships

### Get ship by name/language
<AzurApi>.ships.name(/* name: string, language: 'en' | 'cn' | 'jp' | 'kr' */);

<AzurApi>.ships.hull(/* name: string */);
```

> TODO: Rattley will write the rest later