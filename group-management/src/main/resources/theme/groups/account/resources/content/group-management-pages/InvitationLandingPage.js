function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js"; // @ts-ignore

import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js";
import { Button, Checkbox, HelperText, HelperTextItem, Hint, HintBody, Modal, ModalVariant, Tooltip } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js";
import { Loading } from "../../group-widgets/LoadingModal.js"; //import { ContentPage } from '../ContentPage';
//import { TableComposable, Caption, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

// export class GroupPage extends React.Component<GroupsPageProps, GroupsPageState> {
export const InvitationLandingPage = props => {
  let groupsService = new GroupsServiceClient();
  const [invitationId] = useState(props.match.params.invitation_id);
  const [invitationData, setInvitationData] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptAup, setAcceptAup] = useState(false);
  const [actionBlocked, setActionBlocked] = useState(false);
  useEffect(() => {
    getInvitation();
  }, []);

  let getInvitation = () => {
    setLoading(true);
    groupsService.doGet("/user/invitation/" + invitationId).then(response => {
      setLoading(false);

      if (response.status === 200 && response.data) {
        setInvitationData(response.data);
      } else {}
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  };

  const acceptInvitation = () => {
    setLoading(true);
    groupsService.doPost("/user/invitation/" + invitationId + "/accept", {}).then(response => {
      setLoading(false);

      if (response.status === 200 || response.status === 204) {
        props.history.push('/groups/showgroups');
      } else {
        setActionBlocked(true);
      }
    }).catch(err => {
      setActionBlocked(true);
      setLoading(false);
    });
  };

  const rejectInvitation = () => {
    setLoading(true);
    groupsService.doPost("/user/invitation/" + invitationId + "/reject", {}).then(response => {
      setLoading(false);

      if (response.status === 200 || response.status === 204) {
        props.history.push('/groups/showgroups');
      } else {
        setActionBlocked(true);
      }
    }).catch(err => {
      setActionBlocked(true);
      setLoading(false);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-container"
  }, /*#__PURE__*/React.createElement(Loading, {
    active: loading
  }), /*#__PURE__*/React.createElement(ResponseModal, {
    type: invitationData?.forMember,
    close: () => {
      setActionBlocked(false);
      props.history.push('/groups/showgroups');
    },
    active: actionBlocked
  }), Object.keys(invitationData).length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "gm_invitation-landing-title"
  }, "Welcome to ", invitationData?.groupEnrollmentConfiguration?.group?.name || invitationData?.group?.name), /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-content-container"
  }, /*#__PURE__*/React.createElement(Hint, null, /*#__PURE__*/React.createElement(HintBody, null, "You have been invited to join as a", invitationData?.forMember ? invitationData?.groupRoles.map((role, index) => {
    return /*#__PURE__*/React.createElement("strong", null, " ", role, index !== invitationData.groupRoles.length - 1 && ',');
  }) : 'n admin', ".")), (invitationData?.groupEnrollmentConfiguration?.group?.attributes?.description || invitationData?.group?.attributes?.description) && /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-purpuse"
  }, /*#__PURE__*/React.createElement("h1", null, "Description"), invitationData?.groupEnrollmentConfiguration?.group?.attributes?.description[0] || invitationData?.group?.attributes?.description[0]), invitationData?.forMember && invitationData?.groupEnrollmentConfiguration?.membershipExpirationDays && /*#__PURE__*/React.createElement(HelperText, null, /*#__PURE__*/React.createElement(HelperTextItem, {
    variant: "warning",
    hasIcon: true
  }, /*#__PURE__*/React.createElement("p", null, "This membership expires in ", /*#__PURE__*/React.createElement("strong", null, invitationData?.groupEnrollmentConfiguration?.membershipExpirationDays, " days"), " after enrollment."))), invitationData?.groupEnrollmentConfiguration?.aup?.url ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Before joining, you must review the ", /*#__PURE__*/React.createElement("a", {
    href: invitationData?.groupEnrollmentConfiguration?.aup?.url,
    target: "_blank",
    rel: "noreferrer"
  }, "acceptable use policy (AUP)"), " and accept it."), /*#__PURE__*/React.createElement("div", {
    className: "gm_checkbox-container"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    onClick: () => {
      setAcceptAup(!acceptAup);
    },
    checked: acceptAup,
    id: "description-check-1",
    label: "I have read the terms and accept them"
  }))) : "", /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-response-container"
  }, /*#__PURE__*/React.createElement(Tooltip, _extends({}, !(invitationData?.groupEnrollmentConfiguration?.aup?.url && !acceptAup) ? {
    trigger: 'manual',
    isVisible: false
  } : {
    trigger: 'mouseenter'
  }, {
    content: /*#__PURE__*/React.createElement("div", null, "First accept the terms and conditions")
  }), /*#__PURE__*/React.createElement("div", {
    className: "gm_invitation-response-button-container"
  }, /*#__PURE__*/React.createElement(Button, {
    isDisabled: invitationData?.groupEnrollmentConfiguration?.aup?.url && !acceptAup,
    onClick: acceptInvitation
  }, "Accept"))), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    onClick: rejectInvitation
  }, "Reject")))) : /*#__PURE__*/React.createElement("span", {
    className: "gm_invitation-landing-title"
  }, "Invitation Could not be found")));
};

const ResponseModal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(!!props.active);
  }, [props.active]);
  return /*#__PURE__*/React.createElement(Modal, {
    variant: ModalVariant.small,
    title: "Invitation Could not be accepted",
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
  }, /*#__PURE__*/React.createElement(React.Fragment, null, "Please make sure you are not already a group", props.type ? " member" : " admin", "."));
};
//# sourceMappingURL=InvitationLandingPage.js.map