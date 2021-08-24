import React from 'react';

import AssetDetails from "../asset/AssetDetails";

import AssetImage from "../asset/AssetImage";
import Header from "../common/util/Header"
import Page from "../common/layout/Page"
import config from "../../config.json";

const AssetComponent = (props) => {
    const asset = props.asset;

    const data = asset.data;

    const image = data.img ? config.ipfs + data.img : '';

    const title = `Check out ${asset.name}`;

    let description = `by ${asset.collection.name}${asset.template_mint ? ' - Mint #' + asset.template_mint : ''}`

    return (
        <Page id="AssetPage">
            <Header
                title={title}
                ogTitle={title}
                ogDescription={description}
                ogImage={image}
                pageImage={image}
                twitterTitle={title}
                twitterDescription={description}
                twitterImage={image}
            >
                <style type="text/css">
                    {
                        'body {' +
                        'background-color: #1A1A1A;' +
                        'color: #1235ba;' +
                        '}'
                    }
                </style>
                {image && image.includes('.gif') ? <meta content="image/gif" property="og:image:type" /> : '' }
            </Header>
            <div className="SaleAssets">
                <div className="AssetInfo">
                    <AssetImage
                        asset={asset}
                    />
                    <AssetDetails
                        asset={asset}
                    />
                </div>
            </div>
            <div className="AssetLinks">
                <div className="ViewLink">
                    <a href={`https://wax.atomichub.io/explorer/asset/${asset.asset_id}`}>View on Atomichub</a>
                </div>
            </div>
        </Page>
    );
};

export default AssetComponent;
