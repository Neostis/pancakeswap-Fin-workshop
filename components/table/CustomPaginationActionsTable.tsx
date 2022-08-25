import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(image1: string, image2: string, name: string, calories: number, fat: number) {
  return { image1, image2, name, calories, fat };
}
{
  /* <div className="flex space-x-px text-textwhite">
<img src={item.token0.imageUrl} height="30px" width="30px" />
<h1>{item.token0.name}</h1> */
}
const rows = [
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Cupcake',
    305,
    3.7,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Donut',
    452,
    25.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Eclair',
    262,
    16.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Frozen yoghurt',
    159,
    6.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Gingerbread',
    356,
    16.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Honeycomb',
    408,
    3.2,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Ice cream sandwich',
    237,
    9.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Jelly Bean',
    375,
    0.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'KitKat',
    518,
    26.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Lollipop',
    392,
    0.2,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Marshmallow',
    318,
    0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Nougat',
    360,
    19.0,
  ),
  createData(
    'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
    'https://cryptologos.cc/logos/power-ledger-powr-logo.png?v=002',
    'Oreo',
    437,
    18.0,
  ),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <div className="flex">
                  <img src={row.image1} height="30px" width="30px" />
                  <img src={row.image2} height="30px" width="30px" />
                </div>
              </TableCell>

              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
