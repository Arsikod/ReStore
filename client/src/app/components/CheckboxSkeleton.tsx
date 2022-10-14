import { CardHeader, Skeleton } from '@mui/material';

export default function ProductCardSkeleton() {
  return (
    <CardHeader
      avatar={<Skeleton animation="wave" variant="circular" width={20} height={20} />}
      title={
        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
      }
    />
  );
}
