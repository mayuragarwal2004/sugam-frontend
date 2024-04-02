const express = require('express');
const cors =require("cors");

const app = express();
app.use(cors());
app.post('/api/res_tot', (req, res) => {
    const data = {
        resolved: [20,30,40,50,60,70,80,90,100],
        total: [50,60,70,80,90,100,110,120,130]
    };
    console.log(data.resolved);
    console.log(data.total);

    res.json(data);
});

app.listen(3012, () => {
    console.log('Server is running on port 3012');
});