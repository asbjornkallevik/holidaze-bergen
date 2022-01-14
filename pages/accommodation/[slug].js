import { useEffect } from "react";
import {
  API_URL,
  ACCOMMODATION_ENDPOINT,
  MEDIA_ENDPOINT,
} from "../../constants/api";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import Head from "../../components/layout/Head";

import TopCover from "../../components/blocks/TopCover";
import ImageCarousel from "../../components/blocks/ImageCarousel";
import Heading from "../../components/typography/Heading";
import ButtonLink from "../../components/blocks/ButtonLink";
import Button from "../../components/blocks/Button";
import Rooms from "../../components/accommodation/Rooms";
import Facilities from "../../components/accommodation/Facilities";
import HotelRequestForm from "../../components/forms/HotelRequestForm";
import Modal from "../../components/layout/Modal";

export default function Slug(props) {
  const hotel = props.item;

  useEffect(function () {
    const sendRequestBtn = document.querySelector("#sendHotelRequest");
    const modalCloseBtn = document.querySelector("#modalClose");
    const modal = document.querySelector(".modal");

    // Open and close modal
    if (modal) {
      sendRequestBtn.addEventListener("click", () => {
        modal.classList.add("open");
      });
      modalCloseBtn.addEventListener("click", () => {
        modal.classList.remove("open");
      });
      modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
          modal.classList.remove("open");
        }
      });
    }

    // Add and remove class '.modal-open' when modal opens/closes
  }, []);

  return (
    <Layout page="single-page">
      <Head title={hotel.title} />
      <TopCover img={hotel.imageUrl} size="medium">
        <Heading text={hotel.title} size={1} />
      </TopCover>

      <section className="single-page__details ">
        <div className="single-page__rooms">
          <Rooms items={hotel.rooms} />
        </div>
        <div>
          <Button
            text="Send request"
            style="success"
            id="sendHotelRequest"
            short
          />
        </div>
        <div className="single-page__facilities">
          <Heading text="Facilities" size={4} />
          <Facilities items={hotel.facilities} />
        </div>
        <div className="single-page__location">
          <Heading text="Location" size={4} />
          Address...
        </div>
      </section>
      <section className="single-page__image-carousel">
        <ImageCarousel images={hotel.imageGallery} />
      </section>
      <section className="single-page__content">
        <Heading
          text={`This is ${hotel.title}`}
          size={2}
          customClass="single-page__content-heading"
        />
        <div dangerouslySetInnerHTML={{ __html: hotel.content }}></div>
      </section>
      {/* Modal */}
      <Modal title={`Send a request to ${hotel.title}`}>
        <HotelRequestForm hotel={hotel} API_URL={props.API_URL} />
      </Modal>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(API_URL + "accommodation");

    const accommodation = response.data;

    // Get paths
    const paths = accommodation.map((item) => ({
      params: { slug: item.slug },
    }));

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const itemUrl = API_URL + ACCOMMODATION_ENDPOINT + `?slug=${params.slug}`;
  const mediaUrl = API_URL + MEDIA_ENDPOINT;
  let data = [];
  let item = {};
  let imageUrl = "";
  let imageGallery = [];

  try {
    const response = await axios.get(itemUrl);
    data = response.data;
    // console.log(data);

    // Get image if it exists
    if (data[0].featured_media) {
      imageUrl = await axios.get(mediaUrl + data[0].featured_media);
      imageUrl = imageUrl.data.source_url;
    }

    // Get image gallery
    const gallery_items = data[0].acf.accommodation_image_gallery;
    if (gallery_items.length > 0) {
      for (let i = 0; i < gallery_items.length; i++) {
        const imageUrl = await axios.get(mediaUrl + gallery_items[i]);
        imageGallery.push(imageUrl.data.source_url);
      }
    }

    item = {
      id: data[0].id,
      title: data[0].title.rendered,
      content: data[0].content.rendered,
      imageUrl: imageUrl,
      rooms: data[0].acf.accommodation_rooms,
      facilities: data[0].acf.accommodation_facilities,
      imageGallery: imageGallery,
    };
  } catch (error) {
  } finally {
  }
  return {
    props: {
      item: item,
      API_URL: API_URL,
    },
  };
}
