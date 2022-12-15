const stack = []
const dictionary = []

const addToStak = async (req, res) => {
  const value = req.body.value
  if (value) {
    stack.push(value)
    return res.status(201).json(`Value ${value} added to stack`);
  }

  return res.status(500).json(`Value can be empty`);
}

const getFromStack = async (req, res) => {
  return res.status(200).json({value: stack.pop()});
}

const addToDictionary = async (req, res) => {
  const { key, value, ttl } = req.body
  if (key && key !== '' && value && value !== '') {
    if (dictionary[key] !== undefined && (dictionary[key].ttl === 0 || Date.now() < dictionary[key].ttl)) {
      return res.status(200).json('This key already in use')
    }

    if (ttl && ttl > 0) {
      dictionary[key] = { value: value, ttl: (ttl*1000) + Date.now() }
    } else {
      dictionary[key] = { value: value, ttl: 0 }
    }
    return res.status(201).json('Added the key-value')
  }

  return res.status(500).json('Invalid params')
}

const getFromDictionary = async (req, res) => {
  const { key } = req.params
  if (key && dictionary[key]) {
    const row = dictionary[key]
    if (row.ttl > 0 && Date.now() > row.ttl) {
      return res.status(200).json()
    }
    return res.status(200).json({ value: row.value })
  }

  return res.status(200).json('Key not found')
}

const deleteFromDictionary = async (req, res) => {
  const { key } = req.params
  if (key && dictionary[key]) {
    delete dictionary[key]
    return res.status(200).json('Key deleted')
  }

  return res.status(200).json('Key not found')
}

module.exports = {
  stack,
  dictionary,
  addToStak,
  getFromStack,
  addToDictionary,
  getFromDictionary,
  deleteFromDictionary
}