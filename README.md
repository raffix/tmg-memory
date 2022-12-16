# TMG Memory
This application provide some kind of cache as a API.
Two operations are available, a stack and a dictionary.

## The Stack
Can be add and get values from a memory stack by two routes:
To add values at stack
``` 
POST /api/stack
body: { value: 'value' || 12321 }
```

To consume the stack
```
GET /api/stack
```

## The Dictionary
There 3 actions available, add, consume and delete.
It's possible set a TTL to each value on the dictionary if necessary.

To add values:
```
POST /api/dictionary
body: { key: 'your_key', value: 'value' || 123, ttl: 30 }
``` 
* the ttl attribute it's in seconds and if don't sent the default 0 will be applied and this key never expire
* when a ttl value it's informed, a callback function will be called when this time end and delete this tuple.

To consume:
```
GET /api/dictionary/your_key
```

To delete:
```
DELETE /api/dictionary/your_key
```



### To run the project

* tar -xf tmg-memory.tar
* ```npm install```
* ```npm test```
* ```npm start```
