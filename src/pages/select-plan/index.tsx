
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { CheckCircleOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import withAuth from '../components/withAuth';
import withShop from '../components/withShop';
import clientService from '../helpers/client';
import { Api } from '../constants/api';
import { useAppSelector } from '../hooks';

const { Meta } = Card;

const SelectPlan = () => {
  const [loading, setLoading] = useState(false);
  const shops = useAppSelector((state) => state.shops);
  const auth = useAppSelector((state) => state.auth);
  const free_trial = (shops.shops.length === 1);
  const [referralData, setReferralData] = useState(null);
  const current_domain = typeof window !== "undefined" ? window.location.origin : "";

  console.log("Current Domain:", current_domain);

  // Get referral data from the window object
  useEffect(() => {
    if (typeof window !== 'undefined' && window.tolt_referral) {
      // Access the referral data
      setReferralData(window.tolt_referral);
      console.log('Referral data:', window.tolt_referral);
    } else {
      console.log('No referral data found');
    }
  }, []);

  const handleClick = async (plan) => {
    setLoading(true);

    let price_id = '';
    if (plan === 'basic') {
      price_id = 'price_1PG1PQ060o8wW1ADJqYRxpoT';  // Replace with actual price ID of basic product
    } else if (plan === 'pro') {
      price_id = 'price_1PYsXW060o8wW1ADyUyHPQfF';  // Replace with actual price ID of pro product
    }

    const stripe_customer_id = auth.meInfo.stripe_customer_id;
    const free_trial = (shops.shops.length === 1);
    const tolt_id = referralData;

    if (current_domain === "" || current_domain === null || current_domain === undefined) {
      console.error('Domain not found');
      setLoading(false);
      return;
    }

    // Adjust payload depending on whether there is a referral ID
    let payload = {};
    if (tolt_id) {
      payload = {
        price_id,
        free_trial,
        stripe_customer_id,
        tolt_id,
        current_domain,
      };
    } else {
      payload = {
        price_id,
        free_trial,
        stripe_customer_id,
        current_domain,
      };
    }

    console.log('payload', payload);

    try {
      const response = await clientService.post(Api.stripePayment.createCheckoutSession, payload);

      if (response.status === 200) {
        const { url } = response.data;
        window.location.href = url;
      } else {
        console.error('Error creating checkout session', response.data);
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-1 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">A Perfect Plan for Everyone</h1>
          <p className="text-xl text-gray-600 mb-6">Our pricing is transparent and tailored to suit your needs.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          <Card className="shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out bg-white" bordered={false} hoverable>
            <Meta
              title={<h2 className="text-2xl font-bold text-blue-600">Basic</h2>}
              description={
                <>
                  <p className="text-3xl font-bold text-gray-900">$299 <span className="text-xl font-medium">USD / Month</span></p>
                  <p className="text-gray-700 mb-4">Ideal for small businesses that are new to TikTok Shop, and looking to generate up to five figures in monthly GMV</p>
                  <div className="list-disc list-inside text-left mb-4 text-gray-700">
                    <p><CheckCircleOutlined className="mr-2" />500 messages per day</p>
                    <p><CheckCircleOutlined className="mr-2" />Unlimited follow-up messages</p>
                    <p><CheckCircleOutlined className="mr-2" />Analytics dashboard & reporting</p>
                    <p><CheckCircleOutlined className="mr-2" />Basic email customer support</p>
                  </div>
                  {free_trial ? <Button type="primary" size="large" block onClick={() => handleClick('basic')} className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out" disabled={loading}>Start Free Trial</Button> :
                    <Button type="primary" size="large" block onClick={() => handleClick('basic')} className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out" disabled={loading}>Buy Basic Plan</Button>
                  }
                </>
              }
            />
          </Card>

          <Card className="shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out bg-white" bordered={false} hoverable>
            <Meta
              title={<h2 className="text-2xl font-bold text-blue-600">Pro</h2>}
              description={
                <>
                  <p className="text-3xl font-bold text-gray-900">$549 <span className="text-xl font-medium">USD / Month</span></p>
                  <p className="text-gray-700 mb-4">Recommended for up-and-coming or established brands looking to scale to six or seven figures in monthly GMV</p>
                  <div className="list-disc list-inside text-left mb-4 text-gray-700">
                    <p><CheckCircleOutlined className="mr-2" />Everything in Basic</p>
                    <p><CheckCircleOutlined className="mr-2" />2000+ creators reached per day</p>
                    <p><CheckCircleOutlined className='mr-2'/>Automated reminders for creators to post content</p>
                    <p><CheckCircleOutlined className='mr-2'/>Automatically send creators content creation guidelines</p>
                    <p><CheckCircleOutlined className='mr-2'/>CSV uploads for outreach and/or exclusions</p>
                    <p><CheckCircleOutlined className='mr-2'/>Attach images to all messages</p>
                    <p><CheckCircleOutlined className='mr-2'/>CSV downloadable creator performance reports</p>
                    <p><CheckCircleOutlined className='mr-2'/>24/7 priority customer support via SMS/Lark/Slack</p>
                  </div>
                  {free_trial ? <Button type="primary" size="large" block onClick={() => handleClick('pro')} className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out" disabled={loading}>Start Free Trial</Button> :
                    <Button type="primary" size="large" block onClick={() => handleClick('pro')} className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out" disabled={loading}>Buy Pro Plan</Button>
                  }
                </>
              }
            />
          </Card>

          <Card className="shadow-lg rounded-lg hover:shadow-2xl transition duration-300 ease-in-out bg-white" bordered={false} hoverable>
            <Meta
              title={<h2 className="text-2xl font-bold text-blue-600">Ultra</h2>}
              description={
                <>
                  <p className="text-3xl font-bold text-gray-900">$849 <span className="text-xl font-medium">USD / Month</span></p>
                  <p className="text-gray-700 mb-4">Coming soon!</p>
                  <div className="list-disc list-inside text-left mb-4 text-gray-700">
                    <p><CheckCircleOutlined className="mr-2" />Everything in Pro</p>
                    <p><StarOutlined className="mr-2" />Additional Premium Features</p>
                    <p><ClockCircleOutlined className="mr-2" />Coming Soon</p>
                  </div>
                  <Button type="primary" size="large" block disabled className="bg-gray-400">Buy Ultra Plan</Button>
                </>
              }
            />
          </Card>
        </div>
        <p className="text-lg text-gray-700 mt-12">Please select a subscription model for the selected shop.</p>
      </div>
    </div>
  );
};

export default withAuth(withShop(SelectPlan));
