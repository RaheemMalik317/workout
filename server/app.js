require('dotenv').config();
const Express = require('express');
const app = Express();
app.use(Express.json());
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require("./middleware");


app.use(middleware.headers);
app.use("/user", controllers.userController);

app.use("/workout", controllers.workoutController);



dbConnection.authenticate()
.then(() => dbConnection.sync(
    // {force: true}
))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening indeed.`);
    });   
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});

// app.listen(3000, () =>{
//     console.log(`[Server]: App is listening on 3000`);
// });

app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
});
