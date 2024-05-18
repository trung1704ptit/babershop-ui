import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

import { PRODUCT_CATEGORIES } from '../../utils/constants';

interface ICategoryProps {
  category?: string;
  handleCategoryChange: (category: string) => void;
}

const SelectCategory = (props: ICategoryProps) => {
  const [category, setCategory] = useState(props.category);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    props.handleCategoryChange(event.target.value);
  };

  return (
    <FormControl className='w-100 mb-3' size='medium'>
      <InputLabel id='demo-select-small-label'>Danh mục</InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={category}
        label='Danh mục'
        onChange={handleChange}
      >
        {PRODUCT_CATEGORIES.map((c) => (
          <MenuItem value={c.id} key={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
