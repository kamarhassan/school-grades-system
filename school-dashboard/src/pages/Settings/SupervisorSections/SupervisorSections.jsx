// components/Settings/SupervisorSections.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Alert,
    Grid,
    Paper,
    Avatar,
    Divider,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    Badge,
    CircularProgress,
    Snackbar,
    Tooltip,
    Skeleton,
    Fade,
    Grow,
} from "@mui/material";
import {
    Person,
    Class as ClassIcon,
    SelectAll,
    ClearAll,
    School,
    CheckCircle,
    RadioButtonUnchecked,
    Save,
    Refresh,
    Lock,
    People,
    Dashboard,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import {
    getSupervisorsSections,
    updateSupervisorSections,
} from "../../../services/settings.services";

// ============================================
// الأنماط المخصصة
// ============================================
const SectionPaper = styled(Paper)(({ theme, selected }) => ({
    padding: theme.spacing(2),
    transition: "all 0.3s ease",
    border: `2px solid ${selected ? theme.palette.success.main : theme.palette.divider}`,
    backgroundColor: selected
        ? alpha(theme.palette.success.main, 0.05)
        : "transparent",
    "&:hover": {
        backgroundColor: selected
            ? alpha(theme.palette.success.main, 0.1)
            : alpha(theme.palette.primary.main, 0.02),
    },
}));

const SupervisorAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: 48,
    height: 48,
    boxShadow: theme.shadows[2],
}));

