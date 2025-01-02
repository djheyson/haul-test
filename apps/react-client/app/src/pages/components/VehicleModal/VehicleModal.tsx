import { CircularProgress, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { getVehicleInfo } from '@haul/react-client/api';
import { VehicleInfo } from '@haul/nest-api/app/vehicle/vehicle.service';
import { ModalContainer, LoadingContainer } from './VehicleModal.styles';
import { InspectionData } from '@haul/nest-api/app/inspection/inspection.service';
import { VehicleInfoContent } from '../VehicleInfoContent/VehicleInfoContent';
import { InspectionSection } from '../InspectionSection/InspectionSection';

export const VehicleModal = ({
  vehicleIdNumber,
  onClose,
}: {
  vehicleIdNumber: string;
  onClose: () => void;
}) => {
  const [data, setData] = useState<{
    vehicleInfo: VehicleInfo | null;
    linkedInspections: InspectionData[];
  } | null>(null);
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
          setData({
            vehicleInfo: data?.vehicleInfo,
            linkedInspections: data?.linkedInspections,
          });
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
        {!!data?.vehicleInfo && <VehicleInfoContent {...data?.vehicleInfo} />}
        <InspectionSection linkedInspections={data?.linkedInspections || []} />
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
