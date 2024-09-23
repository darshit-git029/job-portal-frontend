import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { setSearchquery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "frontend Developer",
  "backend Developer",
  "fullStack Developer",
  "graphic Designer",
  "data Science",
];
const CategorySection = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchJobHandler = (query) => {
    dispatch(setSearchquery(query))
    navigate("/browse")
  }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategorySection;
