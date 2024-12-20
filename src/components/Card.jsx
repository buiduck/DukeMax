import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import KeycloakService from "./keycloak";

const Card = ({data}) => {

    const getUrl = (url) => {
        if (url?.startsWith('http')) {
            return url;
        } else {
            const newUrl = new URL(url, process.env.REACT_APP_API_URL);
            return newUrl.href; 
        }
    };
    return (
        <Link
            to={"/phim/" + data.Slug} 
            className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
        >
            {data?.PosterUrl ? (
                <img src={getUrl(data?.PosterUrl)} alt={data?.Name} />
            ) : (
                <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
                    No image found
                </div>
            )}
            <div className="absolute bottom-1 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
                <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
                    {data?.Name}
                </h2>
                <div className="text-sm text-neutral-400 flex justify-between items-center">
                <p>{data?.Year}</p>
                    <p className="bg-black px-1 rounded-full text-xs text-white">
                        Thời lượng:{data?.Time}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;


