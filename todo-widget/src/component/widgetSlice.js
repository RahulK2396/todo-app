import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Cloud Accounts', text: 'Some random text for Cloud Accounts' },
        { id: 2, name: 'Cloud Account Risk Assessment', text: 'Some random text for Risk Assessment' }
      ]
    },
    { name: 'CWPP Dashboard', widgets: [] },
    {
      name: 'Registry Scan',
      widgets: [
        { id: 3, name: 'Image Risk Assessment', text: 'Some random text for Image Risk Assessment' },
        { id: 4, name: 'Image Security Issues', text: 'Some random text for Image Security Issues' }
      ]
    }
  ]
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { category, name, text } = action.payload;
      const categoryIndex = state.categories.findIndex((cat) => cat.name === category);
      const newWidget = { id: Date.now(), name, text };
      state.categories[categoryIndex].widgets.push(newWidget);
    },
    removeWidget: (state, action) => {
      const { category, widgetId } = action.payload;
      const categoryIndex = state.categories.findIndex((cat) => cat.name === category);
      state.categories[categoryIndex].widgets = state.categories[categoryIndex].widgets.filter(
        (widget) => widget.id !== widgetId
      );
    }
  }
});

export const { addWidget, removeWidget } = widgetSlice.actions;

export default widgetSlice.reducer;
