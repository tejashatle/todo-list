import React from "react";
import BucketCard from "./BucketCard";

export default function BucketList({buckets, dispatch}){
    return (
        <div className="container">
            {
                buckets.map((item, index) => (
                    <BucketCard key={index} bucket={item} dispatch={dispatch}></BucketCard>
                ))
            }
        </div>
    );
}