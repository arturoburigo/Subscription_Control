import express, {Request, Response, NextFunction} from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './routes'


const app = express()
const port = 3333

app.use(express.json())
app.use(cors())
app.use(router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'Error',
        message: 'Internal server error'
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
