import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ItemTag from "./ItemTag";

function TodoListItem({
  className,
  name,
  tags = [], // Default to empty array if not provided
  onComplete,
  onChange,
  onRemove,
  inProgress,
  onAddTag,
  onRemoveTag,
}) {
  // State to track if the user is typing
  const [isAddingTag, setIsAddingTag] = useState(false);
  // State to set the tag name that the user has typed
  const [newTagName, setNewTagName] = useState("");

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName("");
    }
    setIsAddingTag(false);
  };
  // Check if enter key is pressed then call handler function i.e.  Press Enter to set Tag Name
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    } else if (e.key === "Escape") {
      // Press Esc to cancel name input
      setIsAddingTag(false);
      setNewTagName("");
    }
  };
  return (
    <li className={className}>
      <div className="todo-content">
        <input className="todo-input" onChange={onChange} value={name} />
        <div className="tag-container">
          {tags.map((tag) => (
            <ItemTag
              key={tag.id}
              name={tag.name}
              onRemove={() => onRemoveTag(tag.id)}
            />
          ))}
          {/*Conditional rendering depending on whether the suer is typing or
          not */}
          {isAddingTag ? (
            <div className="new-tag-input-container">
              <input
                type="text"
                className="new-tag-input"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onBlur={handleAddTag}
                onKeyDown={handleKeyDown}
                placeholder="Tag name..."
                autoFocus
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTag(true)}
              className="add-tag-btn"
            >
              + Tag
            </button>
          )}
        </div>
      </div>
      <div className="button-container">
        <button onClick={onComplete}>Done</button>
        <button onClick={inProgress}>In Progress</button>
        <button onClick={onRemove} className="remove-btn">
          ×
        </button>
      </div>
    </li>
  );
}

export default styled(observer(TodoListItem))`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;

  .todo-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .todo-input {
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    color: #333333;
    font-family: "Inter", sans-serif;
    margin-bottom: 8px;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .button-container {
    display: flex;
    align-items: center;
  }

  button {
    margin-left: 8px;
  }

  .add-tag-btn {
    background: none;
    border: 1px dashed #999;
    color: #666;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    cursor: pointer;
  }

  .add-tag-btn:hover {
    background-color: #f0f0f0;
  }

  .remove-btn {
    cursor: pointer;
    color: #666;
    font-weight: bold;
    background: none;
    border: none;
    font-size: 18px;
  }

  .remove-btn:hover {
    color: red;
  }
  .new-tag-input-container {
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 4px;
  }

  .new-tag-input {
    padding: 3px 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 12px;
    width: 100px;
  }

  .new-tag-input:focus {
    outline: none;
    border-color: #4285f4;
  }
`;
