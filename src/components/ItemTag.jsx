import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

function ItemTag({ className, name, onRemove }) {
  return (
    <div className={className}>
      <span className="tag-name">{name}</span>
      <button onClick={onRemove} className="remove-tag">
        ×
      </button>
    </div>
  );
}

export default styled(observer(ItemTag))`
  display: inline-flex;
  align-items: center;
  background-color: #e1f5fe; // Light blue background that works with your theme
  color: #0277bd; // Darker blue text
  border-radius: 4px; // Slightly rounded corners
  padding: 3px 8px;
  margin-right: 6px;
  margin-bottom: 4px;
  font-size: 12px;

  .tag-name {
    margin-right: 4px;
  }

  .remove-tag {
    background: none;
    border: none;
    color: #0277bd;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  .remove-tag:hover {
    color: #01579b;
  }
`;
