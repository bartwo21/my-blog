"use client";

import Comment from "./comment";

interface CommentProps {
  comments: {
    id: number;
    body: string;
    createdAt: Date;
    user: any;
  }[];
}

const CommentsSection: React.FC<CommentProps> = ({ comments }) => {
  return (
    <div className="mt-5">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            user={comment.user}
            body={comment.body}
            createdAt={comment.createdAt.toISOString()}
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsSection;
