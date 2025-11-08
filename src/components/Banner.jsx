import React from "react";
import "./Banner.css";
import { useLocation } from "react-router-dom";

function Banner() {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "");

  const bannerData = {
    eyes: {
      img: "https://ibacosmetics.com/cdn/shop/collections/Eye_Makeup_Category_Banners_1.webp?v=1721647584",
      title: "Express Your Eyes",
      desc: "Discover stunning eyeliners, mascaras, and eyeshadows that define your gaze.",
    },
    lips: {
      img: "https://static.vecteezy.com/system/resources/thumbnails/037/246/613/small/ai-generated-lipstick-advertisment-background-with-copy-space-free-photo.jpg",
      title: "Love Your Lips",
      desc: "Find lipsticks and liners that bring out your smile beautifully.",
    },
    nails: {
      img: "https://img.freepik.com/premium-photo/photo-realistic-nail-polish-nail-file-icon-with-copy-space-promotional-materials-artistic_980716-277993.jpg?semt=ais_hybrid&w=740&q=80",
      title: "Nail the Look",
      desc: "Add shine, color, and perfection to your nails with our premium collection.",
    },
    hair: {
      img: "https://media.istockphoto.com/id/1206731208/photo/zero-waste-self-care-products.jpg?s=612x612&w=0&k=20&c=1Dpse_cqMVo7VuQ4FNFQypWUXY3bsZbG_tjG0oDovTg=",
      title: "Care for Your Hair",
      desc: "Nourish and style your hair with the best natural products.",
    },
    fragrance: {
      img: "https://png.pngtree.com/background/20250206/original/pngtree-closeup-valentine-red-perfume-background-gift-picture-image_15362122.jpg",
      title: "Find Your Fragrance",
      desc: "Choose scents that express your true essence.",
    },
    face: {
      img: "https://img.freepik.com/premium-photo/front-view-assortment-makeup-beauty-products_680471-506.jpg",
      title: "Face the Day",
      desc: "Explore foundation, blush, and bronzer for your perfect glow.",
    },
    default: {
      img: "https://img.pikbest.com/wp/202408/makeup-skincare-glamorous-branding-in-art-vibrant-red-cosmetic-texture-background-for-and_9905377.jpg!sw800",
      title: "Embrace Your Glow",
      desc: "Discover beauty inspired by transformation — with Papilora.",
    },
  };

  const banner = bannerData[currentPath] || bannerData.default;

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${banner.img})`,
      }}
    >
      <div className="banner-content">
        <h1>{banner.title}</h1>
        <p>{banner.desc}</p>
      </div>
    </section>
  );
}

export default Banner;
