const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

app.get('/steam-news', async (req,res) => {
    try{
        const response = await axios.get(
            'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=236390'
        )
        console.log(response.data)
        res.json(response.data)
    } catch (error) {
        res.status(500).send('lol')
    }
})

app.listen(3000, () => {
    console.log('proxy server')
})
