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

export async function edit(commentId: string, newContent: string) {
  const url =
    process.env.BASE_URL +
    `/comment/${commentId}?userId=${Cookies.get(
      "userId"
    )}&newContent=${newContent}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function upvote(commentId: string) {
  const url =
    process.env.BASE_URL +
    `/comment/add-reaction?commentId=${commentId}&userId=${Cookies.get(
      "userId"
    )}&isUpvote=true`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function downvote(commentId: string) {
  const url =
    process.env.BASE_URL +
    `/comment/add-reaction?commentId=${commentId}&userId=${Cookies.get(
      "userId"
    )}&isUpvote=false`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
