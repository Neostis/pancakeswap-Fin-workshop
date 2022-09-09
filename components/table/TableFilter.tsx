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
import { getDataPair  } from '../../services/pairToken.service';

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
  const [dataPair, setDataPair] = useState<pairsToken[]>([]);

  const classes = useStyles();

  // const requestSearch = (searchedVal: string) => {
  //   let mappingData: pairsToken[] = [];
  //   const filteredRows = PairsList.filter((item) => {
  //     const ob = {
  //       img1: item.token0.imageUrl,
  //       img2: item.token1.imageUrl,
  //       token1: item.token0.symbol,
  //       token2: item.token1.symbol,
  //       addrPair: item.addressPair,
  //       total: item.total,
  //     };
  //     // const mappingData = [...rows, ob];
  //     if (
  //       ob.token1.toLowerCase().includes(searchedVal.toLowerCase()) ||
  //       ob.token2.toLowerCase().includes(searchedVal.toLowerCase())
  //     ) {
  //       // return ob;
  //       mappingData.push(ob);
  //       console.log('ob',ob);
        
  //     }
  //   });
  //   setRows(mappingData);
  // };

  const loadDataPair =async () => {
    setDataPair(await getDataPair())
  }

  const requestSearch = async(searchedVal: string) => {
    
    let mappingData: pairsToken[] = [];
    const filteredRows = dataPair!.filter((x) => {      
      let ob;
      PairsList.forEach(element => {
      if (element.addressPair == x!.address){
         ob = {
          img1: element.token0.imageUrl,
          img2: element.token1.imageUrl,
          token1: element.token0.symbol,
          token2: element.token1.symbol,
          addrPair: element.addressPair,
          total: x.totalSupply,

        };
        }
      
      });
      
      if (
        ob.token1.toLowerCase().includes(searchedVal.toLowerCase()) ||
        ob.token2.toLowerCase().includes(searchedVal.toLowerCase())
      ) {
        if (Array.isArray(mappingData)){
          // return ob;
          mappingData.push(ob);      
          }

        
        
      }
      return ob;
  });


    setRows(mappingData);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  useEffect(() => {
    
    // const interval = setInterval(() => {
    const fetchData =  async() => {
      const temp = await getDataPair();
      const dataAll = temp.map((x) => {
        let ob;
        PairsList.forEach(element => {
        if (element.addressPair == x.address){
           ob = {
            img1: element.token0.imageUrl,
            img2: element.token1.imageUrl,
            token1: element.token0.symbol,
            token2: element.token1.symbol,
            addrPair: element.addressPair,
            total: x.totalSupply,

          };
          }
        
        });
        const mappingData = [...rows, ob];

        return ob;
    });

      setRows(dataAll);

    };

    loadDataPair()
    fetchData();
  }, []);
  return (
    <div>
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
                <TableCell align="left"><div className="text-lg">Token&nbsp;</div></TableCell>
                {/* <TableCell align="center">Token 1</TableCell> */}
                {/* <TableCell align="center">Token&nbsp;</TableCell> */}
                <TableCell align="center"><div className="text-lg">Address&nbsp;</div></TableCell>
                <TableCell align="right"><div className="text-lg">Liquidity&nbsp;</div></TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.addrPair}>
                  {/* <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell> */}
                  <TableCell align="left">
                    <div className="flex space-x-px text-base">
                      <img src={row.img1} height="35px" width="35px" />
                      <img src={row.img2} height="35px" width="35px" />
 
                      {row.token1}/{row.token2}
                    </div>
                  </TableCell>
                  {/* <TableCell align="center">{row.token1}/{row.token2}</TableCell> */}
                  {/* <TableCell align="center">{row.token2}</TableCell> */}
                  <TableCell align="center"><div className="text-base">{row.addrPair}</div></TableCell>
                  <TableCell align="right"><div className="text-base">{row.total}</div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </div>
  );
}

export default TableConstants;
