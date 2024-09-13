import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const nutrientSchema = [
  { name: "CalMag", firstRoots: 2, firstTrueLeafes: 2, growing: 2, preFlowering: 2, flowering: 2 },
  { name: "Grow", firstRoots: 0.5, firstTrueLeafes: 1, growing: 1.8, preFlowering: 2,  flowering: 0.8 },
  { name: "Micro", firstRoots: 0.5, firstTrueLeafes: 1, growing: 1.2, preFlowering: 2,  flowering: 1.6 },
  { name: "Bloom", firstRoots: 0.5, firstTrueLeafes: 1, growing: 0.6, preFlowering: 1.5,  flowering: 2.4 },
];

function App() {
  const [mixtureStrength, setMixtureStrength] = useState(100);
  const [liter, setLiter] = useState(1);

  return (

    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={1}>
            <TextField
              id="outlined-number"
              label="Liter"
              type="number"
              value={liter}
              onChange={(event) => setLiter(parseInt(event.target.value))}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid size={11}>
            Mixture Strength
            <Slider
              aria-label="Custom marks"
              value={mixtureStrength}
              getAriaValueText={(value: number) => `${value}%`}
              step={1}
              onChange={(_, val) => setMixtureStrength(val as number)}
              valueLabelDisplay="auto"
              marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
              sx={{ flexGrow: 1 }}
            />
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 850 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">1st roots</TableCell>
                    <TableCell align="right">1st true leaves</TableCell>
                    <TableCell align="right">Growing</TableCell>
                    <TableCell align="right">Preflowering</TableCell>
                    <TableCell align="right">Flowering</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nutrientSchema.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell><b>{row.name}</b></TableCell>
                      <TableCell align="right">{Math.round(row.firstRoots * liter * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.firstTrueLeafes * liter * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.growing * liter * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.preFlowering * liter * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.flowering * liter * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
