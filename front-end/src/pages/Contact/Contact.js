import React, { useState } from "react";

const Contact = () => {
  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Messages d'erreur ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========================================
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Validation d'email =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ==================================================

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Entrez votre nom");
    }
    if (!email) {
      setErrEmail("Entrez votre email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Entrez un email valide");
      }
    }
    if (!messages) {
      setErrMessages("Entrez votre message");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      // Sauvegarder dans localStorage
      const contact = {
        id: Date.now(),
        name: clientName,
        email: email,
        phone: "", // Pas de téléphone dans ce formulaire
        subject: "",
        message: messages,
        date: new Date().toLocaleString('fr-FR'),
        read: false
      };
      
      const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      existingContacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(existingContacts));
      
      setSuccessMsg(
        `Merci ${clientName}, votre message a été reçu avec succès. Nous vous répondrons par email à ${email}.`
      );
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Formulaire de contact - Gauche */}
        <div>
          {successMsg ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <p className="font-medium text-green-700">{successMsg}</p>
            </div>
          ) : (
            <form>
              <h1 className="font-titleFont font-semibold text-3xl mb-2">
                Contactez-nous
              </h1>
              <p className="text-gray-600 mb-6">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-base text-green-600 font-titleFont font-semibold px-2">
                    Nom
                  </p>
                  <input
                    onChange={handleName}
                    value={clientName}
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    type="text"
                    placeholder="Entrez votre nom ici"
                  />
                  {errClientName && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errClientName}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-base text-green-600 font-titleFont font-semibold px-2">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                    type="email"
                    placeholder="Entrez votre email ici"
                  />
                  {errEmail && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-base text-green-600 font-titleFont font-semibold px-2">
                    Message
                  </p>
                  <textarea
                    onChange={handleMessages}
                    value={messages}
                    cols="30"
                    rows="5"
                    className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                    type="text"
                    placeholder="Entrez votre message ici"
                  ></textarea>
                  {errMessages && (
                    <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                      <span className="text-sm italic font-bold">!</span>
                      {errMessages}
                    </p>
                  )}
                </div>
                <button
                  onClick={handlePost}
                  className="w-44 bg-green-600 text-white h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-green-700 duration-200 rounded"
                >
                  Envoyer
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Localisation INAT - Droite */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Localisation - INAT
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                Institut National Agronomique de Tunisie
              </h3>
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  43 Avenue Charles Nicolle, Tunis 1082, Tunisie
                </p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  +216 71 799 391
                </p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-5 h-5 text-green-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  inat@inat.agrinet.tn
                </p>
              </div>
            </div>
            
            {/* Carte Google Maps */}
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.3598974446767!2d10.184759315290834!3d36.83996697993869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34e2b7ac1e8d%3A0x8b5f0d03d9e8e8e8!2sInstitut%20National%20Agronomique%20de%20Tunisie!5e0!3m2!1sfr!2stn!4v1640000000000!5m2!1sfr!2stn"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-md"
                title="Localisation INAT"
              ></iframe>
            </div>

            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Notre partenaire académique</h4>
              <p className="text-sm text-gray-700">
                L'INAT est notre partenaire principal pour la recherche et l'innovation dans le domaine 
                de l'agriculture durable et des techniques hydroponiques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;