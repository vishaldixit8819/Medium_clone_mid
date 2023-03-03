const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    content:{
        type:String,
        required:true
    }
});

const articles=mongoose.model('Article',schema);

module.exports=articles;
