import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const FormationDetails = () => {
  const location = useLocation();
  const [formationInfo, setFormationInfo] = useState(null);

  useEffect(() => {
    if (location.state && location.state.formation) {
      setFormationInfo(location.state.formation);
    }
  }, [location]);

  if (!formationInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4 py-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="h-full">
            <div className="bg-green-50 p-8 rounded-xl shadow-lg h-full">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src={formationInfo.image}
                alt={formationInfo.title}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="h-full flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
              {formationInfo.title}
            </h1>

            <div className="border-b border-gray-300 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-gray-700">Durée:</span>
                <span className="text-xl text-green-600 font-bold">{formationInfo.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">Type:</span>
                <span className="text-lg text-gray-600">{formationInfo.type}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {formationInfo.description}
              </p>
            </div>

            {/* Objectives */}
            {formationInfo.objectives && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Objectifs de la formation</h2>
                <ul className="list-disc list-inside space-y-2">
                  {formationInfo.objectives.map((objective, index) => (
                    <li key={index} className="text-gray-700 text-lg">
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Program */}
            {formationInfo.program && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Programme</h2>
                <ul className="list-disc list-inside space-y-2">
                  {formationInfo.program.map((item, index) => (
                    <li key={index} className="text-gray-700 text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {formationInfo.prerequisites && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Prérequis</h2>
                <p className="text-gray-700 text-lg">
                  {formationInfo.prerequisites}
                </p>
              </div>
            )}

            {/* Certificate */}
            {formationInfo.certificate && (
              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Certification
                </h3>
                <p className="text-gray-700">
                  {formationInfo.certificate}
                </p>
              </div>
            )}

            {/* Register Button */}
            <div className="mt-6">
              <Link to="/reservation" className="inline-block w-full">
                <button className="w-full bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
                  S'inscrire à la formation
                </button>
              </Link>
            </div>

            {/* Back Button */}
            <div className="mt-2">
              <Link to="/formation" className="inline-block w-full">
                <button className="w-full border-2 border-gray-400 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
                  Retour aux formations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetails;