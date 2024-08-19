import React, { useState, useEffect } from 'react';

const AddWidgetModal = ({ categories, closeModal, confirmSelection }) => {
  const [activeTab, setActiveTab] = useState('CSPM');
  const [selectedWidgets, setSelectedWidgets] = useState([]);
  const [widgetName, setWidgetName] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleWidgetSelection = (widgetId) => {
    if (selectedWidgets.includes(widgetId)) {
      setSelectedWidgets(selectedWidgets.filter((id) => id !== widgetId));
    } else {
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };

  const handleConfirm = () => {
    if (widgetName && widgetDescription) {
      confirmSelection({ name: widgetName, description: widgetDescription });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-center">
      <div
        className={`bg-white w-full max-w-lg h-full transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg z-50`}
      >
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center rounded-t-lg">
          <h3 className="text-lg font-bold">Personalize your dashboard by adding the following widget</h3>
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(closeModal, 300);
            }}
            className="text-xl font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {['CSPM', 'CWPP', 'Image', 'Ticket'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 p-2 text-center ${
                activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
              } font-semibold`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label htmlFor="widgetName" className="block text-sm font-medium text-gray-700">
              Widget Header
            </label>
            <input
              type="text"
              id="widgetName"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter widget header"
            />
          </div>

          <div>
            <label htmlFor="widgetDescription" className="block text-sm font-medium text-gray-700">
              Widget Description
            </label>
            <textarea
              id="widgetDescription"
              value={widgetDescription}
              onChange={(e) => setWidgetDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter widget description"
            ></textarea>
          </div>

          {categories[activeTab] &&
            categories[activeTab].map((widget) => (
              <div key={widget.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={widget.id}
                  checked={selectedWidgets.includes(widget.id)}
                  onChange={() => handleWidgetSelection(widget.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={widget.id} className="text-gray-700 font-medium">
                  {widget.name}
                </label>
              </div>
            ))}
        </div>

        <div className="flex justify-end p-4 space-x-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={() => {
              setIsOpen(false);
              setTimeout(closeModal, 300);
            }}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
