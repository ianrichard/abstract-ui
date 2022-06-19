import TextField from '@mui/material/TextField';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdjustIcon from '@mui/icons-material/Adjust';
import Button from '@mui/material/Button';

import boostrapLayout from '../bootstrap-layout';

const components = {
    ...boostrapLayout,
    'Box': Box,
    'TextField': TextField,
    'Typography': Typography,
    'AdjustIcon': AdjustIcon,
    'Button': Button,
}

export default components;