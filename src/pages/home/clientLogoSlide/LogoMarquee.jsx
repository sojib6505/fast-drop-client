import amazon_vector from '../../../assets/brands/amazon_vector.png';
import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import start_people from '../../../assets/brands/start_people.png';
import start from '../../../assets/brands/start.png';

const logos = [
    amazon_vector,
    amazon,
    casio,
    moonstar,
    randstad,
    start_people,
    start
];
export default function LogoMarquee() {
    return (
        <section className="bg-base-200 md:py-12 rounded-2xl overflow-hidden">
            <div className="relative w-full">
                <p className='text-xl p-2  md:text-3xl font-extrabold text-center mb-12'>We've helped thousands of sales teams</p>
                <div className="flex w-max gap-10 animate-logoMarquee mb-5">
                    {[...logos, ...logos].map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="brand logo"
                            className="h-5  w-auto object-contain opacity-80 hover:opacity-100 transition"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
