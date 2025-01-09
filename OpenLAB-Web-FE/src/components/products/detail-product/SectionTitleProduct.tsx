type SectionTitleProductProps = {
  nameProduct: string;
};
const SectionTitleProduct = ({ nameProduct }: SectionTitleProductProps) => {
  return (
    <div className="bg-[#081140] py-3">
      <div className="  flex justify-center items-end gap-3 xs:gap-1 xs:flex-col xs:items-center">
        <span className="text-white text-2xl font-semibold">Các tính năng chính của</span>
        <span className="text-white text-2xl font-semibold ">{nameProduct}</span>
      </div>
    </div>
  );
};

export default SectionTitleProduct;
