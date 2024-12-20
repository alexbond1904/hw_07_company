import express, {Application} from 'express';
import companyRoutes from "./routes/companyRoutes";

const app:Application = express();
const PORT = 3000;

// app.use(express.json()); -> or ./utils/parseBody.ts
// asd
app.use('/api/company', companyRoutes);

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})
