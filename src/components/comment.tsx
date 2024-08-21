import { formatTimeAgo } from "@/utils/formatTime";

type CommentProps = {
  user: {
    given_name: string;
  };
  body: string;
  createdAt: string;
};

export default function Comment({ user, body, createdAt }: CommentProps) {
  const timeAgo = formatTimeAgo(new Date(createdAt));
  return (
    <div className="flex items-start gap-3 mb-4">
      <p className="text-lg font-semibold text-white bg-gray-500 rounded-full h-10 w-10 flex items-center justify-center">
        {user.given_name
          .split(" ")
          .map((name) => name[0])
          .join("")}
      </p>
      <div>
        <p className="font-semibold">{user.given_name}</p>
        <p className="text-sm text-gray-500">{timeAgo}</p>
        <p className="mt-1 text-sm">{body}</p>
      </div>
    </div>
  );
}
