import featuresData from "../../../api/featuresData";


export default function FeatureSection() {
  return (
    <section className="max-w-6xl mb-10 mx-auto py-12 border-gray-300 border-t-2 border-b-2 border-dashed space-y-12">
      {featuresData.map((feature) => (
        <div  data-aos="fade-right"
          key={feature.id}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          {/* Left: Simulator Image */}
          <div className="shrink-0 w-full md:w-1/3 md:border-gray-300 md:border-r-2 md:border-dashed md:pr-10">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-3/4 sm:w-2/3 md:w-full h-40 sm:h-44 md:h-48 object-contain rounded-lg shadow-md mx-auto"
            />
          </div>
        
          {/* Right: Title & Description */}
          <div className="flex-1 text-center md:text-left md:px-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
