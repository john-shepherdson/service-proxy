import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { AlertVariant, Switch } from "@patternfly/react-core";

import type RequiredActionProviderRepresentation from "@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation";
import type RequiredActionProviderSimpleRepresentation from "@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderSimpleRepresentation";
import { useAdminClient, useFetch } from "../context/auth/AdminClient";
import { DraggableTable } from "./components/DraggableTable";
import { useAlerts } from "../components/alert/Alerts";
import { KeycloakSpinner } from "../components/keycloak-spinner/KeycloakSpinner";
import { toKey } from "../util";

type DataType = RequiredActionProviderRepresentation &
  RequiredActionProviderSimpleRepresentation;

type Row = {
  name: string;
  enabled: boolean;
  defaultAction: boolean;
  data: DataType;
};

type ResetIntervalConfig = {
  reset_every_value?: number;
  reset_every_unit?: string;
};

export const RequiredActions = () => {
  const { t } = useTranslation("authentication");
  const { adminClient } = useAdminClient();
  const { addAlert, addError } = useAlerts();

  const [actions, setActions] = useState<Row[]>();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [resetIntervalOpen, toggleResetIntervalOpen] = useToggle();
  const { handleSubmit } = useForm<ResetIntervalConfig>();

const submitForm = async (config: ResetIntervalConfig) => {

try {

       toggleResetIntervalOpen();
       addAlert(
        t("authentication:resetIntervalSaved"),
        AlertVariant.success
      );
    } catch (error) {
      addError("authentication:updatedRequiredActionError", error);
    }
  };


  useFetch(
    async () => {
      const [requiredActions, unregisteredRequiredActions] = await Promise.all([
        adminClient.authenticationManagement.getRequiredActions(),
        adminClient.authenticationManagement.getUnregisteredRequiredActions(),
      ]);
      return [
        ...requiredActions.map((a) => ({
          name: a.name!,
          enabled: a.enabled!,
          defaultAction: a.defaultAction!,
          data: a,
        })),
        ...unregisteredRequiredActions.map((a) => ({
          name: a.name!,
          enabled: false,
          defaultAction: false,
          data: a,
        })),
      ];
    },
    (actions) => setActions(actions),
    [key]
  );

  const isUnregisteredAction = (data: DataType): boolean => {
    return !("alias" in data);
  };

  const updateAction = async (
    action: DataType,
    field: "enabled" | "defaultAction"
  ) => {
    try {
      if (field === "resetInterval") {
        await adminClient.authenticationManagement.updateRequiredAction(
          { alias: action.alias! },
          action
        );
      } else if (field in action) {
        action[field] = !action[field];
        await adminClient.authenticationManagement.updateRequiredAction(
          { alias: action.alias! },
          action
        );
      } else if (isUnregisteredAction(action)) {
        await adminClient.authenticationManagement.registerRequiredAction({
          name: action.name,
          providerId: action.providerId,
        });
      }
      refresh();
      addAlert(t("updatedRequiredActionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updatedRequiredActionError", error);
    }
  };

  const executeMove = async (
    action: RequiredActionProviderRepresentation,
    times: number
  ) => {
    try {
      const alias = action.alias!;
      for (let index = 0; index < Math.abs(times); index++) {
        if (times > 0) {
          await adminClient.authenticationManagement.lowerRequiredActionPriority(
            {
              alias,
            }
          );
        } else {
          await adminClient.authenticationManagement.raiseRequiredActionPriority(
            {
              alias,
            }
          );
        }
      }
      refresh();

      addAlert(t("updatedRequiredActionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updatedRequiredActionError", error);
    }
  };

  if (!actions) {
    return <KeycloakSpinner />;
  }

  return (
      <>
     {resetIntervalOpen && (
        <Modal
      variant={ModalVariant.small}
      title={t("resetInterval" )}
      isOpen={true}
      onClose={toggleResetIntervalOpen}
      actions={[
        <Button
          data-testid="save-reset-intervals-button"
          key="save"
          variant="primary"
          type="submit"
          form="reset-intervals-form"
        >
          {t("common:save")}
        </Button>,
        <Button
          id="modal-cancel"
          data-testid="cancel"
          key="cancel"
          variant={ButtonVariant.link}
          onClick={() => {
            handleModalToggle();
          }}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Form id="reset-intervals-form" isHorizontal onSubmit={handleSubmit(submitForm)}>
         <FormGroup
            name="reset-every-value-group"
            label={t("common:name")}
            fieldId="reset-every-value"
         >
            <KeycloakTextInput
              data-testid="resetEveryValue"
              autoFocus
              id="reset-every-value"
              type="number"
              min={0}
              {...register("reset_every_value")}
            />
         </FormGroup>
         <FormGroup
            name="reset-every-unit-group"
            label={t("common:name")}
            fieldId="reset-every-unit"
         >
            <KeycloakTextInput
              data-testid="resetEveryUnit"
              autoFocus
              id="reset-every-unit"
              {...register("reset_every_unit")}
            />
        </FormGroup>
      </Form>
    </Modal>
      )}
    <DraggableTable
      keyField="name"
      onDragFinish={async (nameDragged, items) => {
        const keys = actions.map((e) => e.name);
        const newIndex = items.indexOf(nameDragged);
        const oldIndex = keys.indexOf(nameDragged);
        const dragged = actions[oldIndex].data;
        if (!dragged.alias) return;

        const times = newIndex - oldIndex;
        executeMove(dragged, times);
      }}
      columns={[
        {
          name: "name",
          displayKey: "authentication:requiredActions",
        },
        {
          name: "enabled",
          displayKey: "common:enabled",
          cellRenderer: (row) => (
            <Switch
              id={`enable-${toKey(row.name)}`}
              label={t("common:on")}
              labelOff={t("common:off")}
              isChecked={row.enabled}
              onChange={() => {
                updateAction(row.data, "enabled");
              }}
              aria-label={toKey(row.name)}
            />
          ),
        },
        {
          name: "default",
          displayKey: "authentication:setAsDefaultAction",
          thTooltipText: "authentication-help:authDefaultActionTooltip",
          cellRenderer: (row) => (
            <Switch
              id={`default-${toKey(row.name)}`}
              label={t("common:on")}
              isDisabled={!row.enabled}
              labelOff={!row.enabled ? t("disabledOff") : t("common:off")}
              isChecked={row.defaultAction}
              onChange={() => {
                updateAction(row.data, "defaultAction");
              }}
              aria-label={toKey(row.name)}
            />
          ),
        },
        {
          name: "settings",
          displayKey: "common:settings",
          cellRenderer: (row) => (

              <Dropdown
                toggle={
                  <KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />
                }
                isOpen={kebabOpen}
                isPlain
                dropdownItems={[
                  <DropdownItem key="rename" onClick={toggleResetInterval}>
                    {t("authentication:resetInterval")}
                  </DropdownItem>,
                ]}
              />
          ),
        },
      ]}
      data={actions}
    />
  );
};