// ============================================
// المكون الرئيسي
// ============================================
const SupervisorSections = ({ data: initialData, onUpdate }) => {
    // ============================================
    // الحالات (State)
    // ============================================
    const [data, setData] = useState([]);
    const [selectedSections, setSelectedSections] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // ============================================
    // دوال مساعدة
    // ============================================

    // تجميع الشعب حسب الصف
    const groupSectionsByClass = useCallback((sections) => {
        if (!sections || !Array.isArray(sections)) return [];

        const groups = {};
        sections.forEach((section) => {
            const className = section.class_name || "غير محدد";
            if (!groups[className]) {
                groups[className] = {
                    className: className,
                    class_id: section.class_id, // تخزين class_id مع المجموعة
                    sections: [],
                };
            }
            groups[className].sections.push(section);
        });
        return Object.values(groups);
    }, []);

    // التحقق من أن الشعبة محددة من قبل مشرف آخر
    const isSectionAssignedToOther = useCallback(
        (currentSupervisorId, sectionId) => {
            if (!selectedSections || typeof selectedSections !== "object")
                return false;

            return Object.entries(selectedSections).some(
                ([key, isSelected]) => {
                    if (!isSelected) return false;
                    const [supervisorId, secId] = key.split("-");
                    return (
                        parseInt(secId) === sectionId &&
                        parseInt(supervisorId) !== currentSupervisorId
                    );
                },
            );
        },
        [selectedSections],
    );

    // الحصول على اسم المشرف الذي حدد الشعبة
    const getAssignedSupervisorName = useCallback(
        (sectionId) => {
            if (!selectedSections || typeof selectedSections !== "object")
                return null;

            for (const [key, isSelected] of Object.entries(selectedSections)) {
                if (!isSelected) continue;
                const [supervisorId, secId] = key.split("-");
                if (parseInt(secId) === sectionId) {
                    const supervisor = data.find(
                        (s) => s.supervisor_id === parseInt(supervisorId),
                    );
                    return supervisor ? supervisor.supervisor_name : "مشرف آخر";
                }
            }
            return null;
        },
        [selectedSections, data],
    );

    // الحصول على تفاصيل الشعبة (class_id, section_name)
    const getSectionDetails = useCallback(
        (sectionId) => {
            let sectionName = "";
            let classId = null;
            let className = "";

            data.forEach((supervisor) => {
                if (supervisor.sections) {
                    const foundSection = supervisor.sections.find(
                        (s) => s.section_id === parseInt(sectionId),
                    );
                    if (foundSection) {
                        sectionName =
                            foundSection.section_name || `شعبة ${sectionId}`;
                        classId = foundSection.class_id || null;
                        className = foundSection.class_name || "";
                    }
                }
            });

            return { sectionName, classId, className };
        },
        [data],
    );

    // ============================================
    // تهيئة التحديدات من الـ Response
    // ============================================
    const initializeSelections = useCallback((data) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            setSelectedSections({});
            return;
        }

        const initialSelected = {};
        data.forEach((supervisor) => {
            if (supervisor.sections && Array.isArray(supervisor.sections)) {
                supervisor.sections.forEach((section) => {
                    if (
                        section.is_assigned === true ||
                        section.is_assigned === 1
                    ) {
                        const key = `${supervisor.supervisor_id}-${section.section_id}`;
                        initialSelected[key] = true;
                    }
                });
            }
        });
        setSelectedSections(initialSelected);
    }, []);

    // ============================================
    // جلب البيانات
    // ============================================
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getSupervisorsSections();

            if (
                response?.status === "success" &&
                Array.isArray(response.data)
            ) {
                setData(response.data);
                initializeSelections(response.data);
            } else {
                setError("تنسيق البيانات غير صحيح");
            }
        } catch (error) {
            console.error("❌ Error fetching supervisors data:", error);
            setError(error.message || "فشل في تحميل بيانات المشرفين");
            setSnackbar({
                open: true,
                message: "فشل في تحميل بيانات المشرفين",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    }, [initializeSelections]);

    // ============================================
    // تأثيرات (Effects)
    // ============================================
    useEffect(() => {
        if (
            initialData &&
            Array.isArray(initialData) &&
            initialData.length > 0
        ) {
            setData(initialData);
            initializeSelections(initialData);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [initialData, fetchData, initializeSelections]);

    // ============================================
    // معالجة الأحداث (Event Handlers)
    // ============================================

    const handleCheckboxChange = useCallback(
        (supervisorId, sectionId, isChecked) => {
            if (isSectionAssignedToOther(supervisorId, sectionId)) {
                setSnackbar({
                    open: true,
                    message: "هذه الشعبة محددة بالفعل لمشرف آخر",
                    severity: "warning",
                });
                return;
            }

            // عند تحديد الشعبة، يتم تخزين supervisor_id و section_id فقط
            setSelectedSections((prev) => {
                const key = `${supervisorId}-${sectionId}`;
                const newState = { ...prev };
                if (isChecked) {
                    newState[key] = true;
                } else {
                    delete newState[key];
                }
                return newState;
            });
        },
        [isSectionAssignedToOther],
    );

    const handleSelectAllForClass = useCallback(
        (supervisorId, sections, isChecked) => {
            setSelectedSections((prev) => {
                const newState = { ...prev };
                sections.forEach((section) => {
                    const key = `${supervisorId}-${section.section_id}`;
                    if (
                        !isSectionAssignedToOther(
                            supervisorId,
                            section.section_id,
                        )
                    ) {
                        if (isChecked) {
                            newState[key] = true;
                        } else {
                            delete newState[key];
                        }
                    }
                });
                return newState;
            });
        },
        [isSectionAssignedToOther],
    );

    // ============================================
    // حفظ البيانات - إرسال إلى الـ Backend مع class_id و section_id
    // ============================================
    const handleSave = useCallback(
        async (event) => {
            // منع إعادة تحميل الصفحة
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }

            try {
                setSaving(true);

                // تحويل البيانات المحددة إلى array مع class_id
                const assignments = [];

                Object.entries(selectedSections).forEach(
                    ([key, isSelected]) => {
                        if (isSelected) {
                            const [supervisorId, sectionId] = key.split("-");
                            const sectionIdNum = parseInt(sectionId);

                            // الحصول على تفاصيل الشعبة (class_id, section_name)
                            const { sectionName, classId, className } =
                                getSectionDetails(sectionIdNum);

                            // إضافة البيانات مع class_id و section_id
                            assignments.push({
                                section_id: sectionIdNum, // id الشعبة
                                section_name: sectionName, // اسم الشعبة
                                class_id: classId, // id الصف
                                class_name: className, // اسم الصف (اختياري)
                                supervisor_id: parseInt(supervisorId), // id المشرف
                            });
                        }
                    },
                );

                // التحقق من وجود بيانات للإرسال
                if (assignments.length === 0) {
                    setSnackbar({
                        open: true,
                        message: "لم يتم تحديد أي شعبة للحفظ",
                        severity: "warning",
                    });
                    setSaving(false);
                    return;
                }

                // تحضير البيانات للإرسال
                const payload = {
                    assignments: assignments,
                    total_count: assignments.length,
                    updated_at: new Date().toISOString(),
                };

                console.log(
                    "📤 Sending payload to backend:",
                    JSON.stringify(payload, null, 2),
                );

                // إرسال البيانات إلى الـ Backend
                const response = await updateSupervisorSections(payload);

                if (response?.status === "success") {
                    setSnackbar({
                        open: true,
                        message: `تم حفظ ${assignments.length} شعبة بنجاح`,
                        severity: "success",
                    });

                    if (onUpdate) {
                        await onUpdate();
                    }

                    // إعادة تحميل البيانات بعد الحفظ
                    await fetchData();
                } else {
                    throw new Error(
                        response?.message || "فشل في حفظ التغييرات",
                    );
                }
            } catch (error) {
                console.error("❌ Error saving:", error);
                setSnackbar({
                    open: true,
                    message: error.message || "فشل في حفظ التغييرات",
                    severity: "error",
                });
            } finally {
                setSaving(false);
            }
        },
        [selectedSections, onUpdate, fetchData, getSectionDetails],
    );

    const handleReset = useCallback(() => {
        initializeSelections(data);
        setSnackbar({
            open: true,
            message: "تم إعادة تعيين التغييرات",
            severity: "info",
        });
    }, [data, initializeSelections]);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    // ============================================
    // حساب البيانات المشتقة (Derived Data)
    // ============================================
    const totalSections = useMemo(
        () =>
            data.reduce(
                (acc, supervisor) =>
                    acc +
                    (supervisor.sections ? supervisor.sections.length : 0),
                0,
            ),
        [data],
    );

    const selectedCount = useMemo(
        () => Object.keys(selectedSections).length,
        [selectedSections],
    );

    const groupedData = useMemo(() => {
        if (!data || !Array.isArray(data)) return [];

        return data.map((supervisor) => ({
            ...supervisor,
            groupedSections: groupSectionsByClass(supervisor.sections),
        }));
    }, [data, groupSectionsByClass]);

    // ============================================
    // دوال التحقق
    // ============================================
    const isChecked = useCallback(
        (supervisorId, sectionId) => {
            return selectedSections[`${supervisorId}-${sectionId}`] || false;
        },
        [selectedSections],
    );

    const isAllSelectedForClass = useCallback(
        (supervisorId, sections) => {
            if (!sections || sections.length === 0) return false;
            return sections.every(
                (section) =>
                    isChecked(supervisorId, section.section_id) ||
                    isSectionAssignedToOther(supervisorId, section.section_id),
            );
        },
        [isChecked, isSectionAssignedToOther],
    );

    // ============================================
    // عرض حالات التحميل والأخطاء
    // ============================================
    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {[1, 2, 3].map((item) => (
                        <Grid item xs={12} key={item}>
                            <Skeleton
                                variant="rectangular"
                                height={200}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={fetchData}
                        >
                            إعادة المحاولة
                        </Button>
                    }
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="warning">
                    لا توجد بيانات للمشرفين. يرجى التأكد من الاتصال بالخادم.
                </Alert>
            </Box>
        );
    }

    // ============================================
    // عرض المكون الرئيسي
    // ============================================
    return (
        <Box
            sx={{ p: { xs: 1, sm: 2, md: 3 } }}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        >
            {/* ========================================== */}
            {/* Header */}
            {/* ========================================== */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    borderRadius: 2,
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Dashboard color="primary" />
                            توزيع الشعب على المشرفين
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 1 }}
                        >
                            قم بتحديد الشعب لكل مشرف - الشعب المحددة تصبح غير
                            متاحة للآخرين
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={{
                                xs: "flex-start",
                                md: "flex-end",
                            }}
                            flexWrap="wrap"
                            sx={{ gap: 1 }}
                        >
                            <Chip
                                icon={<People />}
                                label={`${data.length} مشرف`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                icon={<ClassIcon />}
                                label={`${totalSections} شعبة`}
                                color="secondary"
                                variant="outlined"
                            />
                            <Badge
                                badgeContent={selectedCount}
                                color="primary"
                                showZero
                            >
                                <Chip
                                    label="محددة"
                                    color={
                                        selectedCount > 0
                                            ? "success"
                                            : "default"
                                    }
                                    variant="outlined"
                                />
                            </Badge>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* ========================================== */}
            {/* Controls */}
            {/* ========================================== */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 1,
                }}
            >
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Button
                        type="button"
                        variant="outlined"
                        startIcon={<Refresh />}
                        onClick={handleReset}
                        size="medium"
                        disabled={saving}
                    >
                        إعادة تعيين
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={
                            selectedCount === totalSections ? (
                                <ClearAll />
                            ) : (
                                <SelectAll />
                            )
                        }
                        onClick={() => {
                            if (selectedCount === totalSections) {
                                setSelectedSections({});
                            } else {
                                const newState = {};
                                data.forEach((supervisor) => {
                                    if (supervisor.sections) {
                                        supervisor.sections.forEach(
                                            (section) => {
                                                if (
                                                    !isSectionAssignedToOther(
                                                        supervisor.supervisor_id,
                                                        section.section_id,
                                                    )
                                                ) {
                                                    newState[
                                                        `${supervisor.supervisor_id}-${section.section_id}`
                                                    ] = true;
                                                }
                                            },
                                        );
                                    }
                                });
                                setSelectedSections(newState);
                            }
                        }}
                        color={
                            selectedCount === totalSections
                                ? "error"
                                : "primary"
                        }
                        size="medium"
                    >
                        {selectedCount === totalSections
                            ? "إلغاء الكل"
                            : "تحديد الكل"}
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={
                            saving ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <Save />
                            )
                        }
                        onClick={handleSave}
                        color="success"
                        size="medium"
                        disabled={saving}
                    >
                        {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                </Stack>
            </Box>

            {/* ========================================== */}
            {/* Supervisor Cards */}
            {/* ========================================== */}
            <Box>
                {groupedData.map((supervisor, index) => (
                    <Grow
                        in
                        key={supervisor.supervisor_id}
                        timeout={500 + index * 100}
                    >
                        <Card
                            sx={{
                                mb: 2,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <CardContent>
                                {/* Supervisor Header */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 3,
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <SupervisorAvatar>
                                        {supervisor.supervisor_name?.charAt(
                                            0,
                                        ) || "?"}
                                    </SupervisorAvatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {supervisor.supervisor_name ||
                                                `مشرف ${supervisor.supervisor_id}`}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                        >
                                            ID: {supervisor.supervisor_id} •{" "}
                                            {supervisor.sections.length} شعبة
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={`${supervisor.sections.length} شعبة`}
                                        size="small"
                                        color="info"
                                        variant="outlined"
                                    />
                                </Box>

                                <Divider sx={{ mb: 3 }} />

                                {/* Classes Grid */}
                                {supervisor.groupedSections?.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {supervisor.groupedSections.map(
                                            (group) => {
                                                const allSelected =
                                                    isAllSelectedForClass(
                                                        supervisor.supervisor_id,
                                                        group.sections,
                                                    );
                                                const hasAssignableSections =
                                                    group.sections.some(
                                                        (s) =>
                                                            !isSectionAssignedToOther(
                                                                supervisor.supervisor_id,
                                                                s.section_id,
                                                            ),
                                                    );

                                                return (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        lg={4}
                                                        key={group.className}
                                                    >
                                                        <SectionPaper
                                                            selected={
                                                                allSelected
                                                            }
                                                        >
                                                            {/* Class Header */}
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "space-between",
                                                                    alignItems:
                                                                        "center",
                                                                    mb: 2,
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    sx={{
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    <School
                                                                        fontSize="small"
                                                                        sx={{
                                                                            mr: 1,
                                                                            verticalAlign:
                                                                                "middle",
                                                                        }}
                                                                    />
                                                                    {
                                                                        group.className
                                                                    }
                                                                    {/* class_id مخفي - للعرض فقط */}
                                                                    <Typography
                                                                        component="span"
                                                                        sx={{
                                                                            display:
                                                                                "none",
                                                                        }}
                                                                    >
                                                                        (ID:{" "}
                                                                        {
                                                                            group.class_id
                                                                        }
                                                                        )
                                                                    </Typography>
                                                                </Typography>
                                                                <Chip
                                                                    label={
                                                                        allSelected
                                                                            ? "محدد"
                                                                            : "غير محدد"
                                                                    }
                                                                    size="small"
                                                                    color={
                                                                        allSelected
                                                                            ? "success"
                                                                            : "default"
                                                                    }
                                                                    icon={
                                                                        allSelected ? (
                                                                            <CheckCircle />
                                                                        ) : (
                                                                            <RadioButtonUnchecked />
                                                                        )
                                                                    }
                                                                />
                                                            </Box>

                                                            <Divider
                                                                sx={{ mb: 2 }}
                                                            />

                                                            {/* Sections Checkboxes */}
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    flexWrap:
                                                                        "wrap",
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                {group.sections.map(
                                                                    (
                                                                        section,
                                                                    ) => {
                                                                        const isAssignedToOther =
                                                                            isSectionAssignedToOther(
                                                                                supervisor.supervisor_id,
                                                                                section.section_id,
                                                                            );

                                                                        // const isAssignedFromResponse = section.is_assigned === true || section.is_assigned === 1;
                                                                        // const isSectionChecked = isChecked(
                                                                        //     supervisor.supervisor_id,
                                                                        //     section.section_id
                                                                        // ) || isAssignedFromResponse;
                                                                        const isSectionChecked =
                                                                            isChecked(
                                                                                supervisor.supervisor_id,
                                                                                section.section_id,
                                                                            );
                                                                        return (
                                                                            <Tooltip
                                                                                key={
                                                                                    section.section_id
                                                                                }
                                                                                title={
                                                                                    isAssignedToOther
                                                                                        ? `محددة لـ ${getAssignedSupervisorName(section.section_id)}`
                                                                                        : ""
                                                                                }
                                                                                placement="top"
                                                                            >
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            checked={
                                                                                                isSectionChecked
                                                                                            }
                                                                                            onChange={(
                                                                                                e,
                                                                                            ) =>
                                                                                                handleCheckboxChange(
                                                                                                    supervisor.supervisor_id,
                                                                                                    section.section_id,
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                                )
                                                                                            }
                                                                                            disabled={
                                                                                                isAssignedToOther
                                                                                            }
                                                                                            color="primary"
                                                                                            size="small"
                                                                                        />
                                                                                    }
                                                                                    label={
                                                                                        <Box component="span">
                                                                                            {section.section_name ||
                                                                                                `شعبة ${section.section_id}`}
                                                                                            {/* section_id و class_id مخفيين */}
                                                                                            <span
                                                                                                style={{
                                                                                                    display:
                                                                                                        "none",
                                                                                                }}
                                                                                            >
                                                                                                (section_id:{" "}
                                                                                                {
                                                                                                    section.section_id
                                                                                                }
                                                                                                ,
                                                                                                class_id:{" "}
                                                                                                {
                                                                                                    section.class_id
                                                                                                }
                                                                                                )
                                                                                            </span>
                                                                                        </Box>
                                                                                    }
                                                                                    sx={{
                                                                                        margin: 0,
                                                                                        "& .MuiFormControlLabel-label":
                                                                                            {
                                                                                                fontSize:
                                                                                                    "0.875rem",
                                                                                            },
                                                                                    }}
                                                                                />
                                                                            </Tooltip>
                                                                        );
                                                                    },
                                                                )}
                                                            </Box>

                                                            {/* Select All Button for Class */}
                                                            <Box
                                                                sx={{
                                                                    mt: 2,
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "flex-end",
                                                                }}
                                                            >
                                                                <Button
                                                                    type="button"
                                                                    variant="text"
                                                                    size="small"
                                                                    color={
                                                                        allSelected
                                                                            ? "error"
                                                                            : "primary"
                                                                    }
                                                                    onClick={() =>
                                                                        handleSelectAllForClass(
                                                                            supervisor.supervisor_id,
                                                                            group.sections,
                                                                            !allSelected,
                                                                        )
                                                                    }
                                                                    startIcon={
                                                                        allSelected ? (
                                                                            <ClearAll />
                                                                        ) : (
                                                                            <SelectAll />
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        !hasAssignableSections
                                                                    }
                                                                >
                                                                    {allSelected
                                                                        ? "إلغاء الكل"
                                                                        : "تحديد الكل"}
                                                                </Button>
                                                            </Box>
                                                        </SectionPaper>
                                                    </Grid>
                                                );
                                            },
                                        )}
                                    </Grid>
                                ) : (
                                    <Alert severity="info">
                                        لا توجد شعب لهذا المشرف
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </Grow>
                ))}
            </Box>

            {/* ========================================== */}
            {/* Snackbar */}
            {/* ========================================== */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%", minWidth: 300 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SupervisorSections;
