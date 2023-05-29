function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect, useRef } from "../../../../common/keycloak/web_modules/react.js"; // @ts-ignore

import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js"; // @ts-ignore

//import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '
import { ValidateEmail } from "../../js/utils.js";
import { Alert, Button, Checkbox, DataList, DataListCell, DataListItem, DataListItemCells, DataListItemRow, FormAlert, Modal, ModalVariant, Select, SelectOption, SelectVariant, Spinner, Wizard } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
export const InviteMemberModal = props => {
  let groupsService = new GroupsServiceClient();
  const [stepIdReached, setStepIdReached] = React.useState(1);
  const [isStep1Complete, setIsStep1Complete] = useState(false);
  const [isStep2Complete, setIsStep2Complete] = useState(false);
  const [invitationData, setInvitationData] = useState({
    groupEnrollmentConfiguration: {},
    groupRoles: [],
    withoutAcceptance: true
  });
  const [invitationResult, setInvitationResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsModalOpen(props.active);
  }, [props.active]);

  const onNext = ({
    id
  }) => {
    if (id) {
      if (typeof id === 'string') {
        const [, orderIndex] = id.split('-');
        id = parseInt(orderIndex);
      }

      setStepIdReached(stepIdReached < id ? id : stepIdReached);
    }
  };

  const sendInvitation = () => {
    setLoading(true);
    groupsService.doPost("/group-admin/group/" + props.groupId + "/members/invitation", { ...invitationData
    }).then(response => {
      if (response.status === 200 || response.status === 204) {
        setInvitationResult('success'); // setGroupMembers(response.data.results);
      } else {
        setInvitationResult('error');
      }

      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  };

  const closeWizard = () => {
    // eslint-disable-next-line no-console
    props.setActive(false);
  };

  const steps = [{
    id: 'incrementallyEnabled-1',
    name: 'Select Group Enrollment Configuration',
    component: /*#__PURE__*/React.createElement(EnrollmentStep, {
      groupId: props.groupId,
      invitationData: invitationData,
      setInvitationData: setInvitationData,
      isStep1Complete: isStep1Complete,
      setIsStep1Complete: setIsStep1Complete
    }),
    enableNext: isStep1Complete
  }, {
    id: 'incrementallyEnabled-2',
    name: 'Recipient Details',
    component: /*#__PURE__*/React.createElement(EmailStep, {
      groupId: props.groupId,
      invitationData: invitationData,
      setInvitationData: setInvitationData,
      isStep2Complete: isStep2Complete,
      setIsStep2Complete: setIsStep2Complete
    }),
    enableNext: isStep2Complete,
    nextButtonText: 'Send Invitation',
    canJumpTo: stepIdReached >= 2
  }];
  const title = 'Invite Group Member';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.medium,
    title: "Invite Group Member",
    isOpen: isModalOpen,
    onClose: () => {
      props.setActive(false);
    },
    actions: [],
    onEscapePress: () => {
      if (!(loading && !invitationResult)) {
        props.setActive(false);
      }
    }
  }, /*#__PURE__*/React.createElement(ResponseModal, {
    invitationResult: invitationResult,
    close: () => {
      closeWizard();
      setInvitationResult("");
    }
  }), /*#__PURE__*/React.createElement(Loading, {
    active: loading && !invitationResult
  }), /*#__PURE__*/React.createElement(Wizard, {
    navAriaLabel: `${title} steps`,
    mainAriaLabel: `${title} content`,
    onClose: closeWizard,
    steps: steps,
    onNext: onNext,
    height: 400,
    onSave: sendInvitation
  })));
};

