import { SidebarAdmin } from '../components/SideBarAdmin';
import SalesReportPage from './components/SalesReportPage';

const ManageSalesReportPage = () => {
  return (
    <div className="flex">
      <SidebarAdmin />
      <SalesReportPage />
    </div>
  );
};

export default ManageSalesReportPage;
