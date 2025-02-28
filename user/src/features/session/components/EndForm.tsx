import { Grid } from "@mui/material";
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

export type EndFormProps = {
  id: string;
};
export const EndForm: FC<EndFormProps> = ({ id }) => {
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
          <Submit isSubmitting={mutation.isLoading} />
        </Grid>
      </Grid>
    </form>
  );
};
