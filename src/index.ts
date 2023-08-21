import express from 'express'
import { Application, Request, Response } from 'express'

import cors from 'cors'

import dotenv from 'dotenv'
import { prisma } from './prisma'
dotenv.config()

const PORT: number = Number(process.env.PORT) || 8000
const app: Application = express()

app.use(express.json())
app.use(cors({
    origin: '*'
}))


app.get("/", async (req: Request, res: Response): Promise<any> => {
    const results = await prisma.test.findMany()
    res.send(`Test data: ${results.map(result => result.testData).join(' ')}`)
});

app.post('/create', async (req: Request, res: Response): Promise<any> => {
    const { testData } = req.body

    if (!testData) res.json({
        error: "No data received!"
    })

    const data = await prisma.test.create({
        data: {
            testData
        }
    })
        .catch((e) => console.log(e))

    res.json(data || { data: undefined })
})

app.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});