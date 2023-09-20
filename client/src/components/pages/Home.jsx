import React from 'react'
import Header from '../organisms/Header'
import OfferCarousle from '../organisms/OffersCarousle'
import DealOfTheDay from '../organisms/DealOfTheDay'
import BestSellingProducts from '../organisms/BestSellingProducts' 



export default function Home() {
    return (
        <>
            <Header />
            <OfferCarousle />
            <DealOfTheDay />
            <BestSellingProducts />
        </>
    )
}
