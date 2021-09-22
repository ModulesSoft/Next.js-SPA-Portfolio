import react from "react";

const Brands = (data) => (
    <div>
        {data.data.edges.map(item => (
            <div className="inline-block hover:text-lightBlue-600">
                <a href={item.node.extraBrandsInfo.url} target="_blank">
                    <img src={item.node.extraBrandsInfo.image.mediaItemUrl}
                        alt={item.node.title}
                        className="w-full align-middle rounded-t-lg opacity-75"
                    />
                    <p className="text-center">{item.node.title}</p>
                </a>
            </div>
        ))}
    </div>

);
export default Brands;