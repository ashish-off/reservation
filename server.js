import app from "./app.js";


app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port ${process.env.PORT || 5000}`);

})