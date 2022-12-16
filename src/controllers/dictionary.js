
const dictionary = []


const addToDictionary = async (req, res) => {
  const { key, value, ttl } = req.body
  if (key && key !== '' && value && value !== '') {
    if (dictionary[key] !== undefined) {
      return res.status(200).json('This key already in use')
    }
    
    dictionary[key] = value
    if (ttl && ttl > 0) {
      setTimeout(() => {ttlDelete(key)}, (ttl*1000) + 1)
    }

    return res.status(201).json('Added the key-value')
  }

  return res.status(500).json('Invalid params')
}

const getFromDictionary = async (req, res) => {
  const { key } = req.params
  if (key && dictionary[key]) {
    return res.status(200).json({ value: dictionary[key] })
  }

  return res.status(200).json('')
}

const deleteFromDictionary = async (req, res) => {
  const { key } = req.params
  if (key && dictionary[key]) {
    delete dictionary[key]
    return res.status(200).json('Key deleted')
  }

  return res.status(404).json('Key not found')
}

const ttlDelete = (key) => {
  console.info(`[TTL MANAGER] - Removing tuple ${key}-${dictionary[key]} from dictionary.`)
  delete dictionary[key]
}

module.exports = {
  dictionary,
  addToDictionary,
  getFromDictionary,
  deleteFromDictionary
}
