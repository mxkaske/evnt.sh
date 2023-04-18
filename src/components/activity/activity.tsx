interface ActivityProps {
  children: React.ReactNode;
}

export default function Activity({ children }: ActivityProps) {
  return <div className="text-sm">{children}</div>;
}
