const express = require("express")
const dbConnect =require("./db")
const productModel = require("./productModel")

const app = express()

const port = 3333
const hostname = "127.0.0.2"


//middleware
app.use(express.json())

app.get("/users",async(req,res)=>{
    let data = await userModel.find()
    // let data = await userModel.findOne()
    console.log(data);
    res.send(data)
})

//api to create a product
//api is http://127.0.0.2:3333/newproduct
app.post("/newproduct",async(req,res)=>{
 
    console.log(req.body);
    let data = new productModel(req.body)
    await data.save()
    res.send("data recieved")
})

//api to find product by id
//api is http://127.0.0.2:3333/products/1   
//here 1 is the id ,so you can change it accroding to your id which you want to search
app.get("/products/:id",async(req,res)=>{
    console.log(req.params);
    let data = await productModel.find({
       $or:[
            {id: {$regex:req.params.id}}
        ]
    })
    res.send(data)
    // res.send("data")
})

//api to delete a product by id
//api is http://127.0.0.2:3333/delete/1
//here 1 is the id ,so you can change it accroding to your id which you want to delete
app.delete("/delete/:id",async(req,res)=>{
    console.log(req.params);
    let result = await productModel.deleteOne({
       $or:[
            {id: {$regex:req.params.id}}
        ]
    })
    console.log(result);
    res.send("user deleted")
})
    
// Create an api to fetch all products with filters and pagination
//api is http://127.0.0.2:3333/products?page=1&pageSize=1&productName=nokia&category=smartphone
app.get('/products', async (req, res) => {
    try {
      // Extract query parameters
      const { page = 1, pageSize = 10, productName, category } = req.query;
  
      // Build the filter object based on provided parameters
      const filter = {};
      if (productName) {
        filter.product_name = { $regex: productName, $options: 'i' }; // Case-insensitive regex for partial matching
      }
      if (category) {
        filter.product_category = { $regex: category, $options: 'i' };
      }
      // if (category) {
      //   filter.product_category = category; //case sensetive
      // }
  
      // Calculate skip and limit for pagination
      const skip = (page - 1) * pageSize;
      const limit = parseInt(pageSize);
  
      // Query the database with pagination and filtering
      const products = await productModel
        .find(filter)
        .skip(skip)
        .limit(limit);
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  





app.listen(port,hostname,()=>{
    dbConnect()
    console.log(`server started at http://${hostname}:${port}`);
})