const EnrollmentStep = props => {
  let groupsService = new GroupsServiceClient();
  const toggleRef = useRef(null);
  const [groupEnrollments, setGroupEnrollments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [enrollment, setEnrollment] = useState({});
  useEffect(() => {
    fetchGroupEnrollments();
  }, []);
  useEffect(() => {
    props.setIsStep1Complete(props.invitationData.groupEnrollmentConfiguration?.id && props.invitationData.groupRoles.length > 0);
  }, [props.invitationData]);
  useEffect(() => {
    if (enrollment.id) {
      props.invitationData.groupEnrollmentConfiguration = {
        id: enrollment.id
      };
      props.invitationData.groupRoles = [];
    } else {
      props.invitationData.groupEnrollmentConfiguration = {};
      props.invitationData.groupRoles = [];
    }

    props.setInvitationData({ ...props.invitationData
    });
  }, [enrollment]);

  const onToggle = isOpen => {
    setIsOpen(isOpen);
  };

  const clearSelection = () => {
    setSelected("");
    setIsOpen(false);
  };

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) clearSelection();else {
      setSelected(selection);
      setIsOpen(false);
      toggleRef.current.focus();
    }
  };

  let fetchGroupEnrollments = () => {
    groupsService.doGet("/group-admin/group/" + props.groupId + "/configuration/all").then(response => {
      if (response.status === 200 && response.data) {
        setGroupEnrollments(response.data);
      }
    });
  };

  let roleHandler = role => {
    if (props.invitationData.groupRoles.includes(role)) {
      const index = props.invitationData.groupRoles.indexOf(role);

      if (index > -1) {
        // only splice array when item is found
        props.invitationData.groupRoles.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      props.invitationData.groupRoles.push(role);
    }

    props.setInvitationData({ ...props.invitationData
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Select, {
    variant: SelectVariant.single,
    "aria-label": "Select Input",
    onToggle: onToggle,
    onSelect: onSelect,
    selections: selected,
    isOpen: isOpen,
    "aria-labelledby": "Test"
  }, /*#__PURE__*/React.createElement(SelectOption, {
    key: "placeholder",
    value: "Select Enrollement Configuration",
    onClick: () => {
      props.setIsStep1Complete(false);
      setEnrollment({});
    },
    isPlaceholder: true
  }), groupEnrollments ? groupEnrollments.map((enrollment, index) => {
    return /*#__PURE__*/React.createElement(SelectOption, {
      key: index,
      value: enrollment?.name,
      isDisabled: !enrollment.active,
      onClick: () => {
        setEnrollment(enrollment);
      }
    });
  }) : []), enrollment?.id && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DataList, {
    "aria-label": "Compact data list example",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement("strong", null, "Membership Duration"))), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "secondary content "
    }, /*#__PURE__*/React.createElement("span", null, enrollment?.membershipExpirationDays ? enrollment?.membershipExpirationDays + " Days" : "Permanent", " "))]
  }))), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item2"
  }, /*#__PURE__*/React.createElement(DataListItemRow, {
    className: "gm_role_row"
  }, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement("strong", null, "Select Roles"))), /*#__PURE__*/React.createElement(DataListCell, {
      width: 3,
      key: "roles"
    }, /*#__PURE__*/React.createElement("table", {
      className: "gm_roles-table"
    }, /*#__PURE__*/React.createElement("tbody", null, enrollment && enrollment?.groupRoles?.map((role, index) => {
      return /*#__PURE__*/React.createElement("tr", {
        onClick: () => {
          roleHandler(role);
        }
      }, /*#__PURE__*/React.createElement("td", null, role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Checkbox, {
        id: "standalone-check",
        name: "standlone-check",
        checked: props.invitationData?.groupRoles.includes(role),
        "aria-label": "Standalone input"
      })));
    }))))]
  }))))));
};

