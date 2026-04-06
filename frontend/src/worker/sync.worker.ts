import { sendTodos } from "../functions/sendTodos";


self.onmessage = async(e)=>{
    const {message} = e.data ;

    if(message ==="unsync"){
         const res:string | number | boolean = await sendTodos() ;
         if(res){
            self.postMessage({message:"SYNC_SUCCESS"})
         }else{
            self.postMessage({message:"SYNC_FAILED"})
         }
    self.postMessage({message:"okk "})
}
}