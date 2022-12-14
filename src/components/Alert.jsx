import React from 'react'
import { useContext } from 'react'
import noteContext from '../contex/notes/noteContext'

const Alert = () => {
    const context = useContext(noteContext)
    const{alert,setalert}  = context
    if((alert.status)){
        console.log('this is alert testing')
        setTimeout(()=>{
             setalert({status:false,message:'this is alert for now ',color:'danger'})
        },2000)
        return (
          <>
            <div style={{padding:'9px'}} class={`alert alert-${alert.color} alert-dismissible fade show`} role="alert">
                <strong>{alert.message}</strong> 
                <button style={{padding:'9px'}} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
        )
    }
}

export default Alert
