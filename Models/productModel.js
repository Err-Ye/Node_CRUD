const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,'Please enter product name']
        },
        quentity : {
            type : Number,
            required : true,
            default : 0
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : false
        }
    },{
        timestamps : true
    }
)

const product = mongoose.model('Product',schema)

module.exports = product;