import {
  createBrowserRouter,
} from "react-router-dom";
import App from './pages'
import Login from './pages/login'
import Signup from './pages/signup';
import MyAccount from './pages/myaccount';
import AIAssistant from './pages/aiassistant';
import Automations from './pages/automations';
import MyCreators from './pages/my-creators';
import SelectPlan from './pages/select-plan';
import PaymentSuccess from './pages/paymentsuccess';
import ShopManagement from './pages/shopmanagement';
import EmailedCreators from './pages/emailedcreators';
import MessagedCreators from './pages/messagedcreators';
import EmailAutomations from './pages/email-automations';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/myaccount",
    element: <MyAccount />,
  },
  {
    path: "/aiassistant",
    element: <AIAssistant />,
  },
  {
    path: "/automations",
    element: <Automations />,
  },
  {
    path: "/my-creators",
    element: <MyCreators />,
  },
  {
    path: "/select-plan",
    element: <SelectPlan />,
  },
  {
    path: "/paymentsuccess",
    element: <PaymentSuccess />,
  },
  {
    path: "/shopmanagement",
    element: <ShopManagement />,
  },
  {
    path: "/emailedcreators",
    element: <EmailedCreators />,
  },
  {
    path: "/messagedcreators",
    element: <MessagedCreators />,
  },
  {
    path: "/email-automations",
    element: <EmailAutomations />,
  },
]);
