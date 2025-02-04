import React, { useState } from "react";
import "../css/ItemList.css"; // עיצוב (אם יש לך)

export default function ItemList() {
  const [items, setItems] = useState([]); // רשימת הפריטים
  const [newItem, setNewItem] = useState(""); // שדה טקסט לפריט חדש

  // הוספת פריט חדש לרשימה
  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem.trim()]); // מוסיף לרשימה
      setNewItem(""); // מאפס את השדה
    }
  };

  return (
    <div className="item-list-container">
      <h2>Manage List</h2>
      <input
        type="text"
        placeholder="Enter new item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
