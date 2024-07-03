import React from 'react'
import './profilecomponent.css'
const ProfileComp = () => {
  return (
    
      <div className='card1'>
        <div className='profiledetails'>
        <img className='pp' src='/img_1.jpg'></img>    
        <div className='pdetails'>
        < div className='p-large'>Username</div>
        <div className='p-small'>College Name</div>
</div>


        </div>
     
       <div className='row1'>
       <div className='rounded-rect'>
            <img src='./pencil.png'></img>
            <div className='p-small'> Edit Profile </div>
            
        </div>
        <div className='rounded-rect1'>
        <img src='./trophy.png'></img>
        <div className='p-small black'> Your Badges </div>
        </div>
        

       </div>
       
        
   
       
     
      </div>
    
  )
}

export default ProfileComp
