import React, {useContext, useEffect, useState} from 'react';

import {Context} from "../marketwrapper";

import Head from "next/dist/next-server/lib/head";

import config from "../../config.json";

import AssetPreview from "../assetpreview/AssetPreview";
import {getListings} from "../api/Api";
import LoadingIndicator from "../loadingindicator";
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";
import qs from 'qs';
import {getValues} from "../helpers/Helpers";

const Market = (props) => {
    const [ state, dispatch ] = useContext(Context);

    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const values = getValues();

    const collection = state.collection ? state.collection : values['collection'] ? values['collection'] : '*';

    const initialized = state.collections !== null;

    const [showScrollUpIcon, setShowScrollUpIcon] = useState(false);

    const getResult = (result) => {
        setListings(result);
        setIsLoading(false);
    }

    const initListings = async (page, collection) => {
        setIsLoading(true);

        getListings(
            state.collections.filter(
                item => (!collection || collection === '*') ? true : item === collection
            ), page, config.limit
        ).then(result => getResult(result));
    };

    useEffect(() => {
        if (initialized)
            initListings(page, collection, config.limit)
    }, [page, collection, initialized]);

    const handleScroll = e => {
        let element = e.target;

        if (element.className === 'Page') {
            setShowScrollUpIcon(element.scrollTop > element.clientHeight);
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                dispatch({ type: 'SET_SCROLLED_DOWN', payload: true });
            }
        }
    };

    const scrollUp = () => {
        if (process.browser) {
            const element = document.getElementById("MarketPage");
            element.scrollTo({left: 0, top: 0, behavior: "smooth"});
        }
    };

    return (
            <div className={"Page"} onScroll={e => handleScroll(e)} id="MarketPage">
            <Head>
                <meta id="og-title" property="og:title" content={config.market_title} />
                <meta id="og-description" property="og:description" content={config.market_description} />
                <meta id="og-image" property="og:image" content={config.market_image} />
                <meta id="twitter-image" property="twitter:image" content={config.market_image} />
                <link id='page-image' rel="apple-touch-icon" href={config.market_image} />
                <meta name="msapplication-TileColor" content="#1235ba" />
                <meta name="theme-color" content="#1A1A1A" />
                <meta id="twitter-title" property="twitter:title" content={config.market_title} />
                <meta id="twitter-description" property="twitter:description" content={config.market_description} />
            </Head>
            <div className={"MarketContent"}>
                <Filters />
                <div className={"Results"}>
                    <Pagination
                        items={listings && listings.data}
                        page={page}
                        setPage={setPage}
                    />
                    { isLoading ? <LoadingIndicator /> : <div className={"AssetList"}>
                    {
                        listings && listings['success'] ? listings['data'].map((listing, index) =>
                            <AssetPreview
                                {...props}
                                index={index}
                                listing={listing}
                                asset={listing.assets[0]}
                            />
                        ) : ''
                    }
                    </div> }
                    {isLoading ? '' :
                        <Pagination
                            items={listings && listings.data}
                            page={page}
                            setPage={setPage}
                        />
                    }
                </div>
            </div>
            {showScrollUpIcon ? <div className="ScrollUpIcon" onClick={scrollUp}>
                <img src = "/up-arrow.svg" />
            </div> : '' }
        </div>
    );
};

export default Market;
