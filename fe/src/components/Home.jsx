import React, { useState } from "react";
import "../css/Home.css";
import { contentData } from "../assets/home_assets/paragraphs";
import ItemList from "./ItemList"; // ייבוא רשימת הפריטים

export default function Home() {
  const [visibleContent, setVisibleContent] = useState(null);

  const handleToggleContent = (index) => {
    setVisibleContent(visibleContent === index ? null : index);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p className="home-paragraph">
        In today’s rapidly growing urban environments, efficient waste
        management has become crucial...
      </p>

      {contentData.map((item, index) => (
        <div key={index} className="content-section">
          <div
            className="content-header"
            onClick={() => handleToggleContent(index)}
          >
            <h2>{item.title}</h2>
            <span
              className={`arrow ${visibleContent === index ? "rotated" : ""}`}
            >
              &#x2193;
            </span>
          </div>
          {visibleContent === index && (
            <p className="content-paragraph">{item.content}</p>
          )}
        </div>
      ))}

      {/* ניהול רשימה */}
      <ItemList />
    </div>
  );
}
