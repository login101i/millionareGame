const express = require('express')
const path = require('path')


const gameRoutes = require('./roots/game')

const app = express();


app.listen(8700, () => {
    console.log(`Server is listening at http://localhost:8800/ Go see it : `)
}
)

app.use(express.static(
    path.join(__dirname, 'public')
))
gameRoutes(app)





