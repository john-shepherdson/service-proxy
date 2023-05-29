import * as React from "../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../common/keycloak/web_modules/react.js";
import { DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Button, Tooltip, DataListAction, Pagination, Dropdown, BadgeToggle, DropdownItem, Badge, Modal, Checkbox } from "../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { GroupsServiceClient } from "../groups-mngnt-service/groups.service.js"; // @ts-ignore

import { ConfirmationModal } from "./Modal.js";
import { SearchInput } from "./SearchInput.js";
import { CheckIcon } from "../../../common/keycloak/web_modules/@patternfly/react-icons.js"; //import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '

export const GroupMembers = props => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [modalInfo, setModalInfo] = useState({});
  const [statusSelection, setStatusSelection] = useState("");
  const [roleSelection, setRoleSelection] = useState("");
  const [editMemberRoles, setEditMemberRoles] = useState({});
  let groupsService = new GroupsServiceClient();
  useEffect(() => {
    fetchGroupMembers();
  }, []);
  useEffect(() => {
    setPage(1);
    fetchGroupMembers();
  }, [statusSelection]);
  useEffect(() => {
    fetchGroupMembers();
  }, [perPage, page]);
  const [isOpen, setIsOpen] = React.useState({
    status: false,
    roles: false
  });

  const onToggle = (open, type) => {
    isOpen[type] = open;
    setIsOpen({ ...isOpen
    });
  };

  const onFocus = type => {
    const element = document.getElementById('toggle-badge-' + type);
    element?.focus();
  };

  const onSelect = type => {
    isOpen[type] = false;
    setIsOpen({ ...isOpen
    });
    onFocus(type);
  };

  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  let fetchGroupMembers = (searchString = undefined) => {
    groupsService.doGet("/group-admin/group/" + props.groupId + "/members?first=" + perPage * (page - 1) + "&max=" + perPage + (searchString ? "&search=" + searchString : ""), {
      params: statusSelection.length > 0 ? {
        status: statusSelection
      } : {}
    }).then(response => {
      if (response.status === 200 && response.data) {
        setTotalItems(response.data.count);
        setGroupMembers(response.data.results);
      }
    });
  };

  let deleteGroupMember = memberId => {
    groupsService.doDelete("/group-admin/group/" + props.groupId + "/member/" + memberId).then(response => {
      if (response.status === 200 || response.status === 204) {
        fetchGroupMembers();
      }
    });
  };

  let suspendGroupMember = memberId => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/member/" + memberId + "/suspend", {}).then(response => {
      if (response.status === 200 || response.status === 204) {
        fetchGroupMembers();
      }
    });
  };

  let activateGroupMember = memberId => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/member/" + memberId + "/activate", {}).then(response => {
      if (response.status === 200 || response.status === 204) {
        fetchGroupMembers();
      }
    });
  };

  const noMembers = () => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      key: "emptyItem",
      "aria-labelledby": "empty-item"
    }, /*#__PURE__*/React.createElement(DataListItemRow, {
      key: "emptyRow"
    }, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "empty"
      }, /*#__PURE__*/React.createElement("strong", null, "No group members found"))]
    })));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ConfirmationModal, {
    modalInfo: modalInfo
  }), /*#__PURE__*/React.createElement(EditRolesModal, {
    member: editMemberRoles,
    setMember: setEditMemberRoles,
    groupRoles: props.groupConfiguration?.groupRoles,
    groupId: props.groupId,
    fetchGroupMembers: fetchGroupMembers
  }), /*#__PURE__*/React.createElement(SearchInput, {
    searchText: "Search based on Username or Email",
    cancelText: "View All Group Members",
    search: searchString => {
      fetchGroupMembers(searchString);
      setPage(1);
    },
    cancel: () => {
      fetchGroupMembers();
      setPage(1);
    }
  }), /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Group Member Datalist",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "id-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Community User Identifier")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "username-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Username")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "email-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Name / email")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "email-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Roles"), /*#__PURE__*/React.createElement(Dropdown, {
      onSelect: () => {
        onSelect('roles');
      },
      toggle: /*#__PURE__*/React.createElement(BadgeToggle, {
        id: "toggle-badge-roles",
        onToggle: e => {
          onToggle(e, 'roles');
        }
      }, roleSelection ? roleSelection : "all"),
      className: "gm_badge_dropdown",
      isOpen: isOpen.roles,
      dropdownItems: [/*#__PURE__*/React.createElement(DropdownItem, {
        key: "all",
        component: "button",
        onClick: () => {
          setRoleSelection('');
        },
        icon: !roleSelection && /*#__PURE__*/React.createElement(CheckIcon, null)
      }, "all"), ...(props.groupConfiguration && props.groupConfiguration.groupRoles ? props.groupConfiguration.groupRoles.map(role => {
        return /*#__PURE__*/React.createElement(DropdownItem, {
          key: role,
          component: "button",
          onClick: () => {
            setRoleSelection(role);
          },
          icon: roleSelection === role && /*#__PURE__*/React.createElement(CheckIcon, null)
        }, role);
      }) : [])]
    })), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 3,
      key: "expiration-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Membership Expiration")), /*#__PURE__*/React.createElement(DataListCell, {
      className: "gm_vertical_center_cell",
      width: 2,
      key: "status-hd"
    }, /*#__PURE__*/React.createElement("strong", null, "Status", /*#__PURE__*/React.createElement(Dropdown, {
      onSelect: () => {
        onSelect('status');
      },
      toggle: /*#__PURE__*/React.createElement(BadgeToggle, {
        id: "toggle-badge-status",
        onToggle: e => {
          onToggle(e, 'status');
        }
      }, statusSelection === "ENABLED" ? "active" : statusSelection ? statusSelection.toLowerCase() : "all"),
      className: "gm_badge_dropdown",
      isOpen: isOpen.status,
      dropdownItems: [/*#__PURE__*/React.createElement(DropdownItem, {
        key: "All",
        component: "button",
        onClick: () => {
          setStatusSelection("");
        },
        icon: !statusSelection && /*#__PURE__*/React.createElement(CheckIcon, null)
      }, "All"), /*#__PURE__*/React.createElement(DropdownItem, {
        key: "Enabled",
        component: "button",
        onClick: () => {
          setStatusSelection("ENABLED");
        },
        icon: statusSelection === "ENABLED" && /*#__PURE__*/React.createElement(CheckIcon, null)
      }, "Active"), /*#__PURE__*/React.createElement(DropdownItem, {
        key: "Suspended",
        component: "button",
        onClick: () => {
          setStatusSelection("SUSPENDED");
        },
        icon: statusSelection === "SUSPENDED" && /*#__PURE__*/React.createElement(CheckIcon, null)
      }, "Suspended"), /*#__PURE__*/React.createElement(DropdownItem, {
        key: "Pending",
        component: "button",
        onClick: () => {
          setStatusSelection("PENDING");
        },
        icon: statusSelection === "PENDING" && /*#__PURE__*/React.createElement(CheckIcon, null)
      }, "Pending")]
    })))]
  }), /*#__PURE__*/React.createElement(DataListAction, {
    className: "gm_cell-center",
    "aria-labelledby": "check-action-item1 check-action-action2",
    id: "check-action-action1",
    "aria-label": "Actions",
    isPlainButtonAction: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "gm_cell-placeholder"
  })))), groupMembers.length > 0 ? groupMembers.map((member, index) => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      "aria-labelledby": "member-" + index
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "primary content"
      }, member.user?.attributes?.voPersonID || "Not Available"), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, member.user.username), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, /*#__PURE__*/React.createElement("span", {
        className: "gm_fullname_datalist pf-c-select__menu-item-main"
      }, member.user.firstName && member.user.lastName ? member.user.firstName + " " + member.user.lastName : "Not Available"), /*#__PURE__*/React.createElement("span", {
        className: "gm_email_datalist pf-c-select__menu-item-description"
      }, member.user.email)), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, member.groupRoles.map((role, index) => {
        return /*#__PURE__*/React.createElement(Badge, {
          key: index,
          className: "gm_role_badge",
          isRead: true
        }, role);
      }), /*#__PURE__*/React.createElement(Tooltip, {
        content: /*#__PURE__*/React.createElement("div", null, "Edit Member Roles")
      }, /*#__PURE__*/React.createElement("div", {
        className: "gm_edit-member-roles",
        onClick: () => {
          setEditMemberRoles(member);
        }
      }, /*#__PURE__*/React.createElement("div", null)))), /*#__PURE__*/React.createElement(DataListCell, {
        width: 3,
        key: "secondary content "
      }, member.membershipExpiresAt || "Never"), /*#__PURE__*/React.createElement(DataListCell, {
        width: 2,
        key: "secondary content "
      }, /*#__PURE__*/React.createElement(Tooltip, {
        content: /*#__PURE__*/React.createElement("div", null, member.status === 'ENABLED' ? "User is Active" : member.status === "SUSPENDED" ? "User is Suspended" : "")
      }, /*#__PURE__*/React.createElement("div", {
        className: "gm_user-status-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: member.status === 'ENABLED' ? "gm_icon gm_icon-active-user" : member.status === "SUSPENDED" ? "gm_icon gm_icon-suspended-user" : ""
      }))))]
    }), /*#__PURE__*/React.createElement(DataListAction, {
      className: "gm_cell-center",
      "aria-labelledby": "check-action-item1 check-action-action1",
      id: "check-action-action1",
      "aria-label": "Actions",
      isPlainButtonAction: true
    }, /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement("div", null, member.user.id === props.user.userId ? "Leave Group" : "Remove Member")
    }, /*#__PURE__*/React.createElement(Button, {
      className: "gm_x-button-small",
      onClick: () => {
        setModalInfo({
          title: "Confirmation",
          accept_message: "YES",
          cancel_message: "NO",
          message: "Are you sure you want to remove this user from the group?",
          accept: function () {
            deleteGroupMember(member.id);
            setModalInfo({});
          },
          cancel: function () {
            setModalInfo({});
          }
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "gm_x-button"
    }))), /*#__PURE__*/React.createElement(Tooltip, {
      content: /*#__PURE__*/React.createElement("div", null, member.status === 'ENABLED' ? "Suspend User from Group" : member.status === "SUSPENDED" ? "Activate User" : "")
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      className: member.status === 'ENABLED' ? "gm_ban-button-small" : "gm_activate-button-small",
      onClick: () => {
        setModalInfo({
          title: "Confirmation",
          accept_message: "YES",
          cancel_message: "NO",
          message: member.status === "ENABLED" ? "Are you sure you want to suspend this user from the group?" : "Are you sure you want to revoke suspension and ative this user?",
          accept: function () {
            if (member.status === "ENABLED") {
              suspendGroupMember(member.id);
            } else {
              activateGroupMember(member.id);
            }

            setModalInfo({});
          },
          cancel: function () {
            setModalInfo({});
          }
        });
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: member.status === "ENABLED" ? "gm_lock-button" : "gm_activate-button"
    }))))));
  }) : noMembers()), /*#__PURE__*/React.createElement(Pagination, {
    itemCount: totalItems,
    perPage: perPage,
    page: page,
    onSetPage: onSetPage,
    widgetId: "top-example",
    onPerPageSelect: onPerPageSelect
  }));
};
;

