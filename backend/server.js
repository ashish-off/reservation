import app from "./src/app.js";

app.get('/', (req, res) => {
    res.send('API is running....');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`server running on port ${process.env.PORT || 5000}`);

})