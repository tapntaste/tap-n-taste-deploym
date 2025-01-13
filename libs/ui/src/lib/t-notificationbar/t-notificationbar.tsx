import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

export const TNotificationBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <Box className="flex flex-wrap gap-2 p-2 ml-12">
      <Button
        variant="contained"
        color={activeTab === 'all' ? 'error' : 'secondary'} // Use 'secondary' for inactive tab
        onClick={() => setActiveTab('all')}
        className="rounded-full px-6 py-2 text-sm font-semibold"
      >
        All
      </Button>
      <Button
        variant="contained"
        color={activeTab === 'unread' ? 'error' : 'secondary'} // Use 'secondary' for inactive tab
        onClick={() => setActiveTab('unread')}
        className="rounded-full px-6 py-2 text-sm font-semibold"
      >
        Unread
      </Button>
      <Button
        variant="contained"
        color={activeTab === 'read' ? 'error' : 'secondary'} // Use 'secondary' for inactive tab
        onClick={() => setActiveTab('read')}
        className="rounded-full px-6 py-2 text-sm font-semibold"
      >
        Read
      </Button>
    </Box>
  );
};
