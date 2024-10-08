import React, { ReactNode } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import BottomNav from './_components/BottomNav';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className="md:ml-64">
                <DashboardHeader />
                {children}
            </div>

            <div className='md:hidden'>
                <BottomNav />
            </div>
        </div>
    );
}

export default DashboardLayout;
