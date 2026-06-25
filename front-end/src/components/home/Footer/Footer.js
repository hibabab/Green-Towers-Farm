import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#F5F5F3] py-16">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 px-4 gap-10">
        {/* Section Contact */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Contactez-nous !</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-700 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-700 font-medium">Téléphone :</p>
                <p className="text-gray-600">(+216) 50 970 310</p>
                <p className="text-gray-600">(+216) 50 970 311</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-700 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-700 font-medium">Email :</p>
                <p className="text-gray-600">info@growit-yourself.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-700 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-700 font-medium">Adresse :</p>
                <p className="text-gray-600">6 Rue enniséi, Ariana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Réseaux sociaux */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Suivez-nous sur les réseaux de Green Tower Farm !</h3>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600 mb-4">
              Restez connecté avec nous pour les dernières nouveautés et conseils en agriculture urbaine.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Section À propos */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-green-800 mb-6">À propos de Green Tower Farm</h3>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">
              Green Tower Farm est votre partenaire pour une agriculture urbaine réussie. 
              Nous fournissons tout ce dont vous avez besoin pour cultiver vos propres aliments 
              sains et frais à la maison.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Kits de culture complets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Conseils d'experts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Produits biologiques</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-gray-600">Support technique</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Horaires */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Horaires d'ouverture</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-700 font-medium">Lundi - Vendredi</span>
              <span className="text-gray-600">8:00 - 18:00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-700 font-medium">Samedi</span>
              <span className="text-gray-600">9:00 - 16:00</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-700 font-medium">Dimanche</span>
              <span className="text-gray-600">Fermé</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 italic">
              "Cultivez votre propre nourriture, récoltez votre indépendance."
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Footer;