import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
} from "@mui/material";

import { addSchoolYear  } from "../../../../services/setting/currentyears.service";

export default function AddNewYears({ refreshSchoolYears }){
    const [open, setOpen] = React.useState(false);

    const [formData, setFormData] = React.useState({
        from: "",
        to: "",
        is_active: false,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await addSchoolYear(formData);

            console.log("Saved:", response);

            // handleClose();
await refreshSchoolYears();
handleClose();
            // تنظيف الحقول
            setFormData({
                from: "",
                to: "",
                is_active: false,
            });
        } catch (error) {
            console.error("Error saving school year:", error);
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    direction: "rtl",
                }}
            >
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Year
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Add School Year</DialogTitle>

                <DialogContent>
                    <Typography>العام الدراسي من:</Typography>
                    <TextField
                        margin="dense"
                        label="Year"
                        name="from"
                        type="number"
                        value={formData.from}
                        onChange={handleChange}
                    />
                    <Typography>الى :</Typography>
                    <TextField
                        margin="dense"
                        label="Year"
                        name="to"
                        type="number"
                        value={formData.to}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                            />
                        }
                        label="هذا هو العام الدراسي الحالي"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
