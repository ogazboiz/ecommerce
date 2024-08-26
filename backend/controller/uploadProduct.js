const uploadProductPermission = require("../helpers/permission")
const productModel = require("../models/productModel")

async function UploadProductController(req,res){
    try {

        const sessionUserId = req.sessionUserId


        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")

        }



        const UploadProduct =new productModel(req.body)
        const saveProduct = await UploadProduct.save()

        res.status(201).json({
            message : "Product upload succesfully",
            success : true,
            error : false,
            data : saveProduct
            
        } )
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        } )
    }

} 

module.exports = UploadProductController