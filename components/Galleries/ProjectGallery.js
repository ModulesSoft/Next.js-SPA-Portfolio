import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

const projectGallery = ({ mediaItem }) => (

  <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
    <Gallery>
      {mediaItem.map((item, key) =>
        <Item
          key={key}
          original={item.sourceUrl}
          thumbnail={(item.mediaDetails.sizes && item.mediaDetails.sizes.filter(size => size.name === "thumbnail")[0].sourceUrl)}
          width={item.mediaDetails.width}
          height={item.mediaDetails.height}
        >
          {({ ref, open }, src = item.mediaDetails.sizes?.filter(size => size.name === "thumbnail")[0].sourceUrl) => (
            <div className={`imageContainer cursor-pointer m-2 ${!src && "hidden"}`} onClick={open}>
              <img className="image" alt={item.caption ? item.caption : item.altText || "project"} ref={ref} src={src} />
              <div className="imageOverlay">
                <div className="imageText">{item.caption ? item.caption : item.altText}</div>
              </div>
            </div>
          )}
        </Item>
      )}
    </Gallery >
  </div>
)
export default projectGallery;