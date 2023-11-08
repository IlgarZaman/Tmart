import React from "react";
import "./index.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const CustomTab1 = () => {
  function createData(name, size1, size2, size3, size4, size5) {
    return { name, size1, size2, size3, size4, size5 };
  }
  const rows = [
    createData("UK", 18, 20, 22, 24, 26),
    createData("European", 46, 48, 50, 52, 54),
    createData("Usa", 14, 16, 18, 20, 22),
    createData("Australia", 8, 10, 12, 14, 16),
    createData("Canada", 24, 26, 28, 30, 32),
  ];
  return (
    <div id="customtab1">
      <h2>Size Chart</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }}>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "td, th": { border: 1 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.size1}</TableCell>
                <TableCell align="right">{row.size2}</TableCell>
                <TableCell align="right">{row.size3}</TableCell>
                <TableCell align="right">{row.size4}</TableCell>
                <TableCell align="right">{row.size5}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTab1;
