import React, { useState } from 'react';
import { Box } from '@mui/material';

import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

interface TTableSelectorProps {
  className?: string; // Custom className for additional styling
  sx?: object; // Inline styles for MUI's Box component
}

export function TTableSelector({
  className = '',
  sx = {},
}: TTableSelectorProps) {
  const [selectedTable, setSelectedTable] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelect = (table: string) => {
    setSelectedTable(table);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const availableTables =
    restaurantData?.table || [];
  return (
    <Box className={`z-10 w-fit h-fit ${className}`} sx={sx}>
      <div className="flex items-center justify-center text-red-500">
        {/* Dropdown */}
        <h1 className="font-semibold text-black mr-2">Table No.</h1>
        <div className="ml-2 relative">
          <div
            tabIndex={0}
            className="w-fit sm:px-2 px-3 py-2 text-[12px] sm:text-sm font-medium border border-red-500 rounded cursor-pointer text-red-500 focus:outline-none focus:border-red-500"
            onClick={handleDropdownToggle}
          >
            {selectedTable || 'Select a table'}
          </div>

          {/* Dropdown List */}
          {isDropdownOpen && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow max-h-[100px] overflow-y-auto z-10">
              {availableTables
                .filter((table:any) => table.isAvailable)
                .map((table:any) => (
                  <li
                    key={table.name}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-red-500 hover:text-white ${
                      selectedTable === table.name ? 'bg-red-500 text-white' : ''
                    }`}
                    onClick={() => handleSelect(table.name)}
                  >
                    {table.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </Box>
  );
}

export default TTableSelector;
