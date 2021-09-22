var ObjectId = require('mongodb').ObjectId;
const majorDiseaseCollection = require('../db').db().collection("MajorDiseases")

let MajorDiseases = function(data){
    this.data=data
    this.errors = []
}
MajorDiseases.prototype.cleanUp = function(){

    if(typeof(this.data.name)!="string") this.data.name = "";
    if(typeof(this.data.shortinfo)!="string") this.data.shortinfo = "";
    if(typeof(this.data.longinfo)!="string") this.data.longinfo = "";

    this.data = {
        name:this.data.name,
        shortinfo:this.data.shortinfo,
        longinfo:this.data.longinfo
    }
}
MajorDiseases.prototype.validate = function(){
    if(this.data.name.length == 0)  this.errors.push("must provide a disease-name");
    if(this.data.shortinfo.length == 0)  this.errors.push("must provide a disease-shortinfo");
    


}


MajorDiseases.prototype.createDisease = function(){
    
    return new Promise(async (resolve,reject)=>{
        this.cleanUp();
        this.validate();

        if(this.errors.length==0)
        {
            majorDiseaseCollection.insertOne(this.data);
            resolve();
        }
        else reject(this.errors);
    })
}

MajorDiseases.getAllData = function(){
    return new Promise(async (resolve,reject)=>{
        await majorDiseaseCollection.find({}).toArray().then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

MajorDiseases.findDisease = function(id) {
    return new Promise(async (resolve,reject)=>{
        try
        {
            id = new ObjectId(id);
            majorDiseaseCollection.findOne({_id:id}).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        }
        catch(err)
        {
            reject(err);
        }

    })
}

module.exports = MajorDiseases;

