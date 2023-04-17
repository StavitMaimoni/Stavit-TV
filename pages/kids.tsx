import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState, kidsClick, videoType } from '../atoms/modalAtom.';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';
import useSubscription from '../hooks/useSubscription';
import payments from '../lib/stripe';
import { Movie } from '../typings';
import requests from '../utils/requests';


interface Props {
    products: Product[];
    comedyMovies: Movie[];
    animationsMovies: Movie[];
    fantasyMovies: Movie[];
    scienceFictionMovies: Movie[];
    seriesKids: Movie[];
    seriesComedy: Movie[];
    seriesFamily: Movie[];
}

const Kids = ({
    products,
    comedyMovies,
    animationsMovies,
    fantasyMovies,
    scienceFictionMovies,
    seriesKids,
    seriesComedy,
    seriesFamily
}: Props) => {
    const { user, loading } = useAuth();
    const subscription = useSubscription(user);
    const showModal = useRecoilValue(modalState);
    const statusKidsClick = useRecoilValue(kidsClick);
    const movie = useRecoilValue(movieState);
    const list = useList(user?.uid);
    const [type, setType] = useRecoilState(videoType);

    if (loading || subscription === null) return null;


    return (
        <div
            className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'
                }`}
        >
            <Head>
                <title>
                    {movie?.title || movie?.original_name || 'Kids'} - Stavit-TV
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
                {type === 'tv' && <>
                    <Banner bannerImage={seriesKids} />
                </>}
                {type === 'movie' && <>
                    <Banner bannerImage={animationsMovies} />
                </>}

                <section className="md:space-y-24">
                    {type === 'tv' && <>
                        <Row title="Trending Now" movies={seriesKids} />
                        <Row title="Family" movies={seriesFamily} />
                        <Row title="Comedy" movies={seriesComedy} />
                    </>}

                    {/* My List */}
                    {list.length > 0 && <Row title="My List" movies={list} />}
                    {type === 'movie' && <>
                        <Row title="Comedy" movies={comedyMovies} />
                        <Row title="Animations" movies={animationsMovies} />
                        <Row title="Fantasy" movies={fantasyMovies} />
                        <Row title="Science Fiction" movies={scienceFictionMovies} />
                    </>}
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    )
}

export default Kids;

export const getServerSideProps = async () => {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch(err =>console.log(err))

    const [
        //Kids movies genres:
        comedyMovies,
        animationsMovies,
        fantasyMovies,
        scienceFictionMovies,
        //Kids TV shows genres:
        seriesKids,
        seriesComedy,
        seriesFamily
    ] = await Promise.all([
        //Kids movies genres:
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchAnimationsMovies).then((res) => res.json()),
        fetch(requests.fetchFantasyMovies).then((res) => res.json()),
        fetch(requests.fetchScienceFictionMovies).then((res) => res.json()),
        //Kids TV shows genres:
        fetch(requests.fetchSeriesKids).then((res) => res.json()),
        fetch(requests.fetchSeriesComedy).then((res) => res.json()),
        fetch(requests.fetchSeriesFamily).then((res) => res.json()),
    ])

    return {
        props: {
            products,
            //Kids movies genres:
            comedyMovies: comedyMovies.results,
            animationsMovies: animationsMovies.results,
            fantasyMovies: fantasyMovies.results,
            scienceFictionMovies: scienceFictionMovies.results,
            //Kids TV shows genres:
            seriesKids: seriesKids.results,
            seriesComedy: seriesComedy.results,
            seriesFamily: seriesFamily.results,
        },
    }
}
