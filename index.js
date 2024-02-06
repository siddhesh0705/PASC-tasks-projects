const express = require("express");

const app = express();

//to parse the request body
app.use(express.json());


//Books Api Routes: GET, POST, PUT, DELETE
let books = [
    {
        id: 1,
        name: "Harry Potter",
        author: "J.K. Rowling"
    },
    {
        id: 2,
        name: "The Alchemist",
    },
    {
        id: 3,
        name: "The Da Vinci Code",
    }

];


app.get("/getallbooks", (req, res) => {
    try {
        res.status(200).json({books});

    } catch (error) {
        res.status(404).send("plzz enter valid request");
    }
})
app.post("/addbooks",(req,res)=>{
    const {id,name,author} = req.body;

    if(!id || !name || !author){
        return res.status(404).send("plzz provide the given fields");
    }

    if(books.find(book => book.id === id)){
        return res.status(404).send("this book already exists");
    }

    const newbooks = {id,name,author};

    books.push(newbooks);

    res.status(201).json(newbooks).send("books added successfully");
})

app.put("/updatebooks/:id",(req,res)=>{
    try {
        const id = parseInt(req.params.id);

    const {name,author} = req.body;

    const index = books.findIndex(book => book.id === id);

    if(index === -1){
        return res.status(404).send("book u searched is not available");
    }

    if(name){
        books[index].name = name;
    }
    if(author){
        books[index].author = author;
    }

    res.status(200).json(books[index]);
    } catch (error) {
        res.status(500).send("plzz provide book");
    }
  
})

app.delete("/deletebooks/:id",(req,res)=>{
    try {
        const id = parseInt(req.params.id);

        const {name,author} = req.body;

        const index = books.findIndex(book => book.id === id);

        if(index === -1){
            res.status(404).send("no such book found");
        }

        books.splice(index,1);

        res.status(200).send("book deleted successfully");
    } catch (error) {
        res.status(500).send("plzz provide valid input");
    }
})
// Add other requests GET, POST, PUT, DELETE



app.listen(8000, () => {
    console.log(`App is live on: http://localhost:8000`);
});