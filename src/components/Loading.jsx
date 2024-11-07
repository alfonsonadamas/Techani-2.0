import { Spinner } from "flowbite-react";

export default function Component() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner
        aria-label="Beautiful large spinner example"
        size="xl"
        className="text-blue-500 w-20 h-20"
      />
    </div>
  );
}
