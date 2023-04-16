import { UserCircleIcon } from "@heroicons/react/24/solid";

const assigment = {
  person: { name: "Hilary Mahy", href: "#" },
  assigned: { name: "Kristin Watson", href: "#" },
  date: "2d ago",
};

export default function Assignment() {
  return (
    <>
      <div>
        <div className="relative px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            <UserCircleIcon
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1 py-1.5">
        <div className="text-sm text-gray-500">
          <a href={assigment.person.href} className="font-medium text-gray-900">
            {assigment.person.name}
          </a>{" "}
          assigned{" "}
          <a
            href={assigment.assigned.href}
            className="font-medium text-gray-900"
          >
            {assigment.assigned.name}
          </a>{" "}
          <span className="whitespace-nowrap">{assigment.date}</span>
        </div>
      </div>
    </>
  );
}
