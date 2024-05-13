import Cookies from "js-cookie";

export async function upvote(postId: string) {
  const url = process.env.BASE_URL + `/forum/${postId}/react`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: Cookies.get("userId"),
      isUpvote: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function downvote(postId: string) {
  const url = process.env.BASE_URL + `/forum/${postId}/react`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: Cookies.get("userId"),
      isUpvote: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export async function remove(postId: string) {
  const url =
    process.env.BASE_URL + `/forum/delete/${postId}/${Cookies.get("userId")}`;
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

export async function edit(postId: string, title: string, description: string) {
  const url = process.env.BASE_URL + `/forum/edit/${postId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
