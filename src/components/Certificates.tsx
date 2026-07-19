/* ---------- Certifications ---------- */

const CERTS = [
  {
    name: "CSI First Prize - Poster Presentation",
    issuer: "Computer Society of India (CSI)",
    file: "/csi.PDF",
  },
  {
    name: "NPTEL Silver - Internet of Things (80%)",
    issuer: "NPTEL",
    file: "/iot nptel.pdf",
  },
];


export default function Certificates() {
  return (
    <section id="certificates" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {CERTS.map((cert, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border"
          >
            <h3 className="text-xl font-semibold mb-2">
              {cert.name}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {cert.issuer}
            </p>

            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}