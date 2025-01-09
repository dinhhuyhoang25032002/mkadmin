import { dataBenefitProduct } from "~/services/data";

import Image from "next/image";
type SectionBenefitProductProps = {
  title?: string;
  description?: string;
  data: dataBenefitProduct[];
};
const SectionBenefitProduct = ({
  title,
  description,
  data,
}: SectionBenefitProductProps) => {
  return (
    <div>
      <div className="px-20 flex flex-col justify-center text-center xs:px-4 py-10 xs:py-3">
        <span className="text-2xl font-semibold">{title}</span>
        <p className="">{description}</p>
        <div className="flex gap-3 px-16 xs:px-4 xs:flex-col xs:gap-1">
          {data.map((item, index) => {
            return (
              <div className="flex flex-col" key={index}>
                <Image src={item.image} alt="image-benefit-product" className="h-[234px]"/>
                <span className="text-lg font-semibold">{item.label}</span>
                <p className=" text-justify">{item.detail}</p>
              </div>
            );
          })}
        </div>
       
        {/* <Button className="bg-yellow-600">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button> */}
      </div>
    </div>
  );
};

export default SectionBenefitProduct;
