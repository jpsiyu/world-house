const express = require('express')
const path = require('path')
const { Rank, RankInfo } = require('./rank')
const bodyParser = require('body-parser')
const pkgJson = require('../package.json')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../client/public')))

app.get('/rank', (req, res) => {
    const rankList = app.rank.get()
    const str = JSON.stringify(rankList)
    res.send(str)
})

app.post('/report', (req, res) => {
    const args = req.body
    const info = new RankInfo(args.owner, args.houseId, args.happiness, args.land)
    app.rank.add(info)
    res.send('ok')
})

app.listen(pkgJson.port, () => {
    app.rank = new Rank()
    console.log(`server listening on port ${pkgJson.port}...`)
})