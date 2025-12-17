interface DashboardTitleProps {
  heading: string;
  text?: string;
}

export function DashboardTitle({ heading, text }: DashboardTitleProps) {
  return (
    <div className="mb-6">
      <div className="grid gap-1">
        <h1 className="font-heading text-xl font-extrabold !text-gray-200">{heading}</h1>
        {text && <p className="text-sm !text-white">{text}</p>}
      </div>
    </div>  
  );
}
