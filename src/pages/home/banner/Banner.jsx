import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

export default function Banner() {
    return (
        <div className="w-full ">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={4000}
                className="my-2 md:my-5 lg:md-10  "
            >
                <div className="w-screen  h-45 sm:h-75 md:h-105 lg:h-130 ">
                    <img
                        src={bannerImg1}
                        className="w-full h-full object-cover "
                        alt="Banner 1"
                    />
                </div>

                <div className="w-screen h-45 sm:h-75 md:h-105 lg:h-130 ">
                    <img
                        src={bannerImg2}
                        className="w-full h-full object-cover  "
                        alt="Banner 2"
                    />
                </div>

                <div className="w-screen h-45 sm:h-75 md:h-105 lg:h-130 ">
                    <img
                        src={bannerImg3}
                        className="w-full h-full object-cover "
                        alt="Banner 3"
                    />
                </div>
            </Carousel>
        </div>

    )
}
