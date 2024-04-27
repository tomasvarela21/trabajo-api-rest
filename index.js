import express, { json } from 'express';
import fs, { write } from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const readData = () =>{
    
    try{
        const data= fs.readFileSync("./db.json")
        return(JSON.parse(data));
    }catch(error){
        console.log(error);
    }
};

const writeData = () => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data))
    }catch(error){
        console.log(error);
    }
}
//readData();

app.get("/",(req, res) => {
    res.send("Welcome to my first API with Node js!");
});

app.get("/books", (reg,res) =>{
    const data= readData();
    res.json(data.books);
} )

app.get("/books/:id", (reg, res) =>{
    const data= readData();
    const id = parseInt(reg.params.id);
    const book = data.books.find((book)=> book.id === id); 
    res.json(book);
});

app.post("./books", (reg, res) => {
    const data= readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1, 
        ...body,
    };
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});

app.put("./books/:id",(reg, res) => {
    const data= readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((books) => book.id === id );
    data.books[bookIndex]= {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({message:"Book updated succesfully"});
} );

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message: "Book deleted succesfully"});
    
})

app.listen(3000, ()=> {
    console.log("server listening on port 3000");
}); 
