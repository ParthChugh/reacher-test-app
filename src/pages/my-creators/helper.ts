export const updateFilters = (filters, paramsObject) => {
  // Iterate over each key in the paramsObject
  Object.entries(paramsObject).forEach(([key, values]) => {
    // Split the values by commas to get an array of selected values
    const selectedValues = values.split(",");

    // Check if the filter exists in the filters object
    if (filters[key] && filters[key].options) {
      // Update the selected status of each option based on the values from paramsObject
      filters[key].options = filters[key].options.map((option) => ({
        ...option,
        selected: selectedValues.includes(option.value),
      }));
    }
  });

  return filters; // Return the updated filters object
};

export const convertToURLSearchParams = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, values]) => {
    if (values.length) {
      params.append(key, values.join());
    }
  });

  return params;
};

export const getSelectedFilters = (filters) => {
  const selectedFilters: { [key: string]: any } = {};

  Object.entries(filters).forEach(([key, filter]) => {
    if (filter.type === "text") {
      if (filter.value) {
        selectedFilters[key] = filter.value;
      }
    } else if (filter.options) {
      const selectedOptions = filter.options
        .filter((option) => option.selected)
        .map((option) => option.value);
      if (selectedOptions.length > 0) {
        selectedFilters[key] = selectedOptions;
      }
    }
  });

  return selectedFilters;
};

export const updateTags = (data, key, tag, action) => {
  const item = data.find((selectedRow) => selectedRow.key === key);
  if (!item) {
    console.log("Item not found");
    return;
  }
  if (action === "add") {
    if (!item.tags.includes(tag)) {
      item.tags.push(tag);
      console.log(`Tag '${tag}' added to key ${key}`);
    } else {
      console.log(`Tag '${tag}' already exists in key ${key}`);
    }
  } else if (action === "remove") {
    const tagIndex = item.tags.indexOf(tag);
    if (tagIndex !== -1) {
      item.tags.splice(tagIndex, 1);
      console.log(`Tag '${tag}' removed from key ${key}`);
    } else {
      console.log(`Tag '${tag}' not found in key ${key}`);
    }
  } else {
    console.log("Invalid action. Use 'add' or 'remove'.");
  }
  return data;
};

export const getSelectedColumns = (columns, columnConfig) => {
  // Extract fields of selected columns from configuration
  const selectedFields = columnConfig.filter((config) => config.selected);

  // Filter columns based on selected fields
  const filteredFields = selectedFields.filter((field) =>
    columns.every((column) => column.key !== field.field)
  );
  return filteredFields.sort((a, b) => a.order - b.order);
};
