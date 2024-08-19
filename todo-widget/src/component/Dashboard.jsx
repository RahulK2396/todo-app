import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget } from './widgetSlice';
import AddWidgetModal from './AddWidgetModal';

const Dashboard = () => {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgets, setWidgets] = useState([]); // State for widgets

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSelection = (widget) => {
    // Add the confirmed widget to the state
    setWidgets((prevWidgets) => [
      ...prevWidgets,
      { id: Date.now(), name: widget.name, description: widget.description },
    ]);
    setIsModalOpen(false);
  };

  const handleRemoveWidget = (widgetId) => {
    // Remove the widget by its ID
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== widgetId));
  };

  return (
    <div className="container mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Dynamic Dashboard</h1>

      {/* Add Widget Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Add Widget
      </button>

      {/* Render Add Widget Modal */}
      {isModalOpen && (
        <AddWidgetModal
          categories={categories}
          closeModal={handleModalClose}
          confirmSelection={handleConfirmSelection}
        />
      )}

      {/* Render Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.length === 0 && (
          <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex items-center justify-center text-gray-600">
            No widgets added yet. Click "+" to add.
          </div>
        )}

        {widgets.map((widget) => (
          <div key={widget.id} className="bg-white rounded-lg shadow-lg p-4 relative">
            <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
            <p className="text-sm mb-2">{widget.description}</p>
            <button
              onClick={() => handleRemoveWidget(widget.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Empty card for adding new widget */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg shadow-lg p-4 flex items-center justify-center text-gray-600 cursor-pointer"
        >
          <span className="text-lg">+ Add Widget</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
