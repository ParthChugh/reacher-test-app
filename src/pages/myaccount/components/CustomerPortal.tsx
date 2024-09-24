import { useState } from 'react';
import clientService from '../../helpers/client';
import { Api } from '../../constants/api';
import { useAppSelector } from '../../hooks';

const CustomerPortal = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const stripe_customer_id = auth.meInfo.stripe_customer_id;
  const current_domain = typeof window !== "undefined" ? window.location.origin : "";
  console.log("Current Domain:", current_domain);

  const payload = {
    stripe_customer_id,
    current_domain,
  };

  const handleCreatePortalSession = async () => {
    setLoading(true);
    if (current_domain === "" || current_domain === null || current_domain === undefined) {
      console.error('Domain not found');
      setLoading(false);
      return;
    }
    try {
      const response = await clientService.post(Api.stripePayment.createPortalSession, payload);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating portal session', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
      onClick={handleCreatePortalSession} 
      disabled={loading}
      className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
      >
        {loading ? 'Loading...' : 'Go to Customer Portal'}
      </button>
    </div>
  );
};

export default CustomerPortal;