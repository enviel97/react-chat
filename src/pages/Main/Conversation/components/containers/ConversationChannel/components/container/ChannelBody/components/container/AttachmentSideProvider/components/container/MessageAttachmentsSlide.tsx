import { FC, useMemo, useState } from "react";
import { SwiperClass, SwiperSlide } from "swiper/react";
import {
  Navigation,
  FreeMode,
  Thumbs,
  Pagination,
  Mousewheel,
  Zoom,
} from "swiper";
import Styles from "../../styles/MessageAttachmentsSlide.decorate";
import SlideAttachmentItem from "../ui/SlideAttachmentItem";
import AnimationStyles from "../../styles/AttachmentSide.decorate";

const MessageAttachmentsSlide: FC<MessageAttachmentSlideProps> = ({
  attachments,
  defaultSelect = 0,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const currentThumbs = useMemo(() => {
    if (!thumbsSwiper || thumbsSwiper.destroyed) return null;
    return thumbsSwiper;
  }, [thumbsSwiper]);

  return (
    <Styles.Container>
      <Styles.Preview.Full
        spaceBetween={10}
        initialSlide={defaultSelect}
        thumbs={{ swiper: currentThumbs }}
        zoom={{ maxRatio: 2 }}
        modules={[Zoom, FreeMode, Navigation, Pagination, Thumbs, Mousewheel]}
        // flag
        loop
        navigation
        mousewheel
      >
        {attachments.map((attach, index) => {
          return (
            <SwiperSlide key={`${attach.publicId}-preview-${index}`}>
              <Styles.Preview.Item
                {...AnimationStyles.Animation.item_preview}
                custom={index}
              >
                <SlideAttachmentItem
                  className='swiper-zoom-container'
                  attachment={attach}
                  viewport='xl'
                />
              </Styles.Preview.Item>
            </SwiperSlide>
          );
        })}
      </Styles.Preview.Full>
      {attachments.length !== 1 && (
        <Styles.Preview.Mini
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={Math.min(attachments.length, 4)}
          modules={[FreeMode, Navigation, Thumbs]}
          // flag
          freeMode
          watchSlidesProgress
        >
          {attachments.map((attach, index) => (
            <SwiperSlide key={`${attach.publicId}-mini-${index}`}>
              <Styles.Preview.Item
                {...AnimationStyles.Animation.item_mini}
                custom={index}
              >
                <SlideAttachmentItem
                  key={`${attach.publicId}-mini-${index}`}
                  attachment={attach}
                />
              </Styles.Preview.Item>
            </SwiperSlide>
          ))}
        </Styles.Preview.Mini>
      )}
    </Styles.Container>
  );
};

export default MessageAttachmentsSlide;
