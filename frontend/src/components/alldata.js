
import { useEffect, useState } from 'react';
import { bankAPI } from '../services';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AllData() {

  const [users, setUsers] = useState([])

  useEffect(async () => {
    const response = await bankAPI.allUsers();
    setUsers(response.data);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const list = users.map((user, index) => (<StyledTableRow key={index} >
    <StyledTableCell align="left">{index + 1}</StyledTableCell>
    <StyledTableCell align="left">{user.name}</StyledTableCell>
    <StyledTableCell align="left">{user.email}</StyledTableCell>
    <StyledTableCell align="left">{user.password}</StyledTableCell>
    <StyledTableCell align="left">{user.balance}</StyledTableCell>
  </StyledTableRow >))
  return (
    <>
      <h3 style={{ textAline: 'center', color: '#dc3545' }}>All Users Data</h3>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Password</StyledTableCell>
              <StyledTableCell align="left">Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export { AllData };