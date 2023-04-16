import Comment from "@/components/feed/comment";
import Assignment from "@/components/feed/assignment";

const Line = () => (
  <span
    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
    aria-hidden="true"
  />
);

export default function Example() {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        <li>
          <div className="relative pb-8">
            <Line />
            <div className="relative flex items-start space-x-3">
              <Comment />
            </div>
          </div>
          <div className="relative pb-8">
            <div className="relative flex items-start space-x-3">
              <Assignment />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
