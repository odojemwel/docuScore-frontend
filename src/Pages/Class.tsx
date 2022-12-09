import { Box, Button, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { DataGrid, GridColumnHeaderParams, GridColumns, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Class = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ paddingX: '100px', width: '100%', height: '100%' }}>
        <Stack sx={{ height: '100%' }} spacing={2}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '50px',
            paddingY: '5px',
            marginBottom: '20px',
            alignItems: 'center'
          }}>
            <Typography variant='h5' gutterBottom sx={{ flexGrow: 1, fontWeight: '500' }}>
              Class Details
            </Typography>
            <TextField
              id="standard-disabled"
              label="Subject"
              defaultValue="Science"
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="standard-disabled"
              label="Year level"
              defaultValue="8"
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="standard-disabled"
              label="Section"
              defaultValue="Hobbits"
              variant="filled"
              size='small'
              sx={{ marginX: '5px' }}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button variant='contained' size='small' color='secondary'
              sx={{ marginLeft: '10px' }}
              onClick={() => navigate("/edit_class")}>
              <Typography variant='button'>Edit Class</Typography>
            </Button>
          </Box>
          <Box display={'flex'} >
            <Typography variant='h5'>Students' Record</Typography>
          </Box>

          <DataGrid
            columns={columns}
            rows={rows}
          />
          <Stack direction={'row'} spacing={2}>
            <Button variant='contained'
              color='secondary'
              size='small'
              onClick={() => navigate("/create_student")}
            >Add Student</Button>
            <Button variant='contained'
              color='secondary'
              size='small'
              onClick={() => navigate("/create_exam")}
            >Add Exam</Button>
          </Stack>
        </Stack>

      </Box>
    </>
  )
}

export default Class



const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Name',
    type: 'string',
    width: 150,
    sortable: false,
    renderCell: (cellValue) => {
      return (
        <Name cellValue={cellValue} />
      );
    }
  },
  {
    field: 'examTitle',
    headerName: 'Exam 1',
    type: 'string',
    width: 100,
    sortable: false,
    renderCell: (cellValue) => {
      return (
        <Score cellValue={cellValue} />
      );
    },
    renderHeader: (cellValue) => {
      return (
        <Exam cellValue={cellValue} />
      );

    }
  },
]

const rows: GridRowsProp = [
  {
    id: 1,
    name: "Jemwel Odo",
    examTitle: "10",
  },
  {
    id: 2,
    name: "Jemwel Odo",
    examTitle: "9",
  },
  {
    id: 3,
    name: "Jemwel Odo",
    examTitle: "8",
  }
]




export const Name = (props: { cellValue: GridRenderCellParams }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box minWidth={'100 %'} sx={{ cursor: 'pointer' }} >
      <Box onClick={handleClick}>
        {props.cellValue.value}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/student");
            handleClose();
          }}>
          View Student
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete Student</MenuItem>
      </Menu>
    </Box>
  );
}


export const Score = (props: { cellValue: GridRenderCellParams }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={handleClick} >
        {props.cellValue.value}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}>Edit Score</MenuItem>
        <MenuItem onClick={handleClose}>Delete Score</MenuItem>
      </Menu>
    </>
  );
}

export const Exam = (props: { cellValue: GridColumnHeaderParams }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ cursor: 'pointer' }} onClick={handleClick} >
        {props.cellValue.colDef.headerName}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/exam")
          }}>View Exam</MenuItem>
        <MenuItem onClick={handleClose}>Delete Exam</MenuItem>
      </Menu>
    </>
  );
}