const stack = []

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

module.exports = {
  stack,
  addToStak,
  getFromStack
}
