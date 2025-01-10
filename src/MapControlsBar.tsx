import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface MapControlsBarProps {
  items: string[];
  onItemChange?: (item: string) => void;
}

export const MapControlsBar: React.FC<MapControlsBarProps> = ({ items, onItemChange }) => {
  const [selected, setSelected] = React.useState<string>('All');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const item = event.target.value;
    setSelected(item);
    if (onItemChange) {
      onItemChange(item);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="item-select-label">Supermarket</InputLabel>
      <Select
        labelId="item-select-label"
        value={selected}
        onChange={handleChange}
        label="Supermarket"
      >
        <MenuItem value="All">All</MenuItem>
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
