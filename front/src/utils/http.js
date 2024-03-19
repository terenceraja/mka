// zctracli TO FIND AND GET USER ID
export const fetchId = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/zctracli", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zctraptf TO FIND ALL PTF WITH USER ID
export const fetchPtf = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/zctraptf", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData); // Log the error response data
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    // console.log("Response from server:", resData); // Log the response data
    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zope TO FIND ALL OPE WITH USER ID
export const fetchOpe = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/zope", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData); // Log the error response data
      throw new Error("Something went wrong");
    }
    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zlignptf TO FIND ALL LIGNS WITH PTF ID
export const fetchLign = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/zlignptf", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zmvt TO FIND ALL MVT WITH ASSET ID
export const fetchMvt = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/zmvt", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// UPLOAD FILE
export const postFile = async (fileToPost, FileId) => {
  console.log("file upload", fileToPost);
  const formData = new FormData();
  formData.append("file", fileToPost);
  formData.append("FileId", FileId); // Append the document ID to the FormData

  console.log("formdata", formData.values);
  try {
    const response = await fetch("http://localhost:3000/doc/upload", {
      method: "POST",
      body: formData,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zfile GET ONDEMAND DOCS
export const fetchOnDemandDocs = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/doc/onDemand", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zfile GET SENT DOCS
export const fetchSentDocs = async (dataToPost) => {
  try {
    const response = await fetch("http://localhost:3000/doc/sent", {
      method: "POST",
      body: JSON.stringify(dataToPost),
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// AUTHENTICATE
export const auth = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData); // Log the error response data
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zmessage TO SAVE MESSAGE
export const sendMessage = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/message/send", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zmessage TO GET MESSAGE BY IDCHAT
export const getChat = async (dataToPost) => {
  const response = await fetch(`http://localhost:3000/message/${dataToPost}`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// znews TO GET ALL NEWS
export const getNews = async () => {
  const response = await fetch("http://localhost:3000/news", {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zcoll TO DELETE COLL
export const deleteNews = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/news/delete", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// znews UPLOAD and SAVE NEWS
export const postNews = async (form, fileToPost) => {
  console.log("file upload", fileToPost);
  const formData = new FormData();
  formData.append("file", fileToPost);
  formData.append("Title", form.title); // Append the document ID to the FormData
  formData.append("Subtitle", form.subtitle); // Append the document ID to the FormData

  console.log("formdata", formData.values);
  try {
    const response = await fetch("http://localhost:3000/news/upload", {
      method: "POST",
      body: formData,
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return resData;
  } catch (error) {
    console.error("Error:", error); // Log any errors that occur during the request
    throw new Error("Something went wrong");
  }
};

// zcoll TO GET ALL COLLABS
export const getCollabs = async () => {
  const response = await fetch("http://localhost:3000/collabs", {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zcoll TO SAVE COLL
export const addColl = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/collabs/add", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zcoll TO DELETE COLL
export const deleteColl = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/collabs/delete", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zcoll TO check COLL USER
export const getAllChat = async () => {
  const response = await fetch("http://localhost:3000/chat/getAllChat", {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchatcoll TO JOIN COLL IN CHAT
export const addCollabInChat = async (dataToPost) => {
  console.log("DATATOPOST", dataToPost);
  const response = await fetch("http://localhost:3000/chat/addCollab", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchatcoll TO JOIN COLL IN CHAT
export const deleteCollabFromChat = async (dataToPost) => {
  const response = await fetch("http://localhost:3000/chat/deleteCollab", {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchat TO JOIN COLL IN CHAT
export const deleteChat = async (dataToPost) => {
  const response = await fetch(
    `http://localhost:3000/chat/delete/${dataToPost}`,
    {
      method: "DELETE",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchat TO JOIN COLL IN CHAT
export const createChat = async (dataToPost) => {
  console.log("DATATOPOST", dataToPost);
  const response = await fetch(`http://localhost:3000/chat/createChat`, {
    method: "POST",
    body: JSON.stringify(dataToPost),
    headers: {
      "x-access-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchatcoll TO JOIN COLL IN CHAT
export const getAllChatIdColl = async (dataToPost) => {
  console.log("DATATOPOST", dataToPost);
  const response = await fetch(
    `http://localhost:3000/chat/getAll/${dataToPost}`,
    {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};

// zchat TO GET CHAT ID FROM IDCTRACLI
export const getChatId = async (dataToPost) => {
  console.log("DATATOPOST", dataToPost);
  const response = await fetch(
    `http://localhost:3000/chat/getChat/${dataToPost}`,
    {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return resData;
};
