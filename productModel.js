const mongoose = require("mongoose")


const productScheema = new mongoose.Schema({
    id: {
        type:String,
        required:true
    }, 
    product_name: {
        type:String,
        required:true
    }, 
    product_category:{
        type:String,
        required:true
    }, 
    image_url:{
        type:String,
        required:true
    }, 
    product_description:{
        type:String,
        required:true
    },
    
    // }
})


const productModel = mongoose.model("product",productScheema)

module.exports = productModel
