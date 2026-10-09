import React, { useState, useCallback } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';

const RootLayout = () => {
    const [loading, setLoading] = useState(true);

    const handleLoadingComplete = useCallback(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
            <div style={{
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.5s ease',
                pointerEvents: loading ? 'none' : 'all',
            }}>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default RootLayout;