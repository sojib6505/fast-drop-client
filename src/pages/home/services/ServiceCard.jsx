

export default function ServiceCard({ service }) {
  const { title, description,icon: Icon } = service;
 
  return (
    <div data-aos="zoom-in-up"
      className='card transition hover:shadow-xl bg-white hover:bg-lime-300 '
    >
      <div className="card-body text-center p-6 sm:p-7 lg:p-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-full bg-base-200 flex items-center justify-center mb-4">
          <span className="text-lg sm:text-xl lg:text-2xl">
            <Icon />
          </span>
        </div>

        <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2">{title}</h3>
        <p className="text-xs sm:text-sm leading-relaxed opacity-80">{description}</p>
      </div>
    </div>
  );
}
