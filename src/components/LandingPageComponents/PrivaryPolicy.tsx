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

// interface PrivacySections {
//   responsibleTitle: string;
//   responsibleContent: string;
//   generalTitle: string;
//   generalContent: string;
//   contactTitle: string;
//   contactContent: string;
//   cookiesTitle: string;
//   cookiesContent: string;
//   embeddedTitle: string;
//   embeddedContent: string;
//   rightsTitle: string;
//   rightsList: string[];
//   rightsContact: string;
//   complaintTitle: string;
//   complaintContent: string;
//   securityTitle: string;
//   securityContent: string;
//   changesTitle: string;
//   changesContent: string;
// }

interface PrivacySections {
  processedTitle: string;
  processedContent: string;
  purposeTitle: string;
  purposeContent: string;
  legalTitle: string;
  legalContent: string;
  sensitiveTitle: string;
  sensitiveContent: string;
  retentionTitle: string;
  retentionContent: string;
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
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className=" py-3 px-20 font-bold bg-white text-[#3d4b52] rounded-xl shadow-md hover:bg-gray-300 transition-all cursor-pointer"
        >
          {t("legal.privacyPolicy.button")}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="">
                <h2 className="text-2xl font-bold text-[#3d4b52]">
                  {t("legal.privacyPolicy.title")}
                </h2>
                <p>
                  {t("legal.privacyPolicy.desc")}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 text-xl hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="text-gray-700 space-y-6 leading-relaxed">
              <section>
                <h3 className="font-semibold text-lg">{s.processedTitle}</h3>
                <p>{s.processedContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.purposeTitle}</h3>
                <p>{s.purposeContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.legalTitle}</h3>
                <p>{s.legalContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.sensitiveTitle}</h3>
                <p>{s.sensitiveContent}</p>
              </section>

              <section>
                <h3 className="font-semibold text-lg">{s.retentionTitle}</h3>
                <p>{s.retentionContent}</p>
              </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPolicyModal;


// Previous data content of privacy policy in de.json & en.json

// "privacyPolicy": {
//       "button": "Datenschutzerklärung",
//       "title": "Datenschutzerklärung (DSGVO-konform)",
//       "sections": {
//         "responsibleTitle": "1. Verantwortlicher",
//         "responsibleContent": "Verantwortlich für die Datenverarbeitung auf dieser Website ist:\nMunif Rahman\nGeschwister-Scholl-Str. 10\n86156 Augsburg\nE-Mail: info@mrbot-ki.de\nTelefon: 0162 6352418",

//         "generalTitle": "2. Allgemeines zur Datenverarbeitung",
//         "generalContent": "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften behandelt.\nDie Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Wenn personenbezogene Daten (z. B. Name, E-Mail, Telefon) erhoben werden, erfolgt dies stets freiwillig.",

//         "contactTitle": "3. Kontaktaufnahme",
//         "contactContent": "Wenn Sie uns per E-Mail oder Formular kontaktieren, werden Ihre Daten zur Bearbeitung gespeichert. Ohne Ihre Einwilligung werden solche Daten nicht weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",

//         "cookiesTitle": "4. Verwendung von Cookies und Analysediensten",
//         "cookiesContent": "Unsere Website kann Cookies verwenden. Sie können die Speicherung jederzeit im Browser deaktivieren. Falls Analysefunktionen aktiviert sind, erfolgt die Verarbeitung gemäß Art. 6 Abs. 1 lit. f DSGVO.",

//         "embeddedTitle": "5. Eingebettete Inhalte und externe Dienste",
//         "embeddedContent": "Unsere Website kann Inhalte von Drittanbietern einbinden. Beim Laden solcher Inhalte kann Ihre IP-Adresse an den jeweiligen Anbieter übermittelt werden.",

//         "rightsTitle": "6. Ihre Rechte",
//         "rightsList": [
//           "Auskunft (Art. 15 DSGVO)",
//           "Berichtigung (Art. 16 DSGVO)",
//           "Löschung (Art. 17 DSGVO)",
//           "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
//           "Datenübertragbarkeit (Art. 20 DSGVO)",
//           "Widerspruch (Art. 21 DSGVO)"
//         ],
//         "rightsContact": "Zur Ausübung Ihrer Rechte: info@mrbot-ki.de",

//         "complaintTitle": "7. Beschwerderecht",
//         "complaintContent": "Bei Verstößen haben Sie das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen.",

//         "securityTitle": "8. Datensicherheit",
//         "securityContent": "Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen.",

//         "changesTitle": "9. Änderungen",
//         "changesContent": "Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren.\nStand: November 2025"
//       }
//     }

// "privacyPolicy": {
//       "button": "Privacy Policy",
//       "title": "Privacy Policy (GDPR Compliant)",
//       "sections": {
//         "responsibleTitle": "1. Data Controller",
//         "responsibleContent": "The responsible party for data processing on this website is:\nMunif Rahman\nGeschwister-Scholl-Str. 10\n86156 Augsburg\nEmail: info@mrbot-ki.de\nPhone: 0162 6352418",

//         "generalTitle": "2. General Information on Data Processing",
//         "generalContent": "We take the protection of your personal data very seriously. Your data is treated confidentially and in accordance with legal data protection regulations and this privacy policy.\nThe use of our website is normally possible without providing personal data. If personal data is collected (such as name, email, phone), this is always done on a voluntary basis.",

//         "contactTitle": "3. Contacting Us",
//         "contactContent": "If you contact us via email or contact form, we will store your data to process your request. The data will not be shared without your consent. Legal basis: Art. 6(1)(b) GDPR.",

//         "cookiesTitle": "4. Cookies & Analytics",
//         "cookiesContent": "Our website may use cookies. You can deactivate cookies in your browser at any time. If analytics tools are used, processing is based on Art. 6(1)(f) GDPR.",

//         "embeddedTitle": "5. Embedded Content & External Services",
//         "embeddedContent": "Our website may include third-party content. When loading such content, your IP address may be transmitted to the provider.",

//         "rightsTitle": "6. Your Rights",
//         "rightsList": [
//           "Right of access (Art. 15 GDPR)",
//           "Right to rectification (Art. 16 GDPR)",
//           "Right to erasure (Art. 17 GDPR)",
//           "Right to restriction (Art. 18 GDPR)",
//           "Right to data portability (Art. 20 GDPR)",
//           "Right to object (Art. 21 GDPR)"
//         ],
//         "rightsContact": "To exercise your rights: info@mrbot-ki.de",

//         "complaintTitle": "7. Right to Lodge a Complaint",
//         "complaintContent": "You have the right to lodge a complaint with your local data protection authority.",

//         "securityTitle": "8. Data Security",
//         "securityContent": "We implement technical and organizational measures to protect your data.",

//         "changesTitle": "9. Changes",
//         "changesContent": "We reserve the right to update this privacy policy when necessary.\nLast updated: November 2025"
//       }
//     }