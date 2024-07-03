import React, { useState, useEffect, useRef } from "react";
import './faq.css';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqRef = useRef([]);

    const handleAccordionClick = (index) => {
        if (window.faqTimeout) clearTimeout(window.faqTimeout);

        window.faqTimeout = setTimeout(() => {
            setActiveIndex(activeIndex === index ? null : index);
        }, 100); // 2000ms delay for the answer to appear
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('accordion-item-in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        faqRef.current.forEach((faqItem, index) => {
            observer.observe(faqItem);
        });

        return () => {
            observer.disconnect();
            if (window.faqTimeout) clearTimeout(window.faqTimeout);
        };
    }, []);

    const faqItems = [
        "What is being a campus ambassador for SPIRIT ?",
        "What are the skills required to become a campus ambassador ?",
        "How to become a Campus Ambassador?",
        "How many CA's can be there from a college?",
        "How is Campus Ambassador's performance ranked ?"




    ];

    return (
        <div className="faq-main" id="faq">
            <div className="faq-title">
                <h2>FAQ's</h2></div>
            <div className="faq-container">
            
            {faqItems.map((item, index) => (
                <div className="accordion-item" key={index} ref={el => faqRef.current[index] = el}>
                    <div
                        className="accordion-title"
                        onClick={() => handleAccordionClick(index)}
                    >
                        <div>{item}</div>
                    </div>
                    <div className={`accordion-content ${activeIndex === index ? 'accordion-content-active' : ''}`}>
                        {index === 0 && "A campus ambassador  is the person who is responsible for increasing the publicity and outreach of SPIRIT in their college and locality through various activities . In short, you would be the face of SPIRIT and as well as IIT Guwahati for the students in your college."}
                        {index === 1 && "Any college student with a valid student id card can become a campus ambassador if he is dedicated and passionate about being one."}
                        {index === 2 && "By registering on the Campus Ambassador portal of spirit , and filling in all the required details , you can simply wait for the confirmation from Team SPIRIT."}
                        {index === 3 && "There can be at max two Campus Ambassadors from a particular college . But depending on the particular college size, Team spirit can also increase the number of Campus Ambassadors, so just wait for the confirmation after registering."}
                        {index === 4 && "Depending on the efficiency upon which  various tasks, activities given by Team SPIRIT are done , every campus ambassador will be updated with their leaderboard positions which can be checked on the website ."}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Faq;
