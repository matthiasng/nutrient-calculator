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

function formatNutrientAmount(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return rounded === 0 ? '-' : rounded.toString() + " ml";
}

function App() {
  const [mixtureStrength, setMixtureStrength] = useLocalStorage('mixture_strength', 100);
  const [amount, setAmount] = useLocalStorage('amount', 1);
  const [unit, setUnit] = useLocalStorage<'L' | 'ML'>('unit', 'L');
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

  const handleUnitChange = (event: any) => {
    const newUnit = event.target.value as 'L' | 'ML';
    if (unit === newUnit) return;
    if (newUnit === 'L') {
      setAmount(prev => prev / 1000);
    } else {
      setAmount(prev => prev * 1000);
    }
    setUnit(newUnit);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
            <FormControl fullWidth>
              <TextField
                id="amount-text"
                label={unit === 'L' ? 'Liter' : 'Milliliter'}
                type="number"
                value={amount}
                onChange={(event) => setAmount(parseFloat(event.target.value))}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid sx={{ width: '6em' }}>
            <FormControl fullWidth>
              <InputLabel id="unit-select-label">Unit</InputLabel>
              <Select
                labelId="unit-select-label"
                id="unit-select"
                value={unit}
                label="Unit"
                onChange={handleUnitChange}
              >
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ML">ML</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
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
                    <TableRow key={row.name} sx={{ 'backgroundColor': row.color }}>
                      <TableCell><b>{row.name}</b></TableCell>
                      <TableCell align="right">{formatNutrientAmount(row.firstRoots * (unit === 'L' ? amount : amount / 1000) * (mixtureStrength / 100))}</TableCell>
                      <TableCell align="right">{formatNutrientAmount(row.firstTrueLeafes * (unit === 'L' ? amount : amount / 1000) * (mixtureStrength / 100))}</TableCell>
                      <TableCell align="right">{formatNutrientAmount(row.growing * (unit === 'L' ? amount : amount / 1000) * (mixtureStrength / 100))}</TableCell>
                      <TableCell align="right">{formatNutrientAmount(row.preFlowering * (unit === 'L' ? amount : amount / 1000) * (mixtureStrength / 100))}</TableCell>
                      <TableCell align="right">{formatNutrientAmount(row.flowering * (unit === 'L' ? amount : amount / 1000) * (mixtureStrength / 100))}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6} sx={{ padding: '2px 0' }}></TableCell>
                  </TableRow>
                  <TableRow key={nutrientSchema.ec.name} sx={{ 'backgroundColor': nutrientSchema.ec.color }}>
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
                  <MenuItem key={plant.name} value={plant.name}>{plant.name}</MenuItem>
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
                    <TableCell>{plant.optimalEcFrom}-{plant.optimalEcTo} u/S</TableCell>
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
