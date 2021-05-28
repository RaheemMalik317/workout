const Express = require('express');
const app = Express();

const controllers = require("./controllers")

app.use("/workout", controllers.workoutController)

app.listen(3000, () =>{
    console.log(`[Server]: App is listening on 3000`);
});
app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
});
