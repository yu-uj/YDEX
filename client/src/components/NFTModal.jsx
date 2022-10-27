import { Box, Button, Modal, styled, Typography } from '@mui/material'
import React from 'react'

const StyledModal = styled(Modal)({
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:500,
  bgcolor: 'background.paper',
  border: '10px solid #555',
  borderRadius : 10,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NFTModal({open, handleClose}) {
    
  return (
    <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
  )
}
