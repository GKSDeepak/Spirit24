import React from 'react';
import './hero.css'
import ProfileComp from '../profile/profilecomponent';
const header = () => {
    return (
        <section className='Hero-wrap ' id="home">
            <div className=" animation">
            <ProfileComp></ProfileComp>
              </div>
        </section>
    )
}
export default header;