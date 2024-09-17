import './app.css';

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
import { useLocalStorage } from 'usehooks-ts';
import { nutrientSchema, Plant, plants } from './data';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

function App() {
  const [mixtureStrength, setMixtureStrength] = useLocalStorage('mixture_strength', 100);
  const [liters, setLiters] = useLocalStorage('liters', 1);
  const [plant, setPlant] = useLocalStorage<Plant>('plant', plants[0], {
    serializer: (p) => {
      return p.name;
    },
    deserializer: (name) => {
      const p = plants.find((p) => p.name === name);
      return p === undefined ? plants[0] : p;
    },
  });

  const selectPlant = (name: string) => {
    const p = plants.find((p) => p.name === name);
    setPlant(p === undefined ? plants[0] : p);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid size={2}>
            <FormControl fullWidth>
              <TextField
                id="liters-text"
                label="Liter"
                type="number"
                value={liters}
                onChange={(event) => setLiters(parseInt(event.target.value))}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={10}>
            <Typography id="non-linear-slider">
              Mixture Strength: {mixtureStrength} %
            </Typography>
            <Slider
              value={mixtureStrength}
              getAriaValueText={(value: number) => `${value}%`}
              step={1}
              onChange={(_, val) => setMixtureStrength(val as number)}
              valueLabelDisplay="auto"
              // marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
              sx={{ flexGrow: 1 }}
            />
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }}>
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
                  {nutrientSchema.ingredients.map((row) => (
                    <TableRow key={row.name} sx={{ 'background-color': row.color }}>
                      <TableCell><b>{row.name}</b></TableCell>
                      <TableCell align="right">{Math.round(row.firstRoots * liters * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.firstTrueLeafes * liters * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.growing * liters * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.preFlowering * liters * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                      <TableCell align="right">{Math.round(row.flowering * liters * (mixtureStrength / 100) * 100) / 100} ml</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ pt: 2 }} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }}>
                <TableBody>
                  <TableRow key={nutrientSchema.ec.name} sx={{ 'background-color': nutrientSchema.ec.color }}>
                    <TableCell><b>{nutrientSchema.ec.name}</b></TableCell>
                    <TableCell align="right">{nutrientSchema.ec.firstRoots}</TableCell>
                    <TableCell align="right">{nutrientSchema.ec.firstTrueLeafes}</TableCell>
                    <TableCell align="right">{nutrientSchema.ec.growing}</TableCell>
                    <TableCell align="right">{nutrientSchema.ec.preFlowering}</TableCell>
                    <TableCell align="right">{nutrientSchema.ec.flowering}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid size={12}>
            <Divider />
            <h3>Optimal Values</h3>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <InputLabel id="plant-select-label">Plant</InputLabel>
              <Select
                labelId="plant-select-label"
                id="plant-select"
                value={plant.name}
                label="Age"
                onChange={(event) => selectPlant(event.target.value)}
              >
                {plants.map((plant) => (
                  <MenuItem value={plant.name}>{plant.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={8}>
            <TableContainer component={Paper}>
              <Table>
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '50%' }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>pH</TableCell>
                    <TableCell>EC</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{plant.optimalPhFrom}-{plant.optimalPhTo} pH</TableCell>
                    <TableCell>{plant.optimalEcFrom}-{plant.optimalEcFrom} u/S</TableCell>
                  </TableRow>
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
