import Cookies from "js-cookie";

export async function upvote(postId: string) {
  const url = process.env.BASE_URL + `/forum/${postId}/react`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "6b4813d4-2965-4220-ac50-06ebcc251751",
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
