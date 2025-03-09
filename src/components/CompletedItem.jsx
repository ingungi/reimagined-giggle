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
  transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;
  border-bottom: 1px solid #e0e0e0;

  /* Hovering effects for list items*/
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

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
