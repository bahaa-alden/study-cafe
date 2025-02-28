import { Button, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "context/snackbarContext";
import { queryStore } from "features/shared";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { sessionQueries } from "..";
import { SessionAction } from "../api/type";
import Submit from "components/buttons/Submit";
import { SessionStatus } from "constants/enums";
import { purple } from "@mui/material/colors";

export type EndFormProps = {
  id: string;
  status: string;
};
export const EndForm: FC<EndFormProps> = ({ id, status }) => {
  const { t } = useTranslation("session");
  const { handleSubmit, setError } = useForm<SessionAction>({});
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const mutation = sessionQueries.useEnd();
  const onSubmit = async () => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryStore.session.all._def);
        successSnackbar(t("message.success.end"));
      },
      onError: parseResponseError({ snackbar, setError }),
    });
  };
  t;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid>
          <Submit
            sx={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              backgroundColor: purple[600],
              "&:hover": { backgroundColor: purple[800] },
            }}
            isSubmitting={mutation.isLoading}
            disabled={status === SessionStatus.ended}
          >
            <Button sx={{ color: "white" }}>End</Button>
          </Submit>
        </Grid>
      </Grid>
    </form>
  );
};
