const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteBtns = document.querySelectorAll(".delete");
const videoComments = document.querySelector(".video__comments ul");

const addComment = (text, id) => {
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  // const icon = document.createElement("i");
  // icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.classList = "delete";
  span2.dataset.id = id;
  span2.innerText = "❌";
  span2.addEventListener("click", handleDelete);
  // newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  // const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const comment = event.target;
  const commentId = comment.parentElement.dataset.id;
  console.log(commentId);
  const response = await fetch(`/api/videos/${commentId}/comment`, {
    method: "DELETE",
    // // headers: {
    // //   "Content-Type": "application/json",
    // // },
    // body: JSON.stringify({ text }),
  });
  if (response.status === 204) {
    videoComments.removeChild(comment.parentElement);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (deleteBtns) {
  deleteBtns.forEach((btn) => btn.addEventListener("click", handleDelete));
}
