type ErrorProps = {
  statusCode: number;
  message: string;
};
export default function Error({ message, statusCode }: ErrorProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex justify-center items ">
        <h1 className="text-7xl text-red-700  ">{statusCode}</h1>
        <div className="border-l-2 border-gray-700 m-2  "></div>

        <div className="w-1/2 flex justify-center items-center ">
          <h3>{message}</h3>
        </div>
      </div>
    </div>
  );
}
