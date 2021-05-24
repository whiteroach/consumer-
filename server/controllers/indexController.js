const Item = require('../models/Item')

exports.displayList = (req,res) => {
    Item.find()
    .sort({priority:1})
    .exec(
        (err,item)=>{
            res.json(item)
        }
    )
}

exports.addItemToList = (req,res) => {
    const newItem = new Item({
        item:req.body.item,
        priority:req.body.priority,
    })
    newItem.save((err,doc)=>{
        res.json({msg:`${doc.item} successfully added.`})
    })
}

exports.deleteItem = (req,res) => {
    const itemId = req.params.id
    console.log(itemId,'id')

    Item.findByIdAndDelete(itemId, (err, item)=>{
            res.json({msg:`${item.item} successfully removed.`})
    })
}

exports.updateItem = (req,res) => {
    itemId = req.body.id;
    console.log(req.body)
    if(req.body.item == ''){
        Item.findById(itemId,(err,doc)=>{
            Item.findByIdAndUpdate(itemId,{item:doc.item, priority: req.body.priority},(err,docs)=>{
                
                if(err){console.log(err)}else{res.json({msg:`${docs.item}, updated `})}
            })

        })
    }else{
        Item.findByIdAndUpdate(itemId,{item: req.body.item, priority: req.body.priority},(err,docs)=>{
            
            if(err){console.log(err)}else{res.json({msg:`${docs.item},  updated successfully`})}
        })

    }
}

exports.purchased = (req,res) => {
    const itemId = req.body.id;
    console.log(req.body.id, '52')
    Item.findByIdAndUpdate(itemId,{priority: 5},(err,docs)=>{
        if(err){console.log(err)}else{res.json({msg:'success!'})}
    })
}