import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VerifiedIcon from '@mui/icons-material/Verified';

export function Home() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Trucking Inspection Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Comprehensive inspection data analysis for fleet management
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/inspections')}
          sx={{ mt: 4 }}
        >
          View Inspections
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" component="h3">
                Inspection Records
              </Typography>
              <Typography color="text.secondary" align="center">
                Access and analyze detailed inspection records with filtering
                and sorting capabilities.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <DirectionsCarIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" component="h3">
                Vehicle Tracking
              </Typography>
              <Typography color="text.secondary" align="center">
                Monitor individual trucks and trailers with detailed inspection
                histories.
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <VerifiedIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" component="h3">
                Compliance Monitoring
              </Typography>
              <Typography color="text.secondary" align="center">
                Track violations and maintain compliance with transportation
                regulations.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
