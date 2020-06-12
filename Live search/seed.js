require("./db")
const Word = require("./data")
const fs = require("fs")

function createJson(){
    const t = fs.readFileSync("./word.tsv")+ ""
    var r = [];
    var v = t.split("\n");
    for (var i = 0; i < v.length; i++) {
        var w = v[i].split("\t");
        r.push({
            "word":w[0],
            "value":w[1]
        })
    }
    return r
}
// fs.writeFileSync("word.json",JSON.stringify(createJson(),null,2))


async function createDatabase(){
    // await Word.create([{word:"hello",value:"something"},{word:"hello",value:"something"},{word:"hello",value:"something"}])
    const json = createJson()
    for(i in json){
        await Word.create(json[i])
        console.log(i)
    }
}
createDatabase()