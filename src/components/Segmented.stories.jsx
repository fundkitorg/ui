import { useState } from '@wordpress/element';
import Segmented from './Segmented';

export default {
  title: 'Components/Segmented',
  component: Segmented,
};

export const Basic = {
  render: () => {
    const [ value, setValue ] = useState( 'pills' );
    return (
      <Segmented
        label="Style"
        value={ value }
        onChange={ setValue }
        options={ [
          { value: 'pills', label: 'Pills' },
          { value: 'tabs', label: 'Tabs' },
        ] }
      />
    );
  },
};
