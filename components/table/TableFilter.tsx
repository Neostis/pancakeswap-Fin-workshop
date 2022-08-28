import React, { useState, useEffect } from 'react';
import { PairsList } from '../../constants/tokens';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';

interface pairsToken {
  img1: string;
  img2: string;
  token1: string;
  token2: string;
  addrPair: string;
  total: string;
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function TableConstants() {
  const [rows, setRows] = useState<pairsToken[]>([]);

  const [searched, setSearched] = useState<string>('');
  const classes = useStyles();

  const requestSearch = (searchedVal: string) => {
    let mappingData: pairsToken[] = [];
    const filteredRows = PairsList.filter((item) => {
      const ob = {
        img1: item.token0.imageUrl,
        img2: item.token1.imageUrl,
        token1: item.token0.symbol,
        token2: item.token1.symbol,
        addrPair: item.addressPair,
        total: item.total,
      };
      // const mappingData = [...rows, ob];
      if (
        ob.token1.toLowerCase().includes(searchedVal.toLowerCase()) ||
        ob.token2.toLowerCase().includes(searchedVal.toLowerCase())
      ) {
        // return ob;
        mappingData.push(ob);
      }
    });
    setRows(mappingData);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    const fetchData = async () => {
      const dataAll = await PairsList.map((item) => {
        const ob = {
          img1: item.token0.imageUrl,
          img2: item.token1.imageUrl,
          token1: item.token0.symbol,
          token2: item.token1.symbol,
          addrPair: item.addressPair,
          total: item.total,
        };
        // const mappingData = [...rows, ob];

        return ob;
      });
      setRows(dataAll);
    };
    fetchData();
  }, []);
  return (
    <>
      <Paper className="rounded-lg shrink hover:shrink-0">
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer className="rounded-lg shrink hover:shrink-0">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Icon</TableCell>
                <TableCell align="inherit">Token 1</TableCell>
                <TableCell align="inherit">Token 2&nbsp;</TableCell>
                <TableCell align="inherit">Carbs&nbsp;</TableCell>
                <TableCell align="inherit">Protein&nbsp;</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.addrPair}>
                  {/* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                  <TableCell align="inherit">
                    <div className="flex space-x-px">
                      <img src={row.img1} height="30px" width="30px" />
                      <img src={row.img2} height="30px" width="30px" />
                    </div>
                  </TableCell>
                  <TableCell align="inherit">{row.token1}</TableCell>
                  <TableCell align="justify">{row.token2}</TableCell>
                  <TableCell align="justify">{row.addrPair}</TableCell>
                  <TableCell align="justify">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <br /> */}
      {/* <a target="_blank" href="https://smartdevpreneur.com/the-easiest-way-to-implement-material-ui-table-search/">
        Learn how to add search and filter to Material-UI Table here.
      </a> */}
    </>
  );
}

export default TableConstants;
