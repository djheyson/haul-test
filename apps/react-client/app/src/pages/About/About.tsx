import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DataObjectIcon from '@mui/icons-material/DataObject';

export function About() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Project Overview
        </Typography>
        <Typography paragraph>
          This application provides a comprehensive view of trucking inspections
          data from the FMCSA (Federal Motor Carrier Safety Administration). It
          allows users to analyze inspection records, track violations, and
          monitor vehicle compliance.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Key Features
        </Typography>
        <List>
          {[
            'View and analyze inspection records',
            'Filter inspections by BASIC categories',
            'Track vehicle-specific inspection histories',
            'Monitor compliance violations',
            'Access detailed vehicle information through VIN decoding',
          ].map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Data Sources
        </Typography>
        <List>
          {[
            'FMCSA inspection records',
            'NHTSA VIN decoder API for vehicle information',
          ].map((source, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <DataObjectIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={source} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Typography paragraph>
        This project was developed as part of an engineering exercise to
        demonstrate the ability to work with unfamiliar domains and create
        functional solutions efficiently.
      </Typography>
    </Container>
  );
}
