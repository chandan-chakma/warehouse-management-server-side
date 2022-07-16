const express = require('express');
const port = process.env.PORT || 5000;
const app = express();



// user store
// password 5xg4idBmIN95YwVN

app.get('/', (req, res) => {
    res.send('hello girl')
})

app.listen(port, () => {
    console.log('listening to port', port)
})
