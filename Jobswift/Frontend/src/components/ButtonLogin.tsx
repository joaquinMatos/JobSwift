import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const CustomButton = ({ onClick, children, sx, tooltipText, ...props }:any) => {
  return (
    <Tooltip title={tooltipText} arrow>
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          bgcolor: '#E67D15',
          color: '#050505',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
