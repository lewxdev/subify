import { createContext, useContext, useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import type { UIAlertMessage } from "/@/utils/types";

interface AlertContext {
  setAlert: React.Dispatch<React.SetStateAction<UIAlertMessage | null>>;
  handleClose: () => void;
}

const AlertContext = createContext<AlertContext | null>(null);

export function useAlertContext(): AlertContext {
  const context = useContext(AlertContext);

  if (!context) throw "useAlertContext must be used within AlertProvider";
  return context;
}

interface Props {
  children: React.ReactNode;
}

export default function AlertProvider({ children }: Props) {
  const [alert, setAlert] = useState<UIAlertMessage | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (alert) setOpen(true);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ handleClose, setAlert }}>
      {children}
      <Collapse in={open} onExited={() => setAlert(null)}>
        <Alert
          elevation={1}
          onClose={handleClose}
          severity={alert?.severity}
          sx={{ my: 0.5 }}
        >
          {alert?.message}
        </Alert>
      </Collapse>
    </AlertContext.Provider>
  );
}
