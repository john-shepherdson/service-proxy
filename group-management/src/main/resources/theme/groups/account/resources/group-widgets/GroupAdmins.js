function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from "../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../common/keycloak/web_modules/react.js";
import { DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Button, Tooltip, DataListAction, SelectVariant, Checkbox, Select, SelectOption, FormAlert, Alert } from "../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { GroupsServiceClient } from "../groups-mngnt-service/groups.service.js"; // @ts-ignore

import { ConfirmationModal } from "./Modal.js";
import { ValidateEmail } from "../js/utils.js";
export const GroupAdmins = props => {
  const titleId = 'typeahead-select-id-1';
  let groupsService = new GroupsServiceClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [inviteAddress, setInviteAddress] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [modalInfo, setModalInfo] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {
    fetchGroupMembers();
  }, []);

  const noAdmins = () => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      key: "emptyItem",
      "aria-labelledby": "empty-item"
    }, /*#__PURE__*/React.createElement(DataListItemRow, {
      key: "emptyRow"
    }, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "empty"
      }, /*#__PURE__*/React.createElement("strong", null, "This group has no admins"))]
    })));
  };

  const disapearingMessage = message => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const onSelect = (event, selection, isPlaceholder) => {
    setInviteAddress("");
    if (isPlaceholder) clearSelection();else if (!selectUser(selection) && selection) {
      if (ValidateEmail(selection)) {
        setInviteAddress(selection);
      } else {
        setInviteAddress("");
        setEmailError(true);
      }
    } else {
      setIsOpen(false);
    }
    setSelected(selection);
  };

  const selectUser = username => {
    let userId;
    options.forEach(user => {
      if (user.value === username) {
        userId = user.id;
      }
    });
    setSelectedUserId(userId);
    return userId;
  };

  const makeAdmin = userId => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/admin/" + userId, {}).then(response => {
      if (response.status === 200 || response.status === 204) {
        props.fetchGroupConfiguration();
        disapearingMessage("Admin Succesfully Added."); // setGroupMembers(response.data.results);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const removeAdmin = userId => {
    groupsService.doDelete("/group-admin/group/" + props.groupId + "/admin/" + userId, {}).then(response => {
      if (response.status === 200 || response.status === 204) {
        props.fetchGroupConfiguration(); // setGroupMembers(response.data.results);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const sendInvitation = email => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/admin/invite", {
      "email": email
    }).then(response => {
      if (response.status === 200 || response.status === 204) {
        disapearingMessage("Invitation was succesfully sent to the email address.");
        props.fetchGroupConfiguration(); // setGroupMembers(response.data.results);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  let fetchGroupMembers = async (searchString = "") => {
    groupsService.doGet("/group-admin/group/" + props.groupId + "/members", {
      params: {
        max: 20,
        search: searchString
      }
    }).then(response => {
      if (response.status === 200 && response.data) {
        let members = [];
        response.data.results.forEach(membership => {
          members.push({
            value: membership.user.username,
            description: membership.user.email,
            id: membership.user.id
          });
        });
        setOptions(members); // setGroupMembers(response.data.results);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const clearSelection = () => {
    setSelected(null);
    setIsOpen(false);
    setOptions([]);
  };

  const onToggle = open => {
    setIsOpen(open);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Group Member Datalist",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      width: 1,
      key: "id-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Id")), /*#__PURE__*/React.createElement(DataListCell, {
      width: 1,
      key: "username-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Username")), /*#__PURE__*/React.createElement(DataListCell, {
      width: 1,
      key: "email-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Email")), /*#__PURE__*/React.createElement(DataListCell, {
      width: 1,
      key: "email-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Direct Admin"))]
  }), /*#__PURE__*/React.createElement(DataListAction, {
    className: "gm_cell-center",
    "aria-labelledby": "check-action-item1 check-action-action2",
    id: "check-action-action1",
    "aria-label": "Actions",
    isPlainButtonAction: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_cell-placeholder"
  })))), props.groupConfiguration?.admins?.length > 0 ? props.groupConfiguration.admins.map((admin, index) => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      "aria-labelledby": "member-" + index
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        width: 1,
        key: "primary content"
      }, admin.user.id), /*#__PURE__*/React.createElement(DataListCell, {
        width: 1,
        key: "secondary content "
      }, admin.user.username), /*#__PURE__*/React.createElement(DataListCell, {
        width: 1,
        key: "secondary content "
      }, admin.user.email), /*#__PURE__*/React.createElement(DataListCell, {
        width: 1,
        key: "secondary content "
      }, /*#__PURE__*/React.createElement(Tooltip, {
        content: /*#__PURE__*/React.createElement("div", null, admin.direct ? "This user is a direct admin in this group" : "This user is not a direct admin in this group")
      }, /*#__PURE__*/React.createElement(Checkbox, {
        id: "disabled-check-1",
        className: "gm_direct-checkbox",
        defaultChecked: admin.direct ? true : false,
        isDisabled: true
      })))]
    }), admin.direct ? /*#__PURE__*/React.createElement(DataListAction, {
      className: "gm_cell-center",
      "aria-labelledby": "check-action-item1 check-action-action1",
      id: "check-action-action1",
      "aria-label": "Actions",
      isPlainButtonAction: true
    }, /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement("div", null, admin.user.id === props.user.userId ? "Revoke Admin Rights for this group" : "Revoke Admin Rights for this group")
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      className: "gm_x-button-small",
      onClick: () => {
        setModalInfo({
          title: "Confirmation",
          accept_message: "YES",
          cancel_message: "NO",
          message: "Are you sure you want to remove this user as an admin to this group.",
          accept: function () {
            removeAdmin(admin.user.id);
            setModalInfo({});
          },
          cancel: function () {
            setModalInfo({});
          }
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gm_x-button"
    })))) : ""));
  }) : noAdmins()), /*#__PURE__*/React.createElement("div", {
    className: "gm_add-admin-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Add New Group Admin"), /*#__PURE__*/React.createElement("p", null, "Use the input to search for a user to add as a group admin, or type a valid email address to send an invitation."), /*#__PURE__*/React.createElement("div", {
    className: "gm_add-admin-input"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Select, {
    variant: SelectVariant.typeahead,
    typeAheadAriaLabel: "Select a state",
    onToggle: onToggle,
    onSelect: onSelect,
    onClear: clearSelection,
    selections: selected,
    createText: "Invite with email",
    onCreateOption: value => {
      if (ValidateEmail(value)) {
        setInviteAddress(value);
      } else {
        setInviteAddress("");
        setEmailError(true);
      }
    },
    onFilter: (e, searchString) => {
      setInviteAddress("");
      setSelectedUserId("");
      setEmailError(false);
      let filterOptions = [];
      fetchGroupMembers(searchString);
      options.forEach((option, index) => filterOptions.push( /*#__PURE__*/React.createElement(SelectOption, _extends({
        isDisabled: option.disabled,
        key: index,
        value: option.value
      }, option.description && {
        description: option.description
      }))));
      return filterOptions;
    },
    isOpen: isOpen,
    "aria-labelledby": titleId,
    isInputValuePersisted: true,
    placeholderText: "Select a user",
    isCreatable: true
  }, options.map((option, index) => /*#__PURE__*/React.createElement(SelectOption, _extends({
    isDisabled: option.disabled,
    key: index,
    value: option.value
  }, option.description && {
    description: option.description
  })))), successMessage ? /*#__PURE__*/React.createElement(FormAlert, null, /*#__PURE__*/React.createElement(Alert, {
    variant: "success",
    title: successMessage,
    "aria-live": "polite",
    isInline: true
  })) : null, emailError ? /*#__PURE__*/React.createElement(FormAlert, null, /*#__PURE__*/React.createElement(Alert, {
    variant: "danger",
    title: "Invalid Email",
    "aria-live": "polite",
    isInline: true
  })) : null), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement("div", null, selectedUserId ? "Add selected user as an admin to this group." : emailError ? "To send an invitation please provide a valid email address." : inviteAddress ? "Send invitation to become a group admin." : "Select a user or provide a valid a valid email address to add/invite a user to become a group admin.")
  }, /*#__PURE__*/React.createElement(Button, {
    isDisabled: !(selectedUserId || !emailError && inviteAddress),
    className: "gm_admin-button " + (inviteAddress || emailError ? "gm_invitation-button" : "gm_add-admin-button"),
    onClick: () => {
      if (selectedUserId) {
        setModalInfo({
          title: "Confirmation",
          accept_message: "YES",
          cancel_message: "NO",
          message: "Are you sure you want to add this user (" + selected + ") as an admin to this group.",
          accept: function () {
            makeAdmin(selectedUserId);
            setModalInfo({});
          },
          cancel: function () {
            setModalInfo({});
          }
        });
      }

      if (inviteAddress) {
        setModalInfo({
          title: "Confirmation",
          accept_message: "YES",
          cancel_message: "NO",
          message: "Are you sure you want to send an invitation to this address (" + selected + ").",
          accept: function () {
            sendInvitation(inviteAddress);
            setModalInfo({});
          },
          cancel: function () {
            setModalInfo({});
          }
        });
      }
    }
  }, /*#__PURE__*/React.createElement("div", null))))));
};
//# sourceMappingURL=GroupAdmins.js.map