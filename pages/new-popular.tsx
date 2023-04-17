import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom.';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import { Movie } from '../typings';
import requests from '../utils/requests';

interface Props {
    trendingNow: Movie[];
    movieTopRated: Movie[];
    seriesTopRated: Movie[];
}

const Movies = ({
    trendingNow,
    movieTopRated,
    seriesTopRated
}: Props) => {
    const { user, loading } = useAuth();
    const subscription = useSubscription(user);
    const showModal = useRecoilValue(modalState);
    const movie = useRecoilValue(movieState);

    return (
        <div
            className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'
                }`}
        >
            <Head>
                <title>
                    {movie?.title || movie?.original_name || 'New & Popular'} - Stavit-TV
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
                <Banner bannerImage={trendingNow} />

                <section className="md:space-y-24">
                    <Row title="New on Stavit TV" movies={trendingNow} />
                    <Row title="Top 10 Movies in Israel Today" movies={movieTopRated.slice(0, 10)} />
                    <Row title="Top 10 TV Shows in Israel Today" movies={seriesTopRated.slice(0, 10)} />
                </section>
            </main>
            {showModal && <Modal />}
        </div>
    )
}

export default Movies;

export const getServerSideProps = async () => {
    const [
        trendingNow,
        movieTopRated,
        seriesTopRated
    ] = await Promise.all([
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchMovieTopRated).then((res) => res.json()),
        fetch(requests.fetchSeriesTopRated).then((res) => res.json()),
    ])

    return {
        props: {
            trendingNow: trendingNow.results,
            movieTopRated: movieTopRated.results,
            seriesTopRated: seriesTopRated.results,
        },
    }
}
