import { ImNewspaper } from "react-icons/im";

export default function Footer() {
  return (
    <div className=" bg-slate-800 border-t">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-2xl mb-3"> Read news that matters to you </h3>
          <p> Stay up-to-date daily </p>
        </div>
        <div className="mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0 flex items-center gap-x-1">
            {" "}
            &copy; QuickNews <ImNewspaper/>, 2023.{" "}
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <span className="px-2 border-l">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
