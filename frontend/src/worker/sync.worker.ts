

self.onmessage = (e)=>{
    const {message} = e.data ;

    if(message ==="unsync"){
        console.log("aman")
    self.postMessage({message:"okk "})
}
}