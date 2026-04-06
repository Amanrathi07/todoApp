

self.onmessage = (e)=>{
    const {message} = e.data ;

    if(message ==="ping"){
    self.postMessage({message:"pong"})
}
}