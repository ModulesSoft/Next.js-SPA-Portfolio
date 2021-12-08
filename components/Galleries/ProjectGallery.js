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
        {({ ref, open }) => (
          <div className="imageContainer cursor-pointer m-2"  onClick={open}>
            <img className="image" ref={ref} src={(item.mediaDetails.sizes && item.mediaDetails.sizes.filter(size => size.name === "thumbnail")[0].sourceUrl)} />
            <div className="imageOverlay">
              <div className="imageText">{item.caption?item.caption:item.altText}</div>
            </div>
          </div>
        )}
      </Item>
    )}
  </Gallery >
          </div>
)
export default projectGallery;