const EmailStep = props => {
  let groupsService = new GroupsServiceClient();
  const [inviteAddress, setInviteAddress] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetchGroupMembers();
  }, []);
  useEffect(() => {
    props.setIsStep2Complete(inviteAddress && !emailError);
  }, [inviteAddress, emailError]);
  useEffect(() => {
    props.invitationData.email = inviteAddress;
    props.setInvitationData({ ...props.invitationData
    });
  }, [inviteAddress]);

  const onSelect = (event, selection, isPlaceholder) => {
    if (isPlaceholder) clearSelection();else if (!selectUser(selection) && selection) {
      if (ValidateEmail(selection)) {
        setInviteAddress(selection);
      } else {
        setInviteAddress(selection);
        setEmailError(true);
      }

      setShowEmailError(true);
    } else {
      setShowEmailError(false);
      setIsOpen(false);
    }
    setSelected(selection);
  };

  const selectUser = username => {
    let email;
    options.forEach(user => {
      if (user.value === username) {
        email = user.description;
      }
    });

    if (email) {
      setInviteAddress(email);
    }

    return email;
  };

  const clearSelection = () => {
    setInviteAddress("");
    setSelected(null);
    setIsOpen(false);
    setEmailError(false);
    fetchGroupMembers();
  };

  const onToggle = open => {
    setIsOpen(open);
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
            value: getUserIdentifier(membership.user),
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

  let getUserIdentifier = user => {
    return user.firstName || user.lastName ? (user.firstName && user.firstName + " ") + user.lastName : user.username ? user.username : user.email ? user.email : user.id ? user.id : "Info Not Available";
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("strong", null, "Enter Recipient Address:"), /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-email-input"
  }, /*#__PURE__*/React.createElement(Select, {
    variant: SelectVariant.typeahead,
    typeAheadAriaLabel: "Select a state",
    onToggle: onToggle,
    onSelect: () => {},
    onClear: clearSelection,
    selections: selected,
    createText: "Send invite to this email address",
    onCreateOption: value => {
      setInviteAddress(value);
      setEmailError(!ValidateEmail(value));
      setShowEmailError(true);
      setSelected(value);
      setIsOpen(false);
    },
    onFilter: (e, searchString) => {
      setInviteAddress("");
      setEmailError(false);
      setShowEmailError(false);
      let filterOptions = [];
      fetchGroupMembers(searchString);
      options.forEach((option, index) => filterOptions.push( /*#__PURE__*/React.createElement(SelectOption, _extends({
        isDisabled: option.disabled,
        key: index,
        value: option.value,
        onClick: () => {
          setInviteAddress("");

          if (option.description) {
            setSelected(option.description);
            setInviteAddress(option.description);
          }

          setIsOpen(false);
        }
      }, option.description && {
        description: option.description
      }))));
      return filterOptions;
    },
    isOpen: isOpen,
    "aria-labelledby": "titleId",
    isInputValuePersisted: true,
    placeholderText: "Select a user",
    isCreatable: true
  }, options.map((option, index) => /*#__PURE__*/React.createElement(SelectOption, _extends({
    isDisabled: option.disabled,
    key: index,
    value: option.value,
    onClick: () => {
      setInviteAddress("");

      if (option.description) {
        setSelected(option.description);
        setInviteAddress(option.description);
      }

      setIsOpen(false);
    }
  }, option.description && {
    description: option.description
  })))), emailError && showEmailError ? /*#__PURE__*/React.createElement(FormAlert, null, /*#__PURE__*/React.createElement(Alert, {
    variant: "danger",
    title: !inviteAddress ? "Email is required" : "Invalid Email",
    "aria-live": "polite",
    isInline: true
  })) : null));
};

const ResponseModal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(!!props.invitationResult);
  }, [props.invitationResult]);
  return /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.small,
    title: "Invitation " + (props.invitationResult === 'success' ? "was successfully sent" : " could not be sent, please try again"),
    isOpen: isModalOpen,
    onClose: () => {
      props.close();
    },
    actions: [/*#__PURE__*/React.createElement(Button, {
      key: "confirm",
      variant: "primary",
      onClick: () => {
        props.close();
      }
    }, "OK")]
  }, /*#__PURE__*/React.createElement(React.Fragment, null));
};

const Loading = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(props.active);
  }, [props.active]);
  return /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.large,
    width: "19rem",
    isOpen: isModalOpen,
    header: "",
    showClose: false,
    onEscapePress: () => {},
    "aria-labelledby": "modal-custom-header-label",
    "aria-describedby": "modal-custom-header-description",
    footer: ""
  }, /*#__PURE__*/React.createElement("div", {
    tabIndex: 0,
    id: "modal-no-header-description",
    className: "gm_loader-modal-container"
  }, /*#__PURE__*/React.createElement(Spinner, {
    isSVG: true,
    diameter: "100px",
    "aria-label": "Contents of the custom size example"
  })));
};
//# sourceMappingURL=InviteMemberModal.js.map