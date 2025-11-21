const express=require("express");
const cors=require("cors");
const app=express();
const PORT=3000;

app.use(cors());
app.use(express.json());

const products=require("./data/products.json");
const categories=require("./data/categories.json");

app.get("/api/products",(req,res)=>res.json(products));

app.get("/api/products/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const p=products.find(x=>x.id===id);
  if(!p) return res.status(404).json({error:"Producto no encontrado"});
  res.json(p);
});

app.get("/api/categories",(req,res)=>res.json(categories));

app.listen(PORT,()=>console.log("API http://localhost:"+PORT));
