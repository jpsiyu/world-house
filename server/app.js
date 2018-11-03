const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../client/public')))

app.listen(3000, () => {
    console.log('server listening on port 3000...')
})