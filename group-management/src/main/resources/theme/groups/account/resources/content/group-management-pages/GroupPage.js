import * as React from "../../../../common/keycloak/web_modules/react.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js";
import { Tabs, Tab, TabTitleText, DataList, DataListItem, DataListItemCells, DataListItemRow, DataListCell, Breadcrumb, BreadcrumbItem } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { ContentPage } from "../ContentPage.js";
import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js"; // @ts-ignore

// export class GroupPage extends React.Component<GroupsPageProps, GroupsPageState> {
export const GroupPage = props => {
  let groupsService = new GroupsServiceClient();
  useEffect(() => {
    fetchGroups();
  }, []);
  const [groupMembership, setGroupMembership] = useState({});
  const [groupId] = useState(props.match.params.id);
  const [activeTabKey, setActiveTabKey] = React.useState(0);

  const handleTabClick = (event, tabIndex) => {
    setActiveTabKey(tabIndex);
  };

  let fetchGroups = () => {
    groupsService.doGet("/user/group/" + groupId + "/member").then(response => {
      if (response.status === 200 && response.data) {
        setGroupMembership(response.data);
      }
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "gm_content"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    className: "gm_breadcumb"
  }, /*#__PURE__*/React.createElement(BreadcrumbItem, {
    to: "#"
  }, "Account Console"), /*#__PURE__*/React.createElement(BreadcrumbItem, {
    to: "#/groups/showgroups"
  }, "My Groups"), /*#__PURE__*/React.createElement(BreadcrumbItem, {
    isActive: true
  }, groupMembership?.group?.name)), /*#__PURE__*/React.createElement(ContentPage, {
    title: groupMembership?.group?.name || ""
  }, /*#__PURE__*/React.createElement("p", {
    className: "gm_group_desc"
  }, groupMembership?.group?.attributes?.description && groupMembership?.group?.attributes?.description[0] || "No descritption available."), /*#__PURE__*/React.createElement(Tabs, {
    className: "gm_tabs",
    activeKey: activeTabKey,
    onSelect: handleTabClick,
    isBox: false,
    "aria-label": "Tabs in the default example",
    role: "region"
  }, /*#__PURE__*/React.createElement(Tab, {
    eventKey: 0,
    title: /*#__PURE__*/React.createElement(TabTitleText, null, "Membership Details"),
    "aria-label": "Default content - users"
  }, /*#__PURE__*/React.createElement(DataList, {
    className: "gm_datalist",
    "aria-label": "Compact data list example",
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item2"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item2"
    }, /*#__PURE__*/React.createElement("strong", null, "Member Since"))), /*#__PURE__*/React.createElement(DataListCell, {
      key: "secondary content "
    }, /*#__PURE__*/React.createElement("span", null, groupMembership?.validFrom || "Not Available"))]
  }))), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item1"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item1"
    }, /*#__PURE__*/React.createElement("strong", null, "Memberhip Expiration"))), /*#__PURE__*/React.createElement(DataListCell, {
      key: "secondary content"
    }, groupMembership?.membershipExpiresAt || "Never")]
  }))), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item2"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item2"
    }, /*#__PURE__*/React.createElement("strong", null, "AUP Expiration"))), /*#__PURE__*/React.createElement(DataListCell, {
      key: "secondary content "
    }, /*#__PURE__*/React.createElement("span", null, groupMembership?.aupExpiresAt || "Never"))]
  }))), /*#__PURE__*/React.createElement(DataListItem, {
    "aria-labelledby": "compact-item2"
  }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "primary content"
    }, /*#__PURE__*/React.createElement("span", {
      id: "compact-item2"
    }, /*#__PURE__*/React.createElement("strong", null, "Group Roles"))), /*#__PURE__*/React.createElement(DataListCell, {
      key: "secondary content "
    }, groupMembership?.groupRoles && groupMembership?.groupRoles.join(', ') || "No Roles")]
  })))))))));
};
//# sourceMappingURL=GroupPage.js.map