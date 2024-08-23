

async function allUsers(){
    try {

         
        
    } catch (err) {
        
        resizeBy.status(400).json({
            message : err.messsage || err,
            error : true,
            success : false
        })
        
    }
}

module.exports = allUsers