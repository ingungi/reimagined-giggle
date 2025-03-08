import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { observable } from "mobx";
import { v4 as uuid } from "uuid";

import TodoListItem from "./TodoListItem";
import CompletedItem from "./CompletedItem";
import InProgressItem from "./InProgressItem";
import FilterButtons from "./FilterButtons";

function TodoList({ className }) {
  const [store] = useState(createTodoStore);

  return (
    <div className={className}>
      <header>
        <h1 className="title">
          Let's Get it Done: <i>Ratehub TODO Exercise</i>
        </h1>
      </header>
      <section>
        <h2 className="completedTitle">My To-do List</h2>
        <ul>
          {store.activeItems.map((item) => (
            <TodoListItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              isComplete={item.isComplete}
              onComplete={() => store.setCompleted(item.id)}
              onChange={(e) => store.setItemName(item.id, e.target.value)}
              onRemove={() => store.removeItem(item.id)}
              inProgress={() => store.setInProgress(item.id)}
              onAddTag={(tagName) => store.addTag(item.id, tagName)}
              onRemoveTag={(tagId) => store.removeTag(item.id, tagId)}
            />
          ))}
        </ul>
        <button onClick={store.addItem}>Add New Item</button>
      </section>
      <hr />
      <section>
        <h2 className="completedTitle">In Progress</h2>
        <ul>
          {store.inProgressItems.map((item) => (
            <InProgressItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              onComplete={() => store.setCompleted(item.id)}
              onRemove={() => store.removeItem(item.id)}
              notInProgress={() => store.setNotInProgress(item.id)}
            />
          ))}
        </ul>
      </section>
      <hr />
      <section>
        <h2 className="completedTitle">List of Complete Items</h2>
        <ul>
          {store.completedItems.map((item) => (
            <CompletedItem
              key={item.id}
              name={item.name}
              tags={item.tags}
              onRemove={() => store.removeItem(item.id)}
            />
          ))}
        </ul>
      </section>
      <hr />
      <footer>
        <FilterButtons
          uniqueTags={store.allUniqueTags}
          selectedTag={store.selectedFilterTag}
          onToggleFilter={(tagName) => store.toggleTagFilter(tagName)}
        />
      </footer>
    </div>
  );
}

function createTodoStore() {
  const self = observable({
    items: [
      {
        id: uuid(),
        name: "Sample item",
        isComplete: false,
        inProgress: false,
        tags: [],
      },
    ],
    // Store-level property to track selected filter
    selectedFilterTag: null,
    // Make sure not in progress as well
    get activeItems() {
      let filtered = self.items.filter((i) => !i.isComplete && !i.inProgress);
      // Apply tag filter if one is selected
      if (self.selectedFilterTag) {
        filtered = filtered.filter((item) =>
          item.tags.some((tag) => tag.name === self.selectedFilterTag)
        );
      }
      return filtered;
    },
    get completedItems() {
      let filtered = self.items.filter((i) => i.isComplete);
      // Apply tag filter if one is selected
      if (self.selectedFilterTag) {
        filtered = filtered.filter((item) =>
          item.tags.some((tag) => tag.name === self.selectedFilterTag)
        );
      }
      return filtered;
    },
    // Make sure not in complete as well (shows up in both lists otherwise)
    get inProgressItems() {
      let filtered = self.items.filter((i) => i.inProgress && !i.isComplete);
      // Apply tag filter if one is selected
      if (self.selectedFilterTag) {
        filtered = filtered.filter((item) =>
          item.tags.some((tag) => tag.name === self.selectedFilterTag)
        );
      }
      return filtered;
    },
    // returns array of the todo list item tags
    get itemTags() {
      return self.tags;
    },
    get allUniqueTags() {
      // Collect all tags from items into a single array
      let allTags = self.items.flatMap((item) => item.tags || []);
      // Turn into array. The ".map(tag => tag.name)" part was added to prevent returning objects
      const filters = [...new Set(allTags.map((tag) => tag.name))];
      return filters;
    },
    addItem() {
      self.items.push({
        id: uuid(),
        name: `Item ${self.items.length}`,
        tags: [], // To store item tags
      });
    },
    setItemName(id, name) {
      const item = self.items.find((i) => i.id === id);
      item.name = name;
    },
    // Allows for tag to accept user inputted name but name is defaulted to something like "Tag 0"
    addTag(
      itemId,
      tagName = `Tag ${self.items.find((i) => i.id === itemId).tags.length}`
    ) {
      const item = self.items.find((i) => i.id === itemId); // Grabs item with id param
      item.tags.push({
        // Adds tag to the tag[] of specified item
        id: uuid(),
        name: tagName,
      });
    },
    setTagName(itemId, tagId, name) {
      const item = self.items.find((i) => i.id === itemId); // Grabs item with id param
      const itemTags = item.tags; // Array of item Tags
      const tag = itemTags.find((i) => i.id === tagId); // Grab specified tag
      tag.name = name;
    },
    setCompleted(id) {
      const item = self.items.find((i) => i.id === id);
      item.isComplete = true;
    },
    setInProgress(id) {
      const item = self.items.find((i) => i.id === id);
      item.inProgress = true;
    },
    setNotInProgress(id) {
      const item = self.items.find((i) => i.id === id);
      item.inProgress = false;
    },
    removeItem(id) {
      self.items = self.items.filter((i) => i.id !== id);
    },
    removeTag(itemId, tagId) {
      const item = self.items.find((i) => i.id === itemId); // Grabs item with id param
      item.tags = item.tags.filter((i) => i.id !== tagId);
    },
    toggleTagFilter(tagName) {
      // If this tag is already selected, clear the filter
      if (self.selectedFilterTag === tagName) {
        self.selectedFilterTag = null;
      } else {
        // Otherwise, set it as the filter
        self.selectedFilterTag = tagName;
      }
    },
  });

  return self;
}

export default styled(observer(TodoList))`
  max-width: 750px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .title {
    font-family: "Poppins", sans-serif;
    color: #333;
    font-weight: 600;
  }

  .completedTitle {
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    color: #333333;
  }
  button {
    background-color: #4285f4;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
`;
