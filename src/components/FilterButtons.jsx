import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

// Create a styled button component directly
const FilterButton = styled.button`
  background-color: white !important;
  color: black !important;
  border: 2px solid black !important;
  border-radius: 0 !important;
  padding: 6px 14px !important;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0 !important;
  }

  &.active {
    border-color: red !important;
    color: red !important;
    background-color: white !important;
  }
`;

const FilterContainer = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const NoTags = styled.span`
  color: #666;
  font-style: italic;
  font-size: 14px;
`;

function FilterButtons({ uniqueTags, selectedTag, onToggleFilter }) {
  return (
    <FilterContainer>
      <p>Filter by tag:</p>
      <i>Please select a tag below to filter todo list items by selected tag</i>
      <ButtonsContainer>
        {uniqueTags.length === 0 ? (
          <NoTags>
            No tags available. Please add a tag to one of the items to see
            available tags
          </NoTags>
        ) : (
          uniqueTags.map((tagName) => (
            <FilterButton
              key={tagName}
              className={selectedTag === tagName ? "active" : ""}
              onClick={() => onToggleFilter(tagName)}
            >
              {tagName}
            </FilterButton>
          ))
        )}
      </ButtonsContainer>
    </FilterContainer>
  );
}

export default observer(FilterButtons);
