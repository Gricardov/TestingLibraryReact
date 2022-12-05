import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderDetailsProvider } from './context/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const renderPhase = () => {
    switch (orderPhase) {
      case 'inProgress':
        return <OrderEntry setOrderPhase={setOrderPhase} />
      case 'review':
        return <OrderSummary setOrderPhase={setOrderPhase} />
      case 'complete':
        return <OrderConfirmation setOrderPhase={setOrderPhase} />
      default:
        return <OrderEntry setOrderPhase={setOrderPhase} />
    }
  };

  return (
    <Container>
      <OrderDetailsProvider>
        {renderPhase()}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
