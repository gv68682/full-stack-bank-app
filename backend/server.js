
import {} from 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'
import authMiddleware from './middlewares/authenticateJWT.js'

import authRouter from './routes/auth.js';
import dataRouter from './routes/data.js';


const corsOptions = {
  origin: [ 'http://localhost:3000',
          'http://padma-vel-full-stack-bank-app.s3-website-us-east-1.amazonaws.com',
  ],
}

app.use(cors(corsOptions))
app.use(express.json())
//app.use(authMiddleware)
app.use(express.urlencoded({ extended: false }))


app.use('/auth', authRouter);
app.use('/data', authMiddleware, dataRouter);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(path.resolve(), 'index.html'));
// });


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on port ${port}`))
//app.listen(3001, () => console.log('Server listening on port 3001'))
