import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ItemTag from "./ItemTag";

function CompletedItem({ className, name, tags = [], onRemove }) {
  return (
    <li className={className}>
      <div className="completed-content">
        {name}
        <div className="tag-container">
          {tags.map((tag) => (
            <ItemTag key={tag.id} name={tag.name} />
          ))}
        </div>
      </div>

      <div className="button-container">
        <button onClick={onRemove} className="remove-btn">
          ×
        </button>
      </div>
    </li>
  );
}

export default styled(observer(CompletedItem))`
  display: flex;
  align-items: center;
  background: #d4edda;
  color: #333;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 16px;
  transition: transform 0.2s ease-in-out;
  border-bottom: 1px solid #e0e0e0;
  transform: scale(1.05); /* Makes the button hover when mouse is over it*/

  .completed-content {
    display: flex;
    flex-direction: column;
    flex: 1;
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

  .remove-btn {
    margin-left: 8px;
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
`;
