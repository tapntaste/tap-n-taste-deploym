import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import { changeTableThunk } from 'libs/utils/src/store/tableSlice';

interface TTableSelectorProps {
  className?: string;
  sx?: object;
}

export const TTableSelector: React.FC<TTableSelectorProps> = ({
  className = '',
  sx = {},
}) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.auth); // Get the user data
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const availableTables = useSelector(
    (state: RootState) => state.restaurant.restaurantData?.table || []
  );
  const restaurantId = restaurantData?._id;


  // If user has a table, set it as the selected table
  useEffect(() => {
    if (userData?.table) {
      setSelectedTable(userData.table); // Set the table assigned to the user
    }
  }, [userData]);

  const handleChange = async (event: any) => {
    const newTableId = event.target.value as string;
    setIsLoading(true);
    if (selectedTable) {
      await dispatch(
        changeTableThunk({
         tableId:newTableId,
         restaurantId:restaurantId,
        })
      );
    }
    setSelectedTable(newTableId);
    setIsLoading(false);
  };

  return (
    <Box className={`z-10 w-fit h-fit ${className}`} sx={sx}>
      <FormControl variant="outlined" className="w-full sm:w-60">
        <Select
          labelId="table-selector-label"
          value={selectedTable || ''}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a table
          </MenuItem>
          {availableTables
            .filter((table: { isAvailable: boolean }) => table.isAvailable)
            .map((table: { _id: string; name: string }) => (
              <MenuItem key={table._id} value={table._id}>
                {table.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {isLoading && (
        <Box className="flex justify-center items-center mt-2">
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default TTableSelector;
