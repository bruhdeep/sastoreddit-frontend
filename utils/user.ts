import Cookies from "js-cookie";

export const profile = async () => {
  const url = process.env.BASE_URL + `/profile/${Cookies.get("userId")}`;
  const response = await fetch(url, {
    headers: {
      "ngrok-skip-browser-warning": "1",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const updateProfile = async (newName: string, newPhone: string) => {
  const url =
    process.env.BASE_URL +
    `/profile/${Cookies.get(
      "userId"
    )}?newUserName=${newName}&newPhoneNumber=${newPhone}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
