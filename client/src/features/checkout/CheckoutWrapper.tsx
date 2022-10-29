import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from 'react-query';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import CheckoutPage from './CheckoutPage';

const stripePromise = loadStripe(
  'pk_test_51LwjUSK2B3uANAizq5tLrd2mhsyrRX0xJKtFHqDsXVdv4Z94Di3gX2KaYIKLRxxRRK6ARlB1bY7TU0neuhNovqML00muiNDNHd'
);

export default function CheckoutWrapper() {
  const { isLoading } = useQuery(['paymentIntent'], agent.Payments.createPaymentIntet, {
    onSuccess: (data) => {
      //   queryClient.setQueryData(['basket'], data);
    },
  });

  if (isLoading) return <LoadingComponent message="Loading checkout" />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}
