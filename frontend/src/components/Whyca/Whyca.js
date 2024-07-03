import React from 'react';
import { useInView } from 'react-intersection-observer';
import "./Whyca.css";
import 'animate.css';

export default function Whyca() {
    const { ref: headingRef, inView: headingInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: listRef, inView: listInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <>
            <h1 
                ref={headingRef} 
                className={`heading animate__animated ${headingInView ? 'animate__bounceInUp animate__slow' : ''}`}
            >
                Why become CA?
            </h1>
            <ul 
                ref={listRef} 
                className={`tracking-in-contract ${listInView ? 'visible' : ''}`}
            >
                <li><strong>Improve your Skills :</strong> Enhance your communication & Management skills.</li>
                <li><strong>Be a Leader :</strong> Represent your college as you help organise one of North East India's largest sports festival.</li>
                <li><strong>Mentorship and Internship :</strong> Team Spirit at IIT Guwahati offers an excellent opportunity to learn diverse skills such as Business Development, Leadership, Marketing, Branding, and Sales.</li>
                <li><strong>Networking :</strong> Interact with people coming from diverse fields across the country to develop your network.</li>
                <li><strong>FREE COURSES:</strong> Top-performing CAs will get access to online courses and a performance-based earning opportunity.</li>
            </ul>
        </>
    );
}
