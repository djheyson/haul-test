import {
  Button,
  Input,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Divider,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import {
  uploadInspections,
  cleanInspections,
  fetchInspections,
} from '../../../../api';
import {
  FormContainer,
  ButtonGroup,
  FileInputContainer,
  WarningBox,
} from './UploadInspectionsForm.styles';
import { CheckCircleOutline } from '@mui/icons-material';
import { ErrorAlert } from './UploadInspectionsForm.styles';

export const UploadInspectionsForm = ({ refetch }: { refetch: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    try {
      await fetchInspections('80806');
      await refetch();
    } catch (error) {
      setError('Something went wrong, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      try {
        await uploadInspections(file);
        await refetch();
        setFile(null);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClean = async () => {
    try {
      await cleanInspections();
      await refetch();
      setFile(null);
    } catch (error) {
      console.error('Clean failed:', error);
    }
  };

  return (
    <FormContainer>
      <Alert severity="info">
        <Typography variant="body1" gutterBottom>
          Upload an XML file containing DOT inspection data. The file should
          include:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inspection details (type, date, results)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Vehicle information (trucks and trailers)" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Violation records (if any)" />
          </ListItem>
        </List>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Download inspection data from:{' '}
          <Link
            href="https://ai.fmcsa.dot.gov/SMS/Carrier/80806/CompleteProfile.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            FMCSA Website
          </Link>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Note: The FMCSA website may require a U.S.-based IP address for
          access.
        </Typography>
      </Alert>

      <FileInputContainer>
        <Input
          type="file"
          disabled={loading}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) setFile(file);
          }}
        />

        <ButtonGroup>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            {loading ? 'Loading...' : 'Upload Data'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClean}
            disabled={loading}
          >
            Clear All Data
          </Button>
        </ButtonGroup>
      </FileInputContainer>

      <Divider />

      <div>
        <WarningBox>
          <strong>Important:</strong> Fetching data from FMCSA will overwrite
          existing data. Due to free hosting limitations, large data fetches may
          timeout. If this occurs, please use the file upload option instead.
        </WarningBox>

        <Button
          fullWidth
          variant="contained"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Data From FMCSA'}
        </Button>

        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => setError(null)}
        >
          <ErrorAlert severity="error" onClose={() => setError(null)}>
            {error || 'Something went wrong, please try again later.'}
          </ErrorAlert>
        </Snackbar>
      </div>
    </FormContainer>
  );
};
