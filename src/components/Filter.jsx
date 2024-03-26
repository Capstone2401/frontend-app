import Dropdown from "./Dropdown";

export default function Filter() {
  const mockData = {
    device: ["desktop", "iPhone", "Mac"],
    city: ["Boston", "New york"],
  };
  return (
    <div className="p-5 w-full">
      <Dropdown items={mockData.device} text={"Filter"} />
    </div>
  );
}
