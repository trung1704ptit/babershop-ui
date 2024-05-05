import Drawer from '@mui/material/Drawer';
import * as React from 'react';

import { Sidebar } from './Sidebar';

interface IProps {
  toggleDrawer: () => void;
}

export default function MobileSideBar(props: IProps) {
  return (
    <div>
      <Drawer open={true} onClose={props.toggleDrawer}>
        <Sidebar showLogo={true} />
      </Drawer>
    </div>
  );
}
