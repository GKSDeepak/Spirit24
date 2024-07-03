import React, { useEffect, useRef } from "react";
import "./responsibility.css";
import "animate.css";

export default function Caresponsibility() {
  const responsibilityRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated", "animate__fadeIn"); // Add fadeIn animation class
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (responsibilityRef.current) {
      observer.observe(responsibilityRef.current);
    }

    return () => {
      if (responsibilityRef.current) {
        observer.unobserve(responsibilityRef.current);
      }
    };

  }, []);

  return (
    <div className="Responsibility" >
      <h1 className="heading">Responsibilities</h1>
      <div className="cardCollection" ref={responsibilityRef}>
        <div className="card1">
          <h2>Advertise</h2>
          <p className="tracking-in-contract">Publicise Spirit and its sponsors in your college by sharing posts and promoting content by becoming a focal point for your respective college.</p>
        </div>
        <div className="card1">
          <h2>Organise</h2>
          <p className="tracking-in-contract">Organise events, workshops and sessions regarding Spirit and what it has to offer with assistance from mentors.</p>
        </div>
        <div className="card1">
          <h2>Conduct</h2>
          <p className="tracking-in-contract">Help in management of elimination rounds in your college and city to select participants for the main event</p>
        </div>
        <div className="card1">
          <h2>Coordinate</h2>
          <p className="tracking-in-contract">Collaborate with the Spirit team in organising on-ground events in your city.</p>
        </div>
      </div>
    </div>
  );
}
