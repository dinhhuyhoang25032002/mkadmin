import SectionFeedback from "~/components/about/SectionFeedback";
import SectionIntrol from "~/components/about/SectionIntrol";
import SectionStatiscal from "~/components/about/SectionStatiscal";
import BannerPage from "~/components/custom/BannerPage";
import MainLayout from "~/components/main-layout";
import SectionAllProduct from "~/components/products/all-products/SectionAllProduct";
import {
  PartnersdataFeedback,
  StatiscalSolution,
  dataSolution,
} from "~/services/data";

export default function IntrolSolutions() {
  return (
    <MainLayout>
      <BannerPage
        header={"Các Giải Pháp Tiên Phong"}
        homepage={"Trang chủ"}
        name={"Các Giải Pháp Tiên Phong"}
      />
      <SectionStatiscal data={StatiscalSolution} />
      <SectionIntrol
        title={"Các Giải Pháp Tiên Phong tại OpenLAB"}
        description1="Được thành lập năm 2024, là một Start-up với mục tiêu trở
          thành đơn vị cung cấp các dịch vụ AI/IoT giá rẻ cho chuyển đổi số hàng đầu tại Việt Nam,
          với mong muốn quản lí mọi thiết bị, mọi lúc mọi nơi chỉ trong 1 chạm
          , phục vụ đa dạng nhu cầu  của mọi người trên môi trường số. MKAdmin đã và đang xây dựng, triển khai những giải pháp/sản phẩm toàn
          diện và thiết thực nhằm nâng cao chất lượng của từng sản phẩm phù hợp với từng người dùng."
     
        srcVideo={"/videos/about.mp4"}
        ishiddenContentVideo={false}
      />
      <div className="px-14 pt-16 xs:px-4 xs:py-6">
        <SectionAllProduct
          title="Các Giải Pháp Tiên Phong"
          description1={
            "Các gói giải pháp được lựa chọn riêng theo từng nhu cầu, quy mô.Tiêu chuẩn khẳng định vị thế tiên phong của OpenLAB"
          }
          data={dataSolution}
          type="APP"
        />
      </div>
      <SectionFeedback data={PartnersdataFeedback} />
    </MainLayout>
  );
}
