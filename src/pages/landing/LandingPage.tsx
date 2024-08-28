import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companyData } from "@/data/companies";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/data/faq";

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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs,manage applications and find the best candidate</p>
          </CardContent>
        </Card>
      </section>
      <Accordion type="single" collapsible>
        {faqData?.map((faq, index) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq?.question}</AccordionTrigger>
              <AccordionContent>{faq?.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;
