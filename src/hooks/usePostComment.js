import { useState } from "react";
import axios from "axios";

function usePostComment(postId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postComment = async (commentData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `http://13.209.69.125:8080/comments/${postId}`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(data);
    } catch (err) {
      setError("댓글을 작성하는 데 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { postComment, loading, error, response };
}

export default usePostComment;
