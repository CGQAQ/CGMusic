

function redirectMidlleware(req, res, next) {
    try {
        console.log(req.path)
    }catch(e){
        console.error(e.message)
    }finally {
        next()
    }
}


module.exports = {
    redirectMidlleware
};