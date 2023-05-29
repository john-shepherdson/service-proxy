import * as React from "../../../../common/keycloak/web_modules/react.js";
import { Link } from "../../../../common/keycloak/web_modules/react-router-dom.js";
import { useState, useEffect } from "../../../../common/keycloak/web_modules/react.js";
import { LongArrowAltDownIcon, LongArrowAltUpIcon, AngleDownIcon } from "../../../../common/keycloak/web_modules/@patternfly/react-icons.js";
import { DataList, DataListItem, DataListItemRow, DataListCell, DataListItemCells, Pagination, Badge } from "../../../../common/keycloak/web_modules/@patternfly/react-core.js"; // @ts-ignore

import { ContentPage } from "../ContentPage.js";
import { GroupsServiceClient } from "../../groups-mngnt-service/groups.service.js"; // @ts-ignore

import { Msg } from "../../widgets/Msg.js";
export const GroupsPage = props => {
  let groupsService = new GroupsServiceClient();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [groups, setGroups] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [orderBy, setOrderBy] = useState('');
  const [asc, setAsc] = useState(true);
  useEffect(() => {
    fetchGroups();
  }, []);
  useEffect(() => {
    fetchGroups();
  }, [perPage, page, orderBy, asc]);

  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };

  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  const fetchGroups = () => {
    groupsService.doGet("/user/groups", {
      params: {
        first: perPage * (page - 1),
        max: perPage,
        ...(orderBy ? {
          order: orderBy
        } : {}),
        asc: asc ? "true" : "false"
      }
    }).then(response => {
      console.log(response.data);
      let count = response?.data?.count || 0;
      setTotalItems(count);
      setGroups(response?.data?.results || []);
    });
  };

  const emptyGroup = () => {
    return /*#__PURE__*/React.createElement(DataListItem, {
      key: "emptyItem",
      "aria-labelledby": "empty-item"
    }, /*#__PURE__*/React.createElement(DataListItemRow, {
      key: "emptyRow"
    }, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        key: "empty"
      }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
        msgKey: "noGroupsText"
      })))]
    })));
  };

  const renderGroupList = (membership, appIndex) => {
    return /*#__PURE__*/React.createElement(Link, {
      to: "/groups/showgroups/" + membership.group.id
    }, /*#__PURE__*/React.createElement(DataListItem, {
      id: `${appIndex}-group`,
      key: 'group-' + appIndex,
      "aria-labelledby": "groups-list"
    }, /*#__PURE__*/React.createElement(DataListItemRow, null, /*#__PURE__*/React.createElement(DataListItemCells, {
      dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
        id: `${appIndex}-group-name`,
        width: 2,
        key: 'name-' + appIndex
      }, membership.group.name), /*#__PURE__*/React.createElement(DataListCell, {
        id: `${appIndex}-group-roles`,
        width: 2,
        key: 'directMembership-' + appIndex
      }, membership.groupRoles.map((role, index) => {
        return /*#__PURE__*/React.createElement(Badge, {
          key: index,
          className: "gm_role_badge",
          isRead: true
        }, role);
      })), /*#__PURE__*/React.createElement(DataListCell, {
        id: `${appIndex}-group-aupExpiration`,
        width: 2,
        key: 'directMembership-' + appIndex
      }, membership.aupExpiresAt || "Never"), /*#__PURE__*/React.createElement(DataListCell, {
        id: `${appIndex}-group-membershipExpiration`,
        width: 2,
        key: 'directMembership-' + appIndex
      }, membership.membershipExpiresAt || "Never")]
    }))));
  };

  const orderResults = type => {
    if (orderBy !== type) {
      setOrderBy(type);
      setAsc(true);
    } else if (asc) {
      setAsc(false);
    } else {
      setAsc(true);
    }
  };

  return /*#__PURE__*/React.createElement(ContentPage, {
    title: Msg.localize('groupLabel')
  }, /*#__PURE__*/React.createElement(DataList, {
    id: "groups-list",
    "aria-label": Msg.localize('groupLabel'),
    isCompact: true
  }, /*#__PURE__*/React.createElement(DataListItem, {
    id: "groups-list-header",
    "aria-labelledby": "Columns names"
  }, /*#__PURE__*/React.createElement(DataListItemRow, {
    className: "gm_view-groups-header"
  }, /*#__PURE__*/React.createElement(DataListItemCells, {
    dataListCells: [/*#__PURE__*/React.createElement(DataListCell, {
      key: "group-name-header",
      width: 2,
      onClick: () => {
        orderResults('');
      }
    }, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement(Msg, {
      msgKey: "Name"
    })), !orderBy ? /*#__PURE__*/React.createElement(AngleDownIcon, null) : asc ? /*#__PURE__*/React.createElement(LongArrowAltDownIcon, null) : /*#__PURE__*/React.createElement(LongArrowAltUpIcon, null)), /*#__PURE__*/React.createElement(DataListCell, {
      key: "group-roles",
      width: 2
    }, /*#__PURE__*/React.createElement("strong", null, "Roles")), /*#__PURE__*/React.createElement(DataListCell, {
      key: "group-aup-expiration-header",
      width: 2,
      onClick: () => {
        orderResults('aupExpiresAt');
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Aup Expiration Date"), " ", orderBy !== 'aupExpiresAt' ? /*#__PURE__*/React.createElement(AngleDownIcon, null) : asc ? /*#__PURE__*/React.createElement(LongArrowAltDownIcon, null) : /*#__PURE__*/React.createElement(LongArrowAltUpIcon, null)), /*#__PURE__*/React.createElement(DataListCell, {
      key: "group-membership-expiration-header",
      width: 2,
      onClick: () => {
        orderResults('membershipExpiresAt');
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Membership Expiration Date"), " ", orderBy !== 'membershipExpiresAt' ? /*#__PURE__*/React.createElement(AngleDownIcon, null) : asc ? /*#__PURE__*/React.createElement(LongArrowAltDownIcon, null) : /*#__PURE__*/React.createElement(LongArrowAltUpIcon, null))]
  }))), groups.length === 0 ? emptyGroup() : groups.map((group, appIndex) => renderGroupList(group, appIndex))), /*#__PURE__*/React.createElement(Pagination, {
    itemCount: totalItems,
    perPage: perPage,
    page: page,
    onSetPage: onSetPage,
    widgetId: "top-example",
    onPerPageSelect: onPerPageSelect
  }));
};
//# sourceMappingURL=GroupsPage.js.map