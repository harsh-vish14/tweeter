export const saveTweet = async (tweetData, userId, dateAndTime) => {
  const tweetsData = {
    ...tweetData,
    userId,
    dateAndTime,
  };
  const res = await fetch("/api/tweets/tweetssave", {
    method: "POST",
    body: JSON.stringify(tweetsData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    return { ok: false };
  }
  return { ok: true };
};

export const getBookmarks = async (userId) => {
  const res = await fetch("/api/tweets/bookmarks", {
    method: "POST",
    body: JSON.stringify({ id: userId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.APIKEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
    };
  }
  return {
    status: "success",
    data: data,
  };
};

export const getProfile = async (id) => {
  const res = await fetch(`/api/profile/${id}`);
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
    };
  }
  return {
    status: "success",
    data: data,
  };
};

export const updateProfile = async (profileDetails) => {
  const res = await fetch("/api/profile/update", {
    method: "POST",
    body: JSON.stringify(profileDetails),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.APIKEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error" };
  }
  return {
    status: "success",
  };
};

export const updateImage = async (details) => {
  const res = await fetch("/api/profile/updateImages", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.APIKEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error" };
  }
  return {
    status: "success",
  };
};
