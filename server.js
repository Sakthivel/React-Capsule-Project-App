const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:f3b4d9d2-eb2b-412a-9fba-b5885cebb3b8',
  key: 'cb0291f3-5dcd-41bd-a09f-53286bc3c6c2:CNr5D3Bl3GMNbsSpeXFKFJXceNpl7k5p1YXJCYkz1lM=',
})

const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/build'));

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
  .createUser({
  id: username,
  name: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if (error.error_type === 'services/chatkit/user_already_exists') {
      res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})


app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.error(`Running on port ${PORT}`)
  }
})
