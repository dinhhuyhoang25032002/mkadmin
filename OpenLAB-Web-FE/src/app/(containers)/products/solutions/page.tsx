import React from "react";
import MainLayout from "~/components/main-layout";
import SectionAllProduct from "~/components/products/all-products/SectionAllProduct";
import BannerProduct from "~/components/products/BannerProduct";
import SectionBenefitProduct from "~/components/products/detail-product/SectionBenefitProduct";
import SectionTitleProduct from "~/components/products/detail-product/SectionTitleProduct";
import { dataBenefitProducts, dataSolution } from "~/services/data";

export default function DetailSolution() {
  return (
    <MainLayout>
      <div>
        <BannerProduct
          nameProduct={"Ứng dụng kết nối người học"}
          description={
            "Mô hình đại học số thu nhỏ giúp đẩy mạnh tương tác giữa nhà trường, giảng viên và sinh viên, giúp người dùng tra cứu thời khóa biểu, điểm thi, cập nhật tin tức một cách nhanh chóng"
          }
          starNumber={"4.5"}
          idCourse={""}
        />

        <SectionTitleProduct nameProduct={"ứng dụng kết nối người học"} />
        <SectionBenefitProduct data={dataBenefitProducts} />
        <div className="px-20 xs:px-4">
          <SectionAllProduct
            title={"Giải pháp/Dịch vụ"}
            data={dataSolution}
            type="APP"
          />
        </div>
      </div>
    </MainLayout>
  );
}
