import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const apiUrl = "http://localhost:5000/api/v1/items";
  const [data, setData] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  const fetchInfo = () => {
    return axios.get(apiUrl).then((res) => {
      setData(res.data.tasks);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleInputChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handleAddItem = () => {
    axios
      .post(apiUrl, { name: newItemName })
      .then(() => {
        setNewItemName("");
        fetchInfo();
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1 style={{ color: "green" }}>WEB CRUD APPLICATION</h1>
      <div>
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <ul style={{ listStyleType: "none" }}>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item._id} style={{ margin: "10px 0" }}>
              <div
                style={{
                  backgroundColor: "#35D841",
                  padding: "2px",
                  borderRadius: "10px",
                  width: `${item.name.length * 15}px`,
                }}
              >
                {item.name}
              </div>
            </li>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
