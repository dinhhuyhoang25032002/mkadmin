import SectionFeedback from "~/components/about/SectionFeedback";
import SectionStatiscal from "~/components/about/SectionStatiscal";
import MainLayout from "~/components/main-layout";
import { PartnersdataFeedback, StatiscalIntrol } from "~/services/data";

import {
  LazySectionAbout,
//  LazySectionSolution,
  LazySectionServices,
  LazySectionIntrol,
  LazySectionActivityInsite,
  LazyBannerPage,
} from "~/utils/LazySection";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container-about-page">
        <LazyBannerPage
          header={"Giới Thiệu Công Ty"}
          homepage={"Trang chủ"}
          name={"Giới thiệu"}
        />
        <SectionStatiscal data={StatiscalIntrol} />
        <LazySectionIntrol
          title="CÔNG TY CỔ PHẦN CÔNG NGHỆ MKAdmin"
          description1="Được thành lập năm 2024, là một Start-up với mục tiêu trở
          thành đơn vị cung cấp các dịch vụ AI/IoT giá rẻ cho chuyển đổi số hàng đầu tại Việt Nam,
          với mong muốn quản lí mọi thiết bị, mọi lúc mọi nơi chỉ trong 1 chạm
          , phục vụ đa dạng nhu cầu  của mọi người trên môi trường số. MKAdmin đã và đang xây dựng, triển khai những giải pháp/sản phẩm toàn
          diện và thiết thực nhằm nâng cao chất lượng của từng sản phẩm phù hợp với từng người dùng."
          srcVideo="/videos/about.mp4"
          ishiddenContentVideo={true}
        />
        <LazySectionServices />
        {/* <LazySectionSolution /> */}
        <LazySectionAbout />
        <LazySectionActivityInsite />
        <SectionFeedback data={PartnersdataFeedback} />
      </div>
    </MainLayout>
  );
};

export default AboutPage;
