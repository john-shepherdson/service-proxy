import * as React from "../../../common/keycloak/web_modules/react.js";
import { useState, useRef } from "../../../common/keycloak/web_modules/react.js";
import { DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Button, TextInput, InputGroup, Tooltip } from "../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { ConfirmationModal } from "./Modal.js";
import { GroupsServiceClient } from "../groups-mngnt-service/groups.service.js";
import { MinusIcon, PlusIcon } from "../../../common/keycloak/web_modules/@patternfly/react-icons.js";
export const GroupDetails = props => {
  let groupsService = new GroupsServiceClient();
  const roleRef = useRef(null);
  const [roleInput, setRoleInput] = useState("");
  const [modalInfo, setModalInfo] = useState({});

  const addGroupRole = role => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/roles", {}, {
      params: {
        name: role
      }
    }).then(response => {
      if (response.status === 200 || response.status === 204) {
        props.groupConfiguration.groupRoles.push(role);
        props.setGroupConfiguration({ ...props.groupConfiguration
        });
        setRoleInput("");
        setModalInfo({});
      }
    });
  };

  const removeGroupRole = role => {
    groupsService.doDelete("/group-admin/group/" + props.groupId + "/role/" + role).then(response => {
      if (response.status === 200 || response.status === 204) {
        const index = props.groupConfiguration.groupRoles.indexOf(role);

        if (index > -1) {
          // only splice array when item is found
          props.groupConfiguration.groupRoles.splice(index, 1); // 2nd parameter means remove one item only
        }

        props.setGroupConfiguration({ ...props.groupConfiguration
        });
      }

      setModalInfo({});
    }).catch(err => {
      setModalInfo({});
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Compact data list example",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement("strong", null, "Path"))), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "secondary content "
    }, /*#__PURE__*/React.createElement("span", null, props.groupConfiguration?.path))]
  }))), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item2"
  }, /*#__PURE__*/React.createElement(DataListItemRow, {
    className: "gm_role_row"
  }, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement("strong", null, "Group Roles"))), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "roles"
    }, /*#__PURE__*/React.createElement("table", {
      className: "gm_roles-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(InputGroup, null, /*#__PURE__*/React.createElement(TextInput, {
      id: "textInput-basic-1",
      value: roleInput,
      placeholder: "Add new role",
      onChange: e => {
        setRoleInput(e.trim());
      },
      onKeyDown: e => {
        e.key === 'Enter' && roleRef?.current?.click();
      },
      type: "email",
      "aria-label": "email input field"
    }))), /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement("div", null, "Add Role")
    }, /*#__PURE__*/React.createElement(Button, {
      ref: roleRef,
      onClick: () => {
        if (props.groupConfiguration?.groupRoles.includes(roleInput)) {
          setModalInfo({
            title: "Invalid Role",
            accept_message: "OK",
            message: "The role (" + roleInput + ") cannot be added because it already exists in this group.",
            accept: function () {
              setModalInfo({});
            },
            cancel: function () {
              setModalInfo({});
            }
          });
        } else {
          setModalInfo({
            title: "Confirmation",
            accept_message: "Yes",
            cancel_message: "No",
            message: "Are you sure you want to add the role " + roleInput + " to this group.",
            accept: function () {
              addGroupRole(roleInput);
            },
            cancel: function () {
              setModalInfo({});
            }
          });
        }
      }
    }, /*#__PURE__*/React.createElement(PlusIcon, null)))))), /*#__PURE__*/React.createElement("tbody", null, props.groupConfiguration?.groupRoles?.map((role, index) => {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Tooltip, {
        content: /*#__PURE__*/React.createElement("div", null, "Remove Role")
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "danger",
        onClick: () => {
          setModalInfo({
            title: "Confirmation",
            accept_message: "Yes",
            cancel_message: "No",
            message: "Are you sure you want to remove the role " + role + " from this group.",
            accept: function () {
              removeGroupRole(role);
            },
            cancel: function () {
              setModalInfo({});
            }
          });
        }
      }, /*#__PURE__*/React.createElement(MinusIcon, null)))));
    }))))]
  })))));
};
//# sourceMappingURL=GroupDetails.js.map