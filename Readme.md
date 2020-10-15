Localrest
=========

API Rest simulator

```
npm install localrest
```

--------

## Basic

**Localrest** generates id fake

```js
const localRest = new LocalRest()
```

### Create data

```js
localRest.add({
  name: 'Raul'
})
```

> **Result:** `{ id, name }`


### Update data

```js
localRest.update(id, {
  name: 'Manuel'
})

```

> **Result:** `true`


### Get Data


```js
localRest.get(id)
```

> **Result:** `{ id, name }`


### List Data


```js
localRest.list()
```

> **Result:** `[{ id, name }]`


### Map Data


```js
localRest.map((data, id) => (
  <div key={id} >
    <p>Name: {data.name}</p>
  <div>
))
```

```js
const result = localRest.map((data, id) => ({
  info: 'Name: ' + data.name
})
```

> **Result:** `[{ info }]`


----------

## System Data


**Data API: users**

```json
{
  "id": 1,
  "name": "Ruiz"
},
{
  "id": 4,
  "name": "Ana"
}
```

```js
const localRest = new LocalRest(users)
```

**or**

```js
const localRest = new LocalRest()

localRest.init(users)
```

In this case Localrest will keep the id


```js
localRest.add({
  name: 'Mirian'
})

const result = localRest.list()
```

> **Result:**
> ```js
> [
>  { id: 1, name: "Ruiz"  }
>  { id: 4, name: "Ana"  }
>  { id: 1602735586356, name: "Mirian"  }
> ]
> ```

### Set new Data API

```js
// id = 12
localRest.set(id, {
  name: 'Pablo'
})
```

> **Result:** `{ id, name }`

The data from the APIs is never deleted, it is only kept in memory for the final result.

```js
// id = 12
localRest.update(1, {
  name: 'Ruiz Fiori'
})

localRest.delete(4)

const result = localRest.result()
```