var fs = require ('fs')
    path = require ('path')

module.exports = {
  saveData: function (dataType, newData, data){
    var dataPath = dataType == 'users' ? __dirname + path.join('/data/users.json') :
        __dirname + path.join('/data/messages.json')
    data.current.push(newData)
    return new Promise(function (resolve, reject){
      fs.writeFile (dataPath, JSON.stringify(data), function(err){
        if (err) reject(err)
        else resolve('OK')
      })
    })
  },
  getAllData: function () {
    var dataPath = __dirname + path.join('/data/data.json')
    return new Promise (function (resolve, reject){
              //console.log( "leyendo datos de: " + dataPath)
      fs.readFile (dataPath, 'utf8', function(err, readData){
        if (err) reject (err)
        else resolve(JSON.parse(readData))
      })
    })
  }
}
