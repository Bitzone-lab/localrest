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
localRest.map((data) => (
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
localrest.valid(id, 'name', 'Name is required')

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

```js
localrest.reset('helper')
```