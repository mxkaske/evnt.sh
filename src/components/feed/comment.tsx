import { MessageCircle } from "lucide-react";

const comment = {
  person: { name: "Eduardo Benz", href: "#" },
  imageUrl:
    "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ",
  date: "6d ago",
};

export default function Comment() {
  return (
    <>
      <div className="relative">
        <img
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
          src={comment.imageUrl}
          alt=""
        />

        <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
          <MessageCircle className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm">
            <a href={comment.person.href} className="font-medium text-gray-900">
              {comment.person.name}
            </a>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Commented {comment.date}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-700">
          <p>{comment.comment}</p>
        </div>
      </div>
    </>
  );
}
