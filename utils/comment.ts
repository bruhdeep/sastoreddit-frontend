import Cookies from "js-cookie";

export async function remove(commentId: string) {
  const url =
    process.env.BASE_URL +
    `/comment/${commentId}?userId=${Cookies.get("userId")}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
