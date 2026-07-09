
import React, { useState, useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    CircularProgress,
    Alert,
    Paper,
} from '@mui/material';

import { getSettings } from "../../services/settings.services";
import SupervisorSections from './SupervisorSections/SupervisorSections';
// import GeneralSettings from './GeneralSettings';
// import AcademicSettings from './AcademicSettings';
// import NotificationSettings from './NotificationSettings';

// مكون علامات التبويب
const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const Settings = () => {
    const [tabValue, setTabValue] = useState(0);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const data = await getSettings();
            setSettings(data.data);
            setError(null);
        } catch (err) {
            setError('فشل في تحميل الإعدادات');
            console.error('Error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Paper elevation={3} sx={{ m: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="settings tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '& .MuiTab-root': {
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                textTransform: 'none',
                            }
                        }}
                    >
                        <Tab label="الإعدادات العامة" />
                        <Tab label="المشرفين والشعب" />
                        <Tab label="الإعدادات الأكاديمية" />
                        <Tab label="الإشعارات" />
                    </Tabs>
                </Box>

                {/* <TabPanel value={tabValue} index={0}>
                    <GeneralSettings settings={settings} onUpdate={fetchSettings} />
                </TabPanel> */}

                <TabPanel value={tabValue} index={1}>
                    <SupervisorSections 
                        data={settings?.supervisorsData} 
                        onUpdate={fetchSettings}
                    />
                </TabPanel>

                {/* <TabPanel value={tabValue} index={2}>
                    <AcademicSettings settings={settings} onUpdate={fetchSettings} />
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <NotificationSettings settings={settings} onUpdate={fetchSettings} />
                </TabPanel> */}
            </Paper>
        </Box>
    );
};

export default Settings;