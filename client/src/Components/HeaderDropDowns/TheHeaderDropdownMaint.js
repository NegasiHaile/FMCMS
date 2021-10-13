import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdownMaint = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [notifications] = state.NotificationAPI.notifications;
  const [myNotification, setMyNotification] = useState("");

  useEffect(() => {
    var unSeenNotifications = notifications.filter(
      (filteredNotification) =>
        filteredNotification.receiverId === user._id &&
        filteredNotification.status === 0
    );
    setMyNotification(unSeenNotifications);
  }, [notifications, user]);

  // console.log(myNotification);
  const itemsCount = myNotification.length;

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-memory" />

        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      {itemsCount !== 0 && (
        <CDropdownMenu placement="bottom-end" className="pt-0">
          <CDropdownItem header tag="div" className="text-center" color="light">
            <strong>You have {itemsCount} notifications</strong>
          </CDropdownItem>
          {myNotification.map((notif) => (
            <CDropdownItem key={notif._id}>
              <CIcon name="cil-user-follow" className="mr-2 text-success" />
              {notif.subject}
            </CDropdownItem>
          ))}
          {/* <CDropdownItem header tag="div" color="light">
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>CPU Usage</b>
            </small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
       */}
        </CDropdownMenu>
      )}{" "}
    </CDropdown>
  );
};

export default TheHeaderDropdownMaint;
