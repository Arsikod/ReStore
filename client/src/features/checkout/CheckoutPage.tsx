import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './CheckoutValidation';
import { Order, OrderFormData } from '../../app/models/order';
import { useMutation, useQuery } from 'react-query';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useBasket } from '../../helpers/useBasket';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface CardComplete {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
}

const steps = ['Shipping address', 'Review your order', 'Payment details'];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const methods = useForm<OrderFormData>({
    mode: 'all',
    resolver: yupResolver(currentValidationSchema),
  });

  const [cardState, setCardState] = useState<any>({ elementError: {} });

  const [cardComplete, setCardComplete] = useState<CardComplete>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentSucceded, setPaymentSucceded] = useState(false);
  const { data: basket } = useBasket();
  const stripe = useStripe();
  const elements = useElements();

  function onCardInputChange(event: any) {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange} />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const {
    mutate: placeOrder,
    data: orderNumber,
    isLoading,
  } = useMutation((order: Order) => {
    return agent.Orders.create(order);
  });

  useQuery(['savedAddress'], agent.Account.savedAddress, {
    onSuccess: (data) => {
      methods.reset({ ...methods.getValues(), ...data, saveAddress: false });
    },
  });

  const handleNext = async (data: OrderFormData) => {
    if (activeStep === steps.length - 1) {
      const { nameOnCard, saveAddress, ...shippingAddress } = data;

      if (!stripe || !elements) return; //stripe is not ready

      try {
        const cardElement = elements.getElement(CardNumberElement);
        const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: nameOnCard,
            },
          },
        });

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          placeOrder({ saveAddress, shippingAddress });
          setPaymentSucceded(true);
          setPaymentMessage(
            `Thank you we have received payment. Order number is ${orderNumber}`
          );
          setActiveStep(activeStep + 1);
        } else {
          setPaymentMessage(paymentResult.error?.message!);
          setPaymentSucceded(false);
        }
      } catch (error) {}
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  function submitDisabled(): boolean {
    if (activeStep === steps.length - 1) {
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                {paymentMessage}
              </Typography>
              <Typography variant="subtitle1">
                {paymentSucceded ? (
                  'Thank you for your order'
                ) : (
                  <Button onClick={() => setActiveStep(activeStep - 1)}>Try again</Button>
                )}
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back
                  </Button>
                )}
                <LoadingButton
                  loading={isLoading}
                  disabled={submitDisabled()}
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
}
