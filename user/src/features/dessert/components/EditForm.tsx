import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, Fade, Grid } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Submit from "components/buttons/Submit";
import DialogTitle from "components/forms/DialogTitle";
import TextField from "components/inputs/TextField";
import { useSnackbar } from "context/snackbarContext";
import { DessertAction, dessertQueries } from "features/dessert";
import { queryStore } from "features/shared";
import useEditSearchParams from "hooks/useEditSearchParams";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { parseResponseError } from "utils/apiHelpers";
import { dessertDefaultForm, dessertSchema } from "./validation";
import { Select } from "components/selects/Select";
import { DessertType } from "constants/enums";
export type EditFormProps = {};
export const EditForm: FC<EditFormProps> = ({}) => {
  const { isActive, clearEditParams, id = "" } = useEditSearchParams();
  const { t } = useTranslation("dessert");
  const query = dessertQueries.useDetails(id);
  const { control, reset, handleSubmit, setError } = useForm<DessertAction>({
    resolver: zodResolver(dessertSchema),

    defaultValues: query.data ?? dessertDefaultForm,
  });
  const queryClient = useQueryClient();
  const successSnackbar = useSuccessSnackbar();
  const snackbar = useSnackbar();
  const mutation = dessertQueries.useEdit();
  const handleClose = () => {
    clearEditParams();
    reset(dessertDefaultForm);
  };
  const onSubmit = async (body: DessertAction) => {
    mutation.mutate(
      { id, ...body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryStore.dessert.all._def);
          queryClient.invalidateQueries(queryStore.dessert.details(id));
          handleClose();
          successSnackbar(t("message.success.edit"));
        },
        onError: parseResponseError({ snackbar, setError }),
      }
    );
  };
  useEffect(() => {
    if (query.data) reset(query.data);
  }, [query.data, reset]);

  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <Fade in={isActive} timeout={0}>
        <DialogTitle
          onClose={handleClose}
          fontSize={22}
          color="primary"
          skeleton={query.isLoading}
        >
          {query.isSuccess && t("edit", { name: query.data.name })}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={query.isLoading}>
            <Grid container spacing={1} my={1}>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  name="name"
                  label={t(`form.name`)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onClear={() => field.onChange("")}
                      options={DessertType}
                      label={t(`form.type`)}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  name="price"
                  label={t(`form.price`)}
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" display="flex" mt={3}>
                <Submit isSubmitting={mutation.isLoading} />
              </Grid>
            </Grid>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
