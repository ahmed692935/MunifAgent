// import { useState } from "react";

// const PrivacyPolicyModal = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Button */}
//       <button
//         onClick={() => setOpen(true)}
//         className="px-6 py-3 w-[50%] bg-[#3d4b52] text-white rounded-xl shadow-md hover:bg-[#2d3a40] transition-all"
//       >
//         Datenschutzerklärung
//       </button>

//       {/* Popup Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold text-[#3d4b52]">
//                 Datenschutzerklärung (DSGVO-konform)
//               </h2>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="text-gray-600 text-xl hover:text-black"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Content */}
//             <div className="text-gray-700 space-y-4 leading-relaxed">
//               <h3 className="font-semibold text-lg">1. Verantwortlicher</h3>
//               <p>
//                 Verantwortlich für die Datenverarbeitung auf dieser Website ist:
//                 <br />
//                 <strong>Munif Rahman</strong>
//                 <br />
//                 Geschwister-Scholl-Str.10
//                 <br />
//                 86156 Augsburg
//                 <br />
//                 E-Mail: info@mrbot-ki.de
//                 <br />
//                 Telefon: 0162 6352418
//               </p>

//               <h3 className="font-semibold text-lg">
//                 2. Allgemeines zur Datenverarbeitung
//               </h3>
//               <p>
//                 Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre
//                 Daten werden vertraulich und entsprechend den gesetzlichen
//                 Datenschutzvorschriften sowie dieser Datenschutzerklärung
//                 behandelt.
//                 <br />
//                 <br />
//                 Die Nutzung unserer Website ist in der Regel ohne Angabe
//                 personenbezogener Daten möglich. Soweit personenbezogene Daten
//                 (z. B. Name, E-Mail-Adresse, Telefonnummer) erhoben werden,
//                 erfolgt dies stets auf freiwilliger Basis.
//               </p>

//               <h3 className="font-semibold text-lg">4. Kontaktaufnahme</h3>
//               <p>
//                 Wenn Sie uns per E-Mail oder über ein Kontaktformular Anfragen
//                 zukommen lassen, werden Ihre Angaben zur Bearbeitung der Anfrage
//                 gespeichert. Die Daten werden nicht ohne Ihre Einwilligung
//                 weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
//               </p>

//               <h3 className="font-semibold text-lg">
//                 5. Verwendung von Cookies und Analysediensten
//               </h3>
//               <p>
//                 Unsere Website kann Cookies verwenden. Sie können die
//                 Speicherung von Cookies jederzeit im Browser deaktivieren.
//                 <br />
//                 Falls Analysefunktionen aktiviert sind, erfolgt die Verarbeitung
//                 gemäß Art. 6 Abs. 1 lit. f DSGVO.
//               </p>

//               <h3 className="font-semibold text-lg">
//                 6. Eingebettete Inhalte und externe Dienste
//               </h3>
//               <p>
//                 Unsere Website kann Inhalte von Drittanbietern einbinden. Beim
//                 Laden kann Ihre IP-Adresse an den Anbieter übermittelt werden.
//               </p>

//               <h3 className="font-semibold text-lg">7. Ihre Rechte</h3>
//               <ul className="list-disc ml-5">
//                 <li>Auskunft (Art. 15 DSGVO)</li>
//                 <li>Berichtigung (Art. 16 DSGVO)</li>
//                 <li>Löschung (Art. 17 DSGVO)</li>
//                 <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
//                 <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
//                 <li>Widerspruch (Art. 21 DSGVO)</li>
//               </ul>
//               <p>Zur Ausübung Ihrer Rechte: info@mrbot-ki.de</p>

//               <h3 className="font-semibold text-lg">8. Beschwerderecht</h3>
//               <p>
//                 Bei Verstößen steht Ihnen ein Beschwerderecht bei der
//                 zuständigen Datenschutzbehörde zu.
//               </p>

//               <h3 className="font-semibold text-lg">9. Datensicherheit</h3>
//               <p>
//                 Wir setzen technische und organisatorische Maßnahmen ein, um
//                 Ihre Daten zu schützen.
//               </p>

//               <h3 className="font-semibold text-lg">10. Änderungen</h3>
//               <p>
//                 Wir behalten uns vor, diese Erklärung bei Bedarf zu
//                 aktualisieren.
//                 <br />
//                 <strong>Stand: November 2025</strong>
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PrivacyPolicyModal;
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PrivacySections {
  responsibleTitle: string;
  responsibleContent: string;
  generalTitle: string;
  generalContent: string;
  contactTitle: string;
  contactContent: string;
  cookiesTitle: string;
  cookiesContent: string;
  embeddedTitle: string;
  embeddedContent: string;
  rightsTitle: string;
  rightsList: string[];
  rightsContact: string;
  complaintTitle: string;
  complaintContent: string;
  securityTitle: string;
  securityContent: string;
  changesTitle: string;
  changesContent: string;
}

const PrivacyPolicyModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const s = t("legal.privacyPolicy.sections", {
    returnObjects: true,
  }) as PrivacySections;

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 w-[50%] bg-[#3d4b52] text-white rounded-xl shadow-md hover:bg-[#2d3a40] transition-all"
      >
        {t("legal.privacyPolicy.button")}
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#3d4b52]">
                {t("legal.privacyPolicy.title")}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 text-xl hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="text-gray-700 space-y-6 leading-relaxed">
              <section>
                <h3 className="font-semibold text-lg">{s.responsibleTitle}</h3>
                <p>{s.responsibleContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.generalTitle}</h3>
                <p>{s.generalContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.contactTitle}</h3>
                <p>{s.contactContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.cookiesTitle}</h3>
                <p>{s.cookiesContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.embeddedTitle}</h3>
                <p>{s.embeddedContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.rightsTitle}</h3>
                <ul className="list-disc ml-5">
                  {s.rightsList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="mt-2">{s.rightsContact}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.complaintTitle}</h3>
                <p>{s.complaintContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.securityTitle}</h3>
                <p>{s.securityContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.changesTitle}</h3>
                <p>{s.changesContent}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPolicyModal;
