import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedArticle, setEditedArticle] = useState({ title: "", content: "" });
  const [newArticle, setNewArticle] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get("/articles/all-articles")
      .then((response) => setArticles(response.data.articles))
      .catch(() => setError("Failed to fetch articles"));

    axios.get("/users/session", { withCredentials: true })
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleArticleClick = (article) => {
    console.log("📌 Article clicked:", article);
    console.log("👤 Logged-in user:", user);
    setSelectedArticle(article);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedArticle({ ...selectedArticle });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    axios.put(`/articles/${editedArticle.id}`, editedArticle, { withCredentials: true })
      .then(() => {
        setArticles(articles.map(a => a.id === editedArticle.id ? editedArticle : a));
        setIsEditing(false);
        setSelectedArticle({ ...editedArticle });
      })
      .catch(console.error);
  };

  const handleDelete = () => {
    axios.delete(`/articles/${selectedArticle.id}`, { withCredentials: true })
      .then(() => {
        setArticles(articles.filter(a => a.id !== selectedArticle.id));
        setSelectedArticle(null);
      })
      .catch(console.error);
  };

  const handleAddArticle = () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) {
      alert("Title and Content are required.");
      return;
    }

    axios.post("/articles", newArticle, { withCredentials: true })
      .then((response) => {
        setArticles([...articles, response.data.article]);
        setIsAdding(false);
        setNewArticle({ title: "", content: "" });
      })
      .catch(console.error);
  };

  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  const handleClosePopup = () => {
    setSelectedArticle(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="articles-container">
      <h1>Articles</h1>
      {user && <button className="add-button" onClick={() => setIsAdding(true)}>Add Article</button>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="articles-list">
        {articles.map((article) => (
          <li key={article.id}>
            <button className="article-button" onClick={() => handleArticleClick(article)}>
              {article.title}
            </button>
          </li>
        ))}
      </ul>

      {/* פופאפ להצגת מאמר */}
      {selectedArticle && !isEditing && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={handlePopupClick}>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.content}</p>
            <p><strong>Author:</strong> {selectedArticle.author}</p>

            {user && selectedArticle && Number(user.id) === Number(selectedArticle.author_id) && (
              <>
                <button className="edit-button" onClick={handleEdit}>Edit</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
              </>
            )}

            <button className="close-button" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* פופאפ לעריכת מאמר */}
      {isEditing && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={handlePopupClick}>
            <input type="text" value={editedArticle.title} onChange={(e) => setEditedArticle({ ...editedArticle, title: e.target.value })} />
            <textarea value={editedArticle.content} onChange={(e) => setEditedArticle({ ...editedArticle, content: e.target.value })} />
            <button className="save-button" onClick={handleSaveEdit}>Save</button>
            <button className="close-button" onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}

      {/* פופאפ להוספת מאמר */}
      {isAdding && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={handlePopupClick}>
            <input type="text" placeholder="Title" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} />
            <textarea placeholder="Content" value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} />
            <button className="save-button" onClick={handleAddArticle}>Add</button>
            <button className="close-button" onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
