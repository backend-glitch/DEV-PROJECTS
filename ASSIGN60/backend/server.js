import app from "./app.js";

const PORT = 5000 || process.env.PORT;

app.listen(PORT,() => {
    console.log(`server running on ${PORT}`);

})