import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLabelImportant } from "react-icons/md";

const FormationItem = (props) => {
  const navigate = useNavigate();
  
  const handleFormationDetails = () => {
    navigate("/formationdetails", {
      state: {
        formation: props,
      },
    });
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div>
          <img className="w-full h-full" imgSrc={props.image} />
        </div>

        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700 shadow-lg">
          <ul className="w-full h-full flex flex-col items-center justify-center gap-3 font-titleFont px-4 border-l border-r">
            <li
              onClick={handleFormationDetails}
              className="text-white bg-green-600 hover:bg-green-700 text-base font-semibold rounded-lg py-3 px-6 flex items-center justify-center gap-2 hover:cursor-pointer duration-300 w-full transform hover:scale-105 shadow-md"
            >
              Voir tous les détails
              <span className="text-xl">
                <MdOutlineLabelImportant />
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex flex-col justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.title}
          </h2>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-[#767676] text-sm font-semibold">{props.duration}</p>
            <p className="text-green-600 text-xs font-semibold bg-green-50 px-3 py-1 rounded">
              {props.type}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[#767676] text-[13px] mt-2 line-clamp-2">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormationItem;