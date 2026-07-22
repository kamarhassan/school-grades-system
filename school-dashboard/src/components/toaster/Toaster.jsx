import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Toaster({ open, message, type = 'success', onClose }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={onClose} severity={type} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}