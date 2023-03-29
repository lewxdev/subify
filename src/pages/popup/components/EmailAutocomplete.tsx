import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { AutocompleteProps as MUIAutocompleteProps } from "@mui/material/Autocomplete";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import useEmailAddresses, {
  createEmail,
  deleteEmail,
  updateEmail
} from "../hooks/useEmailAddresses";
import { createUIAlertMessage, commonEmailSchema } from "/@/utils/types";
import type { StoreEmail } from "/@/utils/types";

import { useAlertContext } from "./AlertProvider";

type AutocompleteProps = MUIAutocompleteProps<StoreEmail, false, false, true>;

export default function EmailAutocomplete() {
  const [options = [], dispatch] = useEmailAddresses();
  const { handleClose, setAlert } = useAlertContext();

  const getOptionLabel = (option: string | StoreEmail) =>
    typeof option === "string" ? option : option.key;

  const onChange: AutocompleteProps["onChange"] = (_, value, reason) => {
    switch (reason) {
      case "clear":
        handleClose();
        return;

      case "createOption":
        // `value` should be a string when creating an option
        if (typeof value !== "string") return;
        if (options.some((item) => item.key === value))
          return dispatch(updateEmail({ key: value, prop: "isLastSelected" }));

        const result = commonEmailSchema.safeParse(value);

        if (!result.success) {
          const [error] = result.error.flatten().formErrors;
          setAlert(createUIAlertMessage(error, "error"));
          return;
        }

        dispatch(createEmail({ key: result.data }));
        setAlert(createUIAlertMessage("Email added", "success"));
        return;

      case "selectOption":
        // `options` should not contain these types
        if (typeof value === "string" || value === null) return;

        dispatch(updateEmail({ key: value.key, prop: "isLastSelected" }));
        setAlert(createUIAlertMessage("Email selected", "success"));
        return;
    }
  };

  const renderInput: AutocompleteProps["renderInput"] = (props) => (
    <TextField {...props} label="Email" placeholder="Enter an email address" />
  );

  const renderOption: AutocompleteProps["renderOption"] = (props, option) => {
    const handleSetDefault: React.MouseEventHandler = (event) => {
      dispatch(updateEmail({ key: option.key, prop: "isDefault" }));
      event.stopPropagation();
    };

    const handleDelete: React.MouseEventHandler = (event) => {
      dispatch(deleteEmail({ key: option.key }));
      event.stopPropagation();
    };

    return (
      <Box component="li" {...props}>
        <Typography flex={1} noWrap sx={{ mr: 1 }}>
          {option.key}
        </Typography>
        <IconButton onClick={handleSetDefault}>
          {option.isDefault ? <StarRoundedIcon /> : <StarOutlineRoundedIcon />}
        </IconButton>
        <IconButton edge="end" onClick={handleDelete}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Autocomplete
      autoComplete
      forcePopupIcon
      freeSolo
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      ListboxProps={{ sx: { maxHeight: 120 } }}
      onChange={onChange}
      options={options}
      renderInput={renderInput}
      renderOption={renderOption}
      size="small"
      value={options.find((item) => item.isLastSelected) ?? null}
    />
  );
}
