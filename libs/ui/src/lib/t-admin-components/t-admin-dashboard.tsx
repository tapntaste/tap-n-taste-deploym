import React, { useEffect } from 'react';
import {DashboardCard,FinancialComparison,FoodCategoryComparison,OrdersComparison,OrderFrequencyByTime,PopularMenuItems,ReservationsAndEventBookings,OrdersTypeBreakdown,RevenueByOrderType} from '@tap-n-taste/ui';
import { AppDispatch } from '@tap-n-taste/utils';
import { useDispatch } from 'react-redux';
import { fetchUser, setUser } from 'libs/utils/src/store/authSlice';
export const TAdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
      
    } else {
      dispatch(fetchUser()); // Fetch user from the backend if not in localStorage
      
    }
  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <DashboardCard title="Total Orders" value="11,580" subtitle="45% Done" />
        <DashboardCard title="Total Revenue" value="₹11,580" subtitle="4.5% Rise" />
        <DashboardCard title="Available Orders" value="11,580" subtitle="+9 Add" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FinancialComparison />
        <FoodCategoryComparison/>
        <OrdersComparison/>
        <OrderFrequencyByTime/>
        <OrdersTypeBreakdown/>
        <PopularMenuItems/>
        <RevenueByOrderType/>
        {/* <PopularMenuItems/>
        <OrdersTypeBreakdown/>
        <ReservationsAndEventBookings/>
        <RevenueByOrderType/> */}

        {/* <TotalOrdersChart /> */}
      </div>
    </div>
  );
};
