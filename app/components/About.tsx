"use client";

import React from "react";

const About = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#704d37", marginBottom: "20px" }}>About Book Finder</h1>
      <p className="about-p">
        Welcome to <strong>Book Finder</strong>, your one-stop application for discovering books quickly and easily! 
        This app allows users to search for books by title and access essential details, such as the author, 
        publication year, genre, and description. Whether you're looking for your next read or exploring book information, 
        Book Finder is here to help.
      </p>
      <p className="about-p">
        The application is powered by the <a href="https://openlibrary.org/" target="_blank" style={{ color: "#704d37", textDecoration: "none" }}>Open Library API</a>, 
        a free and open platform for book enthusiasts. It ensures accurate and up-to-date book data for an excellent user experience.
      </p>

      <h2 style={{ color: "#704d37", marginTop: "30px" }}>About the Developer</h2>
      <p className="about-p">
        Hi, I'm <strong>Marc Codrington</strong>, a passionate software developer and UI/UX designer based in Paramaribo, Suriname. 
        I specialize in building user-friendly and visually appealing applications, leveraging my skills in JavaScript, 
        React, Next.js, and other modern web technologies.
      </p>
      <p className="about-p">
        As a student of Software Engineering at UNASAT, I’m committed to learning and creating impactful solutions. 
        Book Finder is a demonstration of my dedication to crafting practical, efficient, and beautiful applications.
      </p>
      <p className="about-p">Feel free to connect with me via LinkedIn or explore more of my work on GitHub:</p>
      <ul style={{ listStyleType: "none", paddingLeft: 0, marginTop: "10px" }}>
        <li>
          <a href="https://www.linkedin.com/in/marccodrington/" target="_blank" style={{ color: "#dfc778", textDecoration: "none" }}>
            LinkedIn Profile
          </a>
        </li>
        <li>
          <a href="https://github.com/CarelessWhissper" target="_blank" style={{ color: "#dfc778", textDecoration: "none" }}>
            GitHub Repository
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;
