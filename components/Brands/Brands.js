const Brands = ({data, language}) => (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4 place-items-center">
        {data.edges.map((item, i) => (
            <div key={i} className="justify-self-center hover:text-lightBlue-600">
                <a href={item.node.extraBrandsInfo.url} className="rounded-t-lg opacity-75" target="_blank">
                    <img src={item.node.extraBrandsInfo.image.mediaItemUrl}
                        alt={item.node.title}
                        className="mx-auto"
                    />
                    <p className="text-center">{language == "english" ? item.node.postsInfo.englishTitle : item.node.title}</p>
                </a>
            </div>
        ))}
    </div>
);
export default Brands;