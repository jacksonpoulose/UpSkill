import { useState, useEffect } from "react";

const testimonials = [
  {
    image:
      "https://easy-feedback.com/wp-content/uploads/2022/10/Employee-Journey-What-it-is-and-how-to-improve-it-1024x683.jpg.webp",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    name: "John Doe",
    role: "CEO, Company",
  },
  {
    image:
      "https://easy-feedback.com/wp-content/uploads/2022/10/Employee-Journey-What-it-is-and-how-to-improve-it-1024x683.jpg.webp",
    text: "Nullam nec metus vel nisl tincidunt placerat.",
    name: "Jane Smith",
    role: "Founder, Startup",
  },
  {
    image:
      "https://easy-feedback.com/wp-content/uploads/2022/10/Employee-Journey-What-it-is-and-how-to-improve-it-1024x683.jpg.webp",
    text: "Sed do eiusmod tempor incididunt ut labore.",
    name: "Mike Johnson",
    role: "CTO, Tech Corp",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full justfy-center items-center">
      <div
        className="flex transition-transform duration-700 ease-in-out justfy-center items-center"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((item, i) => (
          <div key={i} className="min-w-full pl-50 pr-50 box-border justfy-center items-center">
            <div className="bg-white p-4 rounded-lg flex gap-15 shadow-lg">
              <div>
                <img className="w-100 h-70 " src={item.image}></img>
              </div>
              <div className="flex flex-col pt-4 justfy-center items-start">
                <p className="text-gray-600">{item.text}</p>
                <h3 className="text-lg font-bold mt-4">{item.name}</h3>
                <p className="text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
