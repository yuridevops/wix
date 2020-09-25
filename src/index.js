const express = require("express")
const puppeteer = require("puppeteer")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    return res.json({ message: "API para recuperar o valor da SOJA" })
})

app.get("/copacol", async (req, res) => {
    
    let scrape = async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage()
        await page.goto('https://www.noticiasagricolas.com.br/cotacoes/soja')
        // Scrape
        const result = await page.evaluate(() => {
            const location = document.getElementsByTagName("td")[60].outerText
            const value = document.getElementsByTagName("td")[61].outerText
            return {location, value}
        })
        return result
    }
    const {location, value} = await scrape()
    return res.json({location, value})
})

app.listen(8080, () => {
    console.log("Server iniciado na porta 3333")
})