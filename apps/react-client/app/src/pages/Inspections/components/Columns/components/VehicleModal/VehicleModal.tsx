import { CircularProgress, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getVehicleInfo } from '@haul/react-client/api';
import { VehicleInfo } from '@haul/nest-api/app/vehicle/vehicle.service';
import {
  ModalContainer,
  LoadingContainer,
  VehicleInfoContainer,
  InfoRow,
} from './VehicleModal.styles';

export const VehicleModal = ({
  vehicleIdNumber,
  onClose,
}: {
  vehicleIdNumber: string;
  onClose: () => void;
}) => {
  const [data, setData] = useState<VehicleInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!vehicleIdNumber) {
      setData(null);
      return;
    }
    getVehicleInfo(vehicleIdNumber)
      .then((data) => {
        if (data?.vehicleInfo) {
          setData(data?.vehicleInfo);
        }
      })
      .finally(() => setLoading(false));
  }, [vehicleIdNumber]);

  const handleClose = () => {
    setData(null);
    onClose();
  };

  const renderBody = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      );
    }

    return (
      <>
        <Typography variant="h6">Vehicle Information</Typography>

        <VehicleInfoContainer>
          {Boolean(data?.vehicleIdNumber) && (
            <InfoRow>
              <strong>VIN:</strong> {data?.vehicleIdNumber}
            </InfoRow>
          )}
          {Boolean(data?.make) && (
            <InfoRow>
              <strong>Make:</strong> {data?.make}
            </InfoRow>
          )}
          {Boolean(data?.model) && (
            <InfoRow>
              <strong>Model:</strong> {data?.model}
            </InfoRow>
          )}
          {Boolean(data?.modelYear) && (
            <InfoRow>
              <strong>Model Year:</strong> {data?.modelYear}
            </InfoRow>
          )}
          {Boolean(data?.vehicleType) && (
            <InfoRow>
              <strong>Vehicle Type:</strong> {data?.vehicleType}
            </InfoRow>
          )}
          {Boolean(data?.manufacturerName) && (
            <InfoRow>
              <strong>Manufacturer Name:</strong> {data?.manufacturerName}
            </InfoRow>
          )}
        </VehicleInfoContainer>
      </>
    );
  };

  return (
    <Modal
      open={Boolean(vehicleIdNumber)}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer>{renderBody()}</ModalContainer>
    </Modal>
  );
};
