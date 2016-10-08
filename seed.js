var mongoose        = require("mongoose");
var ycampgrounds    = require("./models/Ycampgrounds");
var  Comment        = require("./models/comment");


var data = [
    {    name: "Yosemati Fall",
         image : "https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg",
         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {    name: "Nevada Fall",
         image : "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
         description : "bLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {    name: "very Screat Fall Creek",
         image : "https://farm5.staticflickr.com/4043/4475243824_c63479a1cd.jpg",
         description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]


function seedDB(){

ycampgrounds.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("Remove All the Campground");
      data.forEach(function(seed){
      ycampgrounds.create(seed,function(err, campground){
          if(err){
              console.log(err);
          }else{
              console.log("Campground Created");
              Comment.create(
                  { title: "I wish there was a water for free here",
                     author: "Mr. Patel "
                  },function(err,comment) {
                      if(err){
                          console.log(err);
                      }else{
                         
                          campground.comments.push(comment);
                            campground.save();
                          console.log("New Comment Added");
                      }
                  });
                  }
            }) ;
    });
});

}


module.exports = seedDB;