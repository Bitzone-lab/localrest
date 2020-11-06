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


### Each Data

```js
localRest.each((data) => (
  <div key={data.id} >
    <p>Name: {data.name}</p>
  <div>
))
```

```js
const result = localRest.each((data) => ({
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

The data from the APIs is never deleted, it is only kept in memory for the final `result`.

-------

## Final Result

```js
// 12 and 4 === system data
localRest.update(12, {
  name: 'Ruiz Fiori'
})

localRest.delete(4)

localRest.add({
  name: 'Miguel'
})

const result = localRest.result()
```

```js
result.toUpdate() 
```

> **Result:**
> ```js
> [
>  { id: 12, name: "Ruiz Fiori"  }
> ]
> ```

```js
result.toDelete() 
```

> **Result:**
> ```js
> [
>  { id: 4, name: "Ana"  }
> ]
> ```

```js
result.toAdd() 
```

> **Result:**
> ```js
> [
>  { name: "Miguel"  }
> ]
> ```

#### Methods 

| name | return | description |
|------|---------|-------------|
| **toDelete()** | `Array<T>` | Return list data for delete (it's only for system data). |
| **toUpdate()** | `Array<T>` | Return list data for update. (It's only for system data). |
| **toAdd()** | `Array<T>` | Return list data for add. |
| **all()** | `Array<T>` | Return all list. |
| **mapping(callbackfn(T, to))** | `Array<L>` | A mapping of all the result data. The second (to) parameter of the callback will return the type of data state |


#### Props

| name | return | description |
|------|---------|-------------|
| **hasToDelete** | `Boolean` | In case there is data to delete |
| **hasToUpdate** | `Boolean` | In case there is data to update |
| **hasToAdd** | `Boolean` | In case there is data to add |


## Validation

**Valid**
```js
const localrest = new LocalRest([
  { id: 1, name: 'Juan', age: 4 }
])
let id = 1
localrest.valid(id, 'name', 'Name is required') // 'Name is required'

const valids = localrest.each(function(data, valid){
  return valid
})
```

> **Result:**
> ```js
> [
>  { name: "Name is required", age: ''  }
> ]
> ```

The third parameter is optional if you just want to get the message.

**Validation**

```js
const localrest = new LocalRest([
  { id: 1, name: 'Juan', age: 4 }
])
let id = 1
localrest.validation(id, {
  name: 'Name is required',
  age: 'Its not number'
})

const valids = localrest.each(function(data, valid){
  return valid
})
```

> **Result:**
> ```js
> [
>  { name: "Name is required", age: 'Its not number'  }
> ]
> ```

The second parameter is optional if you only want to obtain the data validations

## Helper

It is an extra information that can be assigned each data.

```js
const MyModes = {
  MODE1: 'MODE1',
  MODE2: 'MODE2'
}

const list = [
  { id: 1, name: 'Juan', age: 4 }
]

// second param its a default helper for all data
const localrest = new LocalRest(list, MyModes.MODE1)

const helpers = localrest.each(function(data, valid, helper){
  return helper
})
```
> **Result:**
> ```js
> [ 'MODE1' ]
> ```

The instance receives as a second parameter a default helper for all data.

You can change the helper for data

```js
localrest.helper(id, MyModes.MODE2) // MODE2
```

The second parameter is optional if you only want to get the data

## Verify changes

You can check if the data has changed

```js
const list = [
  { id: 1, name: 'Juan', age: 4 }
]

const localrest = new LocalRest(list)

localrest.update(1, {
  age: 7
})

localrest.hasChange(1) // true|false
```

It is also possible to check if a specific field had change

```js
localrest.hasChange(1, 'age') // true|false
```

Or in total
```js
localrest.hasChange() // true|false
```

You can get the fields that had changes

```js
localrest.whoChange(1)
```

> **Result:**
> ```js
> { age: 7 }
> ```

## Restart

There are several restore modes

* validations
* list
* helper
* all
* id

```js
localrest.reset('helper')
```

```js
const list = [
  { id: 1, name: 'Juan', age: 4 }
]

const localrest = new LocalRest(list)
localrest.update(1, {
  age: 7
})
// { id: 1, name: 'Juan', age: 7 }
localrest.reset(id)
// { id: 1, name: 'Juan', age: 4 }
```

## Pedding Data

It is data created, updated or deleted that awaits a confirmation if it will be accepted or canceled. In case of being canceled it will return to the state before the given action.

```js
const pendding = true
localRest.add(data, pendding)
localRest.update(1, data, pedding)
localRest.delete(2, pedding)

localRest.confirm()
```

If you want to cancel

```js
localRest.cancel()
```

It is also possible to confirm or cancel by your id

```js
localRest.confirm(id)
localRest.cancel(id)
```

As a result, it will not take into account the pending data unless it has been confirmed.

```js
localRest.add(data, true)
const result = localRest.result()
result.hasToAdd // false

localRest.confirm()
const result2 = localRest.result()
result2.hasToAdd // true
```

You can get the previous data of a pending update.

```js
const data = localReset.add({ name: 'manuel' })
localRest.update(data.id, { name: 'Juan' })
localRest.frozen(data.id) // { name: 'manuel' }
localRest.confirm(data.id)
localRest.frozen(data.id) // undefinded
```

You can specify the name of the field you want to receive.

```js
localRest.frozen(data.id, 'name') // manuel
```

## Use JSDoc

```js
/**
 * @typedef {object} Data
 * @property {string} name
 * @property {string} lastname
 * @property {number} age
*/

const list = [
  { name: 'Juan', lastname: 'Mendez', age: 4 }
]

/**
 * @enum {string}
*/
const MyMode = {
  MODE1: 'MODE1',
  MODE2: 'MODE2'
}

/**
 * @type {LocalRest<Data, MyMode>}
*/
const localRest = new LocalRest()

localRest.init(list, MyMode.MODE1)
```

The helper is optional

Read more about JSDoc [here](https://jsdoc.app/about-getting-started.html)
