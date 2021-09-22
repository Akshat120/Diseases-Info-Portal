const MajorDiseases = require('../models/MajorDiseases')

exports.home = function(req,res){
    res.render(`home`)
}

exports.majorDiseases = function(req,res){
    MajorDiseases.getAllData().then((data)=>{
        res.render(`majordiseases`,{data:data})
    }).catch((err)=>{
        res.send(`Server Issue! ${err}`);
    })

}

exports.addDiseaseForm = function(req,res){
    res.render(`addDisease`)
}

exports.addDisease = function(req,res){
    let data = req.body;

    let Disease = new MajorDiseases(data);
    Disease.createDisease().then(()=>{
        res.redirect('/majorDiseases')
    }).catch((err)=>{
        res.send(`error: ${err}`);
    })
}

exports.diseaseprofile = function(req,res) {
    let id = req.params.diseaseid;
    MajorDiseases.findDisease(id).then((data)=>{
        res.render('diseaseprofile',{data:data})
    }).catch((err)=>{
        res.send(`error: ${err}`)
    })
}



