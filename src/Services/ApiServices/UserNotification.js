import React, { useState } from "react";
import { TokenUserManager } from "../../utils/asyncStorage";
import { useGetData } from "../../utils/useAxios";

export function UserNotification() {
  const { getData, error } = useGetData();
  const { getToken, getInfoToken } = TokenUserManager();

  const fetchUnreadNotification = async () => {
    try {
      const userId = await getInfoToken("user_id");
      const url = `/user/notification/unreadNotification/${userId}`;
      const header = {
        Authorization: `Bearer ${await getToken()}`,
      };
      let data = 0;
      await getData(
        url,
        (newdata) => {
          if (error && !newdata) return;
          data = newdata;
        },
        header
      );
      return data;
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };



  return { fetchUnreadNotification };
}
