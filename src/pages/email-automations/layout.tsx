
import PlanGuard from '../components/PlanGuard';

export default function ProtectedLayout({ children }) {
  return (
    <PlanGuard>
      {children}
    </PlanGuard>
  );
}