const EditRolesModal = props => {
  let groupsService = new GroupsServiceClient();
  useEffect(() => {
    setIsModalOpen(Object.keys(props.member).length > 0);
  }, [props.member]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    props?.setMember({});
  };

  let deleteGroupMemberRole = role => {
    groupsService.doDelete("/group-admin/group/" + props.groupId + "/member/" + props.member?.id + "/role/" + role).then(response => {
      if (response.status === 200 || response.status === 204) {
        const index = props.member.groupRoles.indexOf(role);

        if (index > -1) {
          // only splice array when item is found
          props.member.groupRoles.splice(index, 1); // 2nd parameter means remove one item only
        }

        props.setMember({ ...props.member
        });
        props.fetchGroupMembers();
      }
    });
  };

  let addGroupMemberRole = role => {
    groupsService.doPost("/group-admin/group/" + props.groupId + "/member/" + props.member?.id + "/role?name=" + role, {
      params: {
        name: role
      }
    }).then(response => {
      if (response.status === 200 || response.status === 204) {
        props.member.groupRoles.push(role);
        props.setMember({ ...props.member
        });
        props.fetchGroupMembers();
      }
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    variant: "small",
    title: "Edit Μember Roles",
    isOpen: isModalOpen,
    onClose: handleModalToggle,
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "confirm",
      variant: "primary",
      onClick: () => {
        props.setMember({});
      }
    }, "Ok")]
  }, /*#__PURE__*/React.createElement("table", {
    className: "gm_roles-table gm_table-center"
  }, /*#__PURE__*/React.createElement("tbody", null, props.groupRoles?.map((role, index) => {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Checkbox, {
      id: "standalone-check",
      name: "standlone-check",
      checked: props.member?.groupRoles?.includes(role),
      onClick: () => {
        if (props.member?.groupRoles?.includes(role)) {
          deleteGroupMemberRole(role);
        } else {
          addGroupMemberRole(role);
        }
      },
      "aria-label": "Standalone input"
    })));
  })))));
};
//# sourceMappingURL=GroupMembers.js.map