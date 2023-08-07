const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        var num = Math.random();
        if(num >= 0.8){
            reject("!!num!! : " +num);
        }
        resolve(num);
    },2000)
})

p.then((result)=>{
    console.log("빰빰 : " + result);
})
.catch((error)=>{
    console.log("error"+error);
});
