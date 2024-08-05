import React, { useState } from 'react';

const MultiSelect = ({ categories, onCategoriesSelected }) => {
  const [selections, setSelections] = useState<Array<string>>([]);
  const [options, setOptions] = useState([categories]);

  const handleSelectionChange = (level, selectedId) => {
    const newSelections = [...selections];
    newSelections[level] = selectedId;

    const truncatedSelections = newSelections.slice(0, level + 1);
    setSelections(truncatedSelections);

    const newOptions = options.slice(0, level + 1);
    const selectedCategory = findCategoryById(categories, selectedId);

    if (selectedCategory && selectedCategory.children) {
      newOptions.push(selectedCategory.children);
    }
    setOptions(newOptions);

    const selectedCategories = truncatedSelections.map(id => findCategoryById(categories, id));
    onCategoriesSelected(selectedCategories);
  };

  const findCategoryById = (categories, id) => {
    for (const category of categories) {
      if (category._id === id) return category;
      if (category.children) {
        const found = findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div>
      {options.map((opts, level) => (
        <select
          key={level}
          value={selections[level] || ''}
          onChange={(e) => handleSelectionChange(level, e.target.value)}
        >
          <option value="" disabled>
            {level === 0 ? 'Select Category' : 'Select Subcategory'}
          </option>
          {opts.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default MultiSelect;