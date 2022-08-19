import React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
};

const liquidity = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-bgtheme py-10 flex-column w-auto grid h-auto">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-5/12">
        <div className="rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite h-12">Addquidity</h1>
            </div>
            <div className="py-10 flex-column w-auto grid text-textblack ">
              <button
                className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton 
     text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              >
                <Link
                  href="/addliquidity"
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton
         text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  Add Liquidity
                </Link>
              </button>

              <br />
              <br />
              <button
                className="outlined justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton 
     text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                onClick={handleClickOpen}
              >
                {/* <Link
                  href="/pool"
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton
         text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  All Pool
                </Link> */}
                All Pool
              </button>

              <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pool
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>Text here</Typography>
                </DialogContent>
                <DialogActions>
                  <button autoFocus onClick={handleClose}>
                    OK
                  </button>
                </DialogActions>
              </BootstrapDialog>
            </div>
            <div className="flex-column w-auto grid ">
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>

              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default liquidity;
