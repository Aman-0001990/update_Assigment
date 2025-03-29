import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = ({ item }) => {
    const [updatedValue, setUpdatedValue] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (item) {
            setUpdatedValue(item.name);
        }
    }, [item]);

    const handleInputChange = (event) => {
        setUpdatedValue(event.target.value);
    };

    const handleUpdate = () => {
        if (!item) return;

        axios
            .put(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, { name: updatedValue })
            .then((response) => {
                setMessage("Item updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating item:", error);
                setMessage("Failed to update item.");
            });
    };

    return (
        <div className="component">
            <h2>Update Item</h2>
            {item ? (
                <div>
                    <p>Current Value: {item.name}</p>
                    <input type="text" value={updatedValue} onChange={handleInputChange} />
                    <button onClick={handleUpdate}>Update</button>
                    {message && <p>{message}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateItem;
