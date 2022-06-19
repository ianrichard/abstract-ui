import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import boostrapLayout from '../../components/bootstrap-layout/components.js';

const components = {
    ...boostrapLayout,
    'TextField': TextField,
    'Typography': Typography,
}

export default components;