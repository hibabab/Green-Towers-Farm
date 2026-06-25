import React, { useState, useEffect } from "react";
import { formationData } from "../../constants";
import FormationItem from "../../components/FormationItem/FormationItem";

const Formation = () => {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    // Utiliser les données de localStorage si disponibles
    const savedFormations = localStorage.getItem('formations');
    if (savedFormations) {
      setFormations(JSON.parse(savedFormations));
    } else {
      setFormations(formationData);
    }
  }, []);

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      {/* Section titre principal */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Nos Formations
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Découvrez nos formations complètes en agriculture hydroponique, 
          adaptées à tous les niveaux d'expertise.
        </p>
      </div>

      {/* Grille des formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {formations.map((formation) => (
          <FormationItem
            key={formation._id}
            _id={formation._id}
            title={formation.title}
            image={formation.image}
            duration={formation.duration}
            type={formation.type}
            description={formation.description}
            objectives={formation.objectives}
            program={formation.program}
            prerequisites={formation.prerequisites}
            certificate={formation.certificate}
          />
        ))}
      </div>

      {/* Section informative supplémentaire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Pourquoi suivre nos formations ?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            L'hydroponie est un secteur en pleine croissance qui se développe 
            jour après jour de façon exponentielle. Elle a pu en quelques années 
            seulement conquérir une grande part de marché grâce aux avantages 
            considérables qu'elle offre pour les porteurs de projets.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Green Tower Farm a décidé de mettre à la disposition de chaque 
            personne désireuse d'en maîtriser les fondamentaux des formations 
            complètes et certifiantes.
          </p>
        </div>
        
      
      </div>
     
    </div>
    
    
  );
};

export default Formation;