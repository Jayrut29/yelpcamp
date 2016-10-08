
var mongoose    = require("mongoose");


var yelpSchema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : String,
     price: Number,
    author      : {
        id: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    comments : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
        }
    ]
});

yelpSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
yelpSchema.path('price').set(function(num) {
  return num * 100;
});


module.exports = mongoose.model("ycampgrounds", yelpSchema);