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
  removing = false,
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
    <li className={`${className} ${removing ? "removing" : ""}`}>
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
          {/*Conditional rendering depending on whether the user is typing or
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
                placeholder="Enter Tag name..."
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
        <button onClick={onComplete} className="done-button">
          Done
        </button>
        <button onClick={inProgress} className="inprog-button">
          In Progress
        </button>
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
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 10px;

  /* Hovering effects for list items*/
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .todo-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: 12px;
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
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  button:hover {
    background-color: #3367d6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
  .done-button {
    background-color: #34a853;
  }
  .done-button:hover {
    background-color: #2d9147;
  }
  .inprog-button {
    background-color: #fbbc05;
    color: #333;
  }
  .inprog-button:hover {
    background-color: #f0ad0e;
    color: #333;
  }

  .add-tag-btn:hover {
    background-color: #f0f0f0;
  }

  .remove-btn {
    background-color: red;
  }

  .remove-btn:hover {
    background-color: white;
    color: red;
    border: solid 1px red;
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
    /* For the strikethrough animation */
  &.removing {
    position: relative;
    pointer-events: none;
  }

  &.removing::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;  // Makes the line longer than the item element
    right: -10px;
    height: 2px;
    background-color: red;
    animation: strikethrough 0.5s ease-in-out forwards;
    transform-origin: left;
    z-index: 1; // Ensures the line appears over list element
  }

  &.removing {
    animation: fadeOut 0.8s forwards;
    animation-delay: 0.5s;
  }

  @keyframes strikethrough {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }
`;
