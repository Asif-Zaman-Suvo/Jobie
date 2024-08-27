import { companyData } from "@/company-data/companies";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Next Great Job <span>And Get Hired</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Connect with top employers and take the next step in your professional
          journey.
        </p>
      </section>
      <div className="flex items-center justify-center gap-6">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant={"destructive"} size={"xl"}>
            Post a job
          </Button>
        </Link>
      </div>
      <>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companyData?.map(({ name, id, path }) => {
              return (
                <CarouselItem className="basis-1/3 lg:basis-1/6" key={id}>
                  <img
                    className="h-9 sm:h-14 object-contain"
                    src={path}
                    alt={name}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </>
      <img src="/banner5.jpg" className="w-full" />
    </main>
  );
};

export default LandingPage;
