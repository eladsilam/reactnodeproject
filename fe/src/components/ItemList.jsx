import React, { useState } from "react";
import "../css/ItemList.css";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditText(items[index]);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== "") {
      const updatedItems = [...items];
      updatedItems[editIndex] = editText.trim();
      setItems(updatedItems);
      setEditIndex(null);
      setEditText("");
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
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {item}
                <button
                  className="edit-btn"
                  onClick={() => handleEditItem(index)}
                >
                  ✏ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteItem(index)}
                >
                  🗑 Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
