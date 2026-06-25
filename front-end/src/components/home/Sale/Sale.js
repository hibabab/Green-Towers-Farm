import React from "react";
import { Link } from "react-router-dom";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../../assets/images/index";
import Image from "../../designLayouts/Image";

const Sale = () => {
   return (
    <div className="w-full mx-auto">
     
      
      {/* Contenu principal de la page d'accueil */}
      <div className="max-w-container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Qui sommes-nous ?</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <span className="font-bold text-green-700">Green Tower Farm</span> est une start-up spécialisée en agriculture hors-sol qui vise à améliorer les rendements de l'agriculture durable en zones urbaines et rurales.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Initiatrice d'innovations sociales, Green Tower Farm fabrique, installe et assure la maintenance de <span className="font-semibold">systèmes hydroponiques clé en main</span> qui permettent de cultiver des produits alimentaires sans pesticide.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Soucieuse de l'environnement, Green Tower Farm renforce les compétences des acteurs locaux grâce à un <span className="font-semibold">panel de formations adaptées à l'agriculture moderne</span>.
            </p>
          </div>

          <div className="order-first lg:order-last">
            <div className="bg-green-50 p-8 rounded-xl shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-5xl text-green-600">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2 text-center">
                Agriculture Intelligente
              </h3>
              <p className="text-gray-600 text-center">
                Des solutions innovantes pour cultiver partout, toute l'année.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Valeurs / Points forts */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">
            Notre Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <span className="text-2xl text-green-600">🚜</span>
              </div>
              <h4 className="font-bold text-green-700 mb-2">Innovation Sociale</h4>
              <p className="text-gray-600">
                Nous concevons des solutions qui améliorent la production alimentaire locale et durable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <span className="text-2xl text-green-600">🌿</span>
              </div>
              <h4 className="font-bold text-green-700 mb-2">Sans Pesticides</h4>
              <p className="text-gray-600">
                Des systèmes hydroponiques pour une production saine et respectueuse de l'environnement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                <span className="text-2xl text-green-600">📚</span>
              </div>
              <h4 className="font-bold text-green-700 mb-2">Formation & Compétences</h4>
              <p className="text-gray-600">
                Nous accompagnons les acteurs locaux avec des formations adaptées aux techniques modernes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Nos Valeurs */}
      <div className="max-w-container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Nos Valeurs</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
              <span className="text-3xl">💚</span>
            </div>
            <h4 className="font-bold text-green-800 text-center mb-3">Engagement Environnemental</h4>
            <p className="text-gray-700 text-sm text-center">
              Promouvoir une agriculture durable et respectueuse de l'environnement pour les générations futures.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
              <span className="text-3xl">🤝</span>
            </div>
            <h4 className="font-bold text-green-800 text-center mb-3">Collaboration</h4>
            <p className="text-gray-700 text-sm text-center">
              Travailler ensemble avec les communautés locales et nos partenaires pour un impact durable.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
              <span className="text-3xl">💡</span>
            </div>
            <h4 className="font-bold text-green-800 text-center mb-3">Innovation</h4>
            <p className="text-gray-700 text-sm text-center">
              Développer des solutions technologiques innovantes pour optimiser la production agricole.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-md">
              <span className="text-3xl">🎓</span>
            </div>
            <h4 className="font-bold text-green-800 text-center mb-3">Formation</h4>
            <p className="text-gray-700 text-sm text-center">
              Transmettre les connaissances et renforcer les compétences des acteurs agricoles.
            </p>
          </div>
        </div>
      </div>

      {/* Section Nos Partenaires */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Nos Partenaires</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous collaborons avec des institutions de renom pour développer et promouvoir l'agriculture durable en Tunisie.
            </p>
          </div>

          <div className="flex justify-center">
            {/* INAT */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center max-w-md">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-green-700">INAT</span>
              </div>
              <h4 className="font-bold text-gray-800 text-center mb-2">
                Institut National Agronomique de Tunisie
              </h4>
              <p className="text-sm text-gray-600 text-center">
                Partenaire académique pour la recherche et l'innovation agricole
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action final */}
       <div className="text-center mb-12 pt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-4">you tube</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
        </div>
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
           <p className="text-lg text-gray-700 leading-relaxed mb-6">
  <span className="font-bold text-green-700">Green Tower Farm</span> est une chaîne YouTube dédiée à l'agriculture moderne et durable. 
  Elle propose des vidéos éducatives sur les techniques agricoles, l’agriculture hors-sol, 
  l’innovation verte et les bonnes pratiques pour cultiver efficacement en milieu urbain et rural.
</p>

         
          </div>
            <div className="order-first lg:order-last">
            <div className="bg-green-50 p-8 rounded-xl shadow-lg">
             <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-black">
  <video
    className="w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    src="https://cdn.coverr.co/videos/coverr-farmer-working-in-the-field-8485/1080p.mp4"
  />
</div>

             
            </div>
          </div>

        
        </div>
      
      

    </div>
  );
};

export default Sale